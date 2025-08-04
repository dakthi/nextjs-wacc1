import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface BookingEmailData {
  bookingId: string
  customerName: string
  customerEmail: string
  facilityName: string
  eventTitle: string
  startDateTime: Date
  endDateTime: Date
  totalCost?: number
  totalHours: number
  status: string
}

export interface AdminNotificationData extends BookingEmailData {
  customerPhone?: string | null
  eventDescription?: string | null
  notes?: string | null
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [data.customerEmail],
      subject: `Booking Confirmation - ${data.eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Booking Confirmation
          </h2>
          
          <p>Dear ${data.customerName},</p>
          
          <p>Thank you for your booking request. Here are the details:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #007bff;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            <p><strong>Facility:</strong> ${data.facilityName}</p>
            <p><strong>Date & Time:</strong> ${data.startDateTime.toLocaleDateString()} from ${data.startDateTime.toLocaleTimeString()} to ${data.endDateTime.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${data.totalHours} hours</p>
            ${data.totalCost ? `<p><strong>Total Cost:</strong> £${data.totalCost.toFixed(2)}</p>` : ''}
            <p><strong>Status:</strong> ${data.status.toUpperCase()}</p>
          </div>
          
          <p>Your booking is currently <strong>${data.status}</strong>. We will review your request and get back to you shortly.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          West Acton Community Centre Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            This is an automated email. Please do not reply to this email address.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending booking confirmation email:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error)
    throw error
  }
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

export async function sendBookingStatusUpdateEmail(data: BookingEmailData) {
  try {
    const statusMessages = {
      confirmed: 'Your booking has been confirmed!',
      cancelled: 'Your booking has been cancelled.',
      rejected: 'Unfortunately, your booking request has been rejected.'
    }

    const message = statusMessages[data.status as keyof typeof statusMessages] || `Your booking status has been updated to: ${data.status}`

    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [data.customerEmail],
      subject: `Booking Status Update - ${data.eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Booking Status Update
          </h2>
          
          <p>Dear ${data.customerName},</p>
          
          <p>${message}</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #007bff;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            <p><strong>Facility:</strong> ${data.facilityName}</p>
            <p><strong>Date & Time:</strong> ${data.startDateTime.toLocaleDateString()} from ${data.startDateTime.toLocaleTimeString()} to ${data.endDateTime.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${data.totalHours} hours</p>
            ${data.totalCost ? `<p><strong>Total Cost:</strong> £${data.totalCost.toFixed(2)}</p>` : ''}
            <p><strong>Status:</strong> <span style="color: ${data.status === 'confirmed' ? '#28a745' : data.status === 'cancelled' || data.status === 'rejected' ? '#dc3545' : '#007bff'}; font-weight: bold;">${data.status.toUpperCase()}</span></p>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          West Acton Community Centre Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            This is an automated email. Please do not reply to this email address.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending booking status update email:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send booking status update email:', error)
    throw error
  }
}