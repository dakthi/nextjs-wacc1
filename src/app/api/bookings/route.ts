import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'
import { sendAdminBookingNotification } from '@/lib/email'

// GET /api/bookings - Get all bookings (admin only)
export async function GET(request: NextRequest) {
  // Check authentication for admin operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const facility_id = searchParams.get('facility_id')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    const where: any = {}
    
    if (facility_id) {
      where.facility_id = parseInt(facility_id)
    }
    
    if (startDate || endDate) {
      where.start_date_time = {}
      if (startDate) {
        where.start_date_time.gte = new Date(startDate)
      }
      if (endDate) {
        where.start_date_time.lte = new Date(endDate)
      }
    }
    
    if (status) {
      where.status = status
    }

    const bookings = await prisma.bookings.findMany({
      where,
      include: {
        facilities: {
          select: {
            id: true,
            name: true,
            hourlyRate: true
          }
        }
      },
      orderBy: { start_date_time: 'asc' }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      facility_id,
      customer_name,
      customer_email,
      customer_phone,
      event_title,
      event_description,
      start_date_time,
      end_date_time,
      notes
    } = body

    // Validate required fields
    if (!facility_id || !customer_name || !customer_email || !event_title || !start_date_time || !end_date_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const start = new Date(start_date_time)
    const end = new Date(end_date_time)

    // Validate date range
    if (start >= end) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      )
    }

    // Check if facility exists
    const facility = await prisma.facility.findUnique({
      where: { id: facility_id },
      select: { id: true, hourlyRate: true, active: true }
    })

    if (!facility || !facility.active) {
      return NextResponse.json(
        { error: 'Facility not found or inactive' },
        { status: 404 }
      )
    }

    // Check for booking conflicts
    const conflictingBookings = await prisma.bookings.findMany({
      where: {
        facility_id,
        status: { in: ['pending', 'confirmed'] },
        OR: [
          {
            start_date_time: { lt: end },
            end_date_time: { gt: start }
          }
        ]
      }
    })

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Time slot not available' },
        { status: 409 }
      )
    }

    // Calculate total hours and cost
    const total_hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    const hourly_rate = facility.hourlyRate ? parseFloat(facility.hourlyRate.toString()) : 0
    const total_cost = hourly_rate > 0 ? total_hours * hourly_rate : null

    const booking = await prisma.bookings.create({
      data: {
        facility_id,
        customer_name,
        customer_email,
        customer_phone,
        event_title,
        event_description,
        start_date_time: start,
        end_date_time: end,
        total_hours,
        hourly_rate: facility.hourlyRate,
        total_cost,
        notes,
        status: 'pending',
        updated_at: new Date()
      },
      include: {
        facilities: {
          select: {
            id: true,
            name: true,
            hourlyRate: true
          }
        }
      }
    })

    // Send admin email notification
    try {
      const adminEmailData = {
        bookingId: booking.id.toString(),
        customerName: booking.customer_name,
        customerEmail: booking.customer_email,
        customerPhone: booking.customer_phone,
        facilityName: booking.facilities?.name || 'Unknown Facility',
        eventTitle: booking.event_title,
        eventDescription: booking.event_description,
        startDateTime: booking.start_date_time,
        endDateTime: booking.end_date_time,
        totalCost: booking.total_cost ? parseFloat(booking.total_cost.toString()) : undefined,
        totalHours: parseFloat(booking.total_hours.toString()),
        status: booking.status,
        notes: booking.notes
      }

      await sendAdminBookingNotification(adminEmailData)
    } catch (emailError) {
      console.error('Failed to send admin booking notification:', emailError)
      // Don't fail the booking creation if email fails
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}