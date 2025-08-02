import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/contact - Get all contact information
export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact information' },
      { status: 500 }
    )
  }
}

// POST /api/contact - Create new contact information
export async function POST(request: NextRequest) {
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
      { error: 'Failed to create contact information' },
      { status: 500 }
    )
  }
}