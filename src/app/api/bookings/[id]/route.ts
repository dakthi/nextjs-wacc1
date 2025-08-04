import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'
import { sendAdminBookingStatusUpdate } from '@/lib/email'

// GET /api/bookings/[id] - Get specific booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    const booking = await prisma.bookings.findUnique({
      where: { id },
      include: {
        facilities: {
          select: {
            id: true,
            name: true,
            hourlyRate: true,
            capacity: true,
            features: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    )
  }
}

// PUT /api/bookings/[id] - Update booking (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for admin operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      status,
      notes,
      customer_name,
      customer_email,
      customer_phone,
      event_title,
      event_description,
      start_date_time,
      end_date_time
    } = body

    // Get existing booking
    const existingBooking = await prisma.bookings.findUnique({
      where: { id },
      include: { facilities: true }
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}

    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (customer_name !== undefined) updateData.customer_name = customer_name
    if (customer_email !== undefined) updateData.customer_email = customer_email
    if (customer_phone !== undefined) updateData.customer_phone = customer_phone
    if (event_title !== undefined) updateData.event_title = event_title
    if (event_description !== undefined) updateData.event_description = event_description

    // Handle datetime updates
    if (start_date_time || end_date_time) {
      const start = start_date_time ? new Date(start_date_time) : existingBooking.start_date_time
      const end = end_date_time ? new Date(end_date_time) : existingBooking.end_date_time

      if (start >= end) {
        return NextResponse.json(
          { error: 'End time must be after start time' },
          { status: 400 }
        )
      }

      // Check for conflicts (excluding current booking)
      const conflictingBookings = await prisma.bookings.findMany({
        where: {
          facility_id: existingBooking.facility_id,
          id: { not: id },
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

      updateData.start_date_time = start
      updateData.end_date_time = end

      // Recalculate total hours and cost
      const total_hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      const hourlyRate = existingBooking.facilities.hourlyRate ? parseFloat(existingBooking.facilities.hourlyRate.toString()) : 0
      
      updateData.total_hours = total_hours
      updateData.total_cost = hourlyRate > 0 ? total_hours * hourlyRate : null
    }

    const updatedBooking = await prisma.bookings.update({
      where: { id },
      data: updateData,
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

    // Send admin email notification if status changed
    if (status !== undefined && status !== existingBooking.status) {
      try {
        const adminEmailData = {
          bookingId: updatedBooking.id.toString(),
          customerName: updatedBooking.customer_name,
          customerEmail: updatedBooking.customer_email,
          customerPhone: updatedBooking.customer_phone,
          facilityName: updatedBooking.facilities?.name || 'Unknown Facility',
          eventTitle: updatedBooking.event_title,
          eventDescription: updatedBooking.event_description,
          startDateTime: updatedBooking.start_date_time,
          endDateTime: updatedBooking.end_date_time,
          totalCost: updatedBooking.total_cost ? parseFloat(updatedBooking.total_cost.toString()) : undefined,
          totalHours: parseFloat(updatedBooking.total_hours.toString()),
          status: updatedBooking.status,
          notes: updatedBooking.notes
        }

        await sendAdminBookingStatusUpdate(adminEmailData)
      } catch (emailError) {
        console.error('Failed to send admin status update:', emailError)
        // Don't fail the update if email fails
      }
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - Cancel booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for admin operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    // Update status to cancelled instead of hard delete
    const updatedBooking = await prisma.bookings.update({
      where: { id },
      data: { status: 'cancelled' },
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

    // Send admin cancellation notification
    try {
      const adminEmailData = {
        bookingId: updatedBooking.id.toString(),
        customerName: updatedBooking.customer_name,
        customerEmail: updatedBooking.customer_email,
        customerPhone: updatedBooking.customer_phone,
        facilityName: updatedBooking.facilities?.name || 'Unknown Facility',
        eventTitle: updatedBooking.event_title,
        eventDescription: updatedBooking.event_description,
        startDateTime: updatedBooking.start_date_time,
        endDateTime: updatedBooking.end_date_time,
        totalCost: updatedBooking.total_cost ? parseFloat(updatedBooking.total_cost.toString()) : undefined,
        totalHours: parseFloat(updatedBooking.total_hours.toString()),
        status: 'cancelled',
        notes: updatedBooking.notes
      }

      await sendAdminBookingStatusUpdate(adminEmailData)
    } catch (emailError) {
      console.error('Failed to send admin cancellation notification:', emailError)
      // Don't fail the cancellation if email fails
    }

    return NextResponse.json({ message: 'Booking cancelled successfully' })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}