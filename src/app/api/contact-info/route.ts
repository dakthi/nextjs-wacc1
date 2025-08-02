import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/contact-info - Get all contact info
export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json(contactInfo, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    )
  }
}

// POST /api/contact-info - Create new contact info
export async function POST(request: NextRequest) {
  // Check authentication for write operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const {
      type,
      label,
      value,
      description,
      displayOrder = 0
    } = body

    const contactInfo = await prisma.contactInfo.create({
      data: {
        type,
        label,
        value,
        description,
        displayOrder
      }
    })

    return NextResponse.json(contactInfo, { status: 201 })
  } catch (error) {
    console.error('Error creating contact info:', error)
    return NextResponse.json(
      { error: 'Failed to create contact info' },
      { status: 500 }
    )
  }
}