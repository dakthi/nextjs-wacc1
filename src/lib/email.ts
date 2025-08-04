import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface AdminNotificationData {
  bookingId: string
  customerName: string
  customerEmail: string
  customerPhone?: string | null
  facilityName: string
  eventTitle: string
  eventDescription?: string | null
  startDateTime: Date
  endDateTime: Date
  totalCost?: number
  totalHours: number
  status: string
  notes?: string | null
}

export async function sendAdminBookingNotification(data: AdminNotificationData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['dakthi9@gmail.com'],
      subject: `New Booking Request - ${data.eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
            New Booking Request
          </h2>
          
          <p>A new booking request has been submitted:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #dc3545;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            ${data.customerPhone ? `<p><strong>Phone:</strong> ${data.customerPhone}</p>` : ''}
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            ${data.eventDescription ? `<p><strong>Description:</strong> ${data.eventDescription}</p>` : ''}
            <p><strong>Facility:</strong> ${data.facilityName}</p>
            <p><strong>Date & Time:</strong> ${data.startDateTime.toLocaleDateString()} from ${data.startDateTime.toLocaleTimeString()} to ${data.endDateTime.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${data.totalHours} hours</p>
            ${data.totalCost ? `<p><strong>Total Cost:</strong> £${data.totalCost.toFixed(2)}</p>` : ''}
            ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
            <p><strong>Status:</strong> ${data.status.toUpperCase()}</p>
          </div>
          
          <p>Please review this booking request and update its status in the admin panel.</p>
          
          <p>Best regards,<br>
          Booking System</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending admin booking notification:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send admin booking notification:', error)
    throw error
  }
}

export async function sendAdminBookingStatusUpdate(data: AdminNotificationData) {
  try {
    const statusMessages = {
      confirmed: 'Booking has been confirmed',
      cancelled: 'Booking has been cancelled',
      rejected: 'Booking has been rejected'
    }

    const message = statusMessages[data.status as keyof typeof statusMessages] || `Booking status updated to: ${data.status}`

    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['dakthi9@gmail.com'],
      subject: `Booking Status Update - ${data.eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Booking Status Update
          </h2>
          
          <p>${message}</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #007bff;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            <p><strong>Facility:</strong> ${data.facilityName}</p>
            <p><strong>Date & Time:</strong> ${data.startDateTime.toLocaleDateString()} from ${data.startDateTime.toLocaleTimeString()} to ${data.endDateTime.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${data.totalHours} hours</p>
            ${data.totalCost ? `<p><strong>Total Cost:</strong> £${data.totalCost.toFixed(2)}</p>` : ''}
            <p><strong>Status:</strong> <span style="color: ${data.status === 'confirmed' ? '#28a745' : data.status === 'cancelled' || data.status === 'rejected' ? '#dc3545' : '#007bff'}; font-weight: bold;">${data.status.toUpperCase()}</span></p>
          </div>
          
          <p>Admin notification - no action required.</p>
          
          <p>Best regards,<br>
          Booking System</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending admin status update:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send admin status update:', error)
    throw error
  }
}