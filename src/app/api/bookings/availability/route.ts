import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/bookings/availability - Get available time slots for a facility
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facility_id = searchParams.get('facility_id')
    const date = searchParams.get('date')
    
    if (!facility_id || !date) {
      return NextResponse.json(
        { error: 'facility_id and date are required' },
        { status: 400 }
      )
    }

    const targetDate = new Date(date)
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Get facility
    const facility = await prisma.facility.findUnique({
      where: { id: parseInt(facility_id) },
      select: {
        id: true,
        name: true,
        hourlyRate: true,
        active: true
      }
    })

    if (!facility || !facility.active) {
      return NextResponse.json(
        { error: 'Facility not found or inactive' },
        { status: 404 }
      )
    }

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const day_of_week = targetDate.getDay()

    // Get availability settings for this facility and day
    const availability = await prisma.booking_availability.findUnique({
      where: {
        facility_id_day_of_week: {
          facility_id: parseInt(facility_id),
          day_of_week
        }
      }
    })

    // Default availability if not set
    const defaultStart = "09:00"
    const defaultEnd = "22:00"
    const start_time = availability?.start_time || defaultStart
    const end_time = availability?.end_time || defaultEnd
    const is_available = availability?.is_available ?? true

    if (!is_available) {
      return NextResponse.json({
        facility,
        date: targetDate.toISOString().split('T')[0],
        day_of_week,
        available: false,
        timeSlots: [],
        message: 'Facility is not available on this day'
      })
    }

    // Get existing bookings for this day
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    const existingBookings = await prisma.bookings.findMany({
      where: {
        facility_id: parseInt(facility_id),
        status: { in: ['pending', 'confirmed'] },
        start_date_time: { gte: startOfDay },
        end_date_time: { lte: endOfDay }
      },
      select: {
        start_date_time: true,
        end_date_time: true
      },
      orderBy: { start_date_time: 'asc' }
    })

    // Generate available time slots (30-minute intervals)
    const timeSlots = []
    const startTimeParts = start_time.split(':').map(Number)
    const endTimeParts = end_time.split(':').map(Number)
    const startHour = startTimeParts[0] || 0
    const startMinute = startTimeParts[1] || 0
    const endHour = endTimeParts[0] || 23
    const endMinute = endTimeParts[1] || 59

    const slotStart = new Date(targetDate)
    slotStart.setHours(startHour, startMinute, 0, 0)

    const dayEnd = new Date(targetDate)
    dayEnd.setHours(endHour, endMinute, 0, 0)

    const now = new Date()
    const minBookingTime = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now

    while (slotStart < dayEnd) {
      const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000) // 30 minutes later

      // Check if this slot is in the past or too soon
      const isPastOrTooSoon = slotStart < minBookingTime

      // Check if this slot conflicts with existing bookings
      const hasConflict = existingBookings.some((booking: any) => {
        const bookingStart = new Date(booking.start_date_time)
        const bookingEnd = new Date(booking.end_date_time)
        return slotStart < bookingEnd && slotEnd > bookingStart
      })

      timeSlots.push({
        start_time: slotStart.toISOString(),
        end_time: slotEnd.toISOString(),
        start_timeDisplay: slotStart.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        end_timeDisplay: slotEnd.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        available: !hasConflict && !isPastOrTooSoon,
        reason: hasConflict ? 'booked' : isPastOrTooSoon ? 'too_soon' : null
      })

      slotStart.setMinutes(slotStart.getMinutes() + 30)
    }

    return NextResponse.json({
      facility,
      date: targetDate.toISOString().split('T')[0],
      day_of_week,
      available: true,
      operatingHours: {
        start: start_time,
        end: end_time
      },
      timeSlots,
      existingBookings: existingBookings.length
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}