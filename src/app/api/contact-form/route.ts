import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormNotification } from '@/lib/email'

// POST /api/contact-form - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email notification
    try {
      await sendContactFormNotification({
        name,
        email,
        phone: phone || undefined,
        subject,
        message
      })

      return NextResponse.json(
        { 
          success: true, 
          message: 'Your message has been sent successfully. We will respond within 2-3 working days.' 
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Failed to send contact form email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}