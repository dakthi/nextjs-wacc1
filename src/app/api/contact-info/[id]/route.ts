import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/contact-info/[id] - Get specific contact info
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid contact info ID' },
        { status: 400 }
      )
    }

    const contactInfo = await prisma.contactInfo.findUnique({
      where: { id }
    })

    if (!contactInfo) {
      return NextResponse.json(
        { error: 'Contact info not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    )
  }
}

// PUT /api/contact-info/[id] - Update contact info
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for write operations
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
        { error: 'Invalid contact info ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      type,
      label,
      value,
      description,
      displayOrder,
      active
    } = body

    const updatedContactInfo = await prisma.contactInfo.update({
      where: { id },
      data: {
        type,
        label,
        value,
        description,
        displayOrder,
        active
      }
    })

    return NextResponse.json(updatedContactInfo)
  } catch (error) {
    console.error('Error updating contact info:', error)
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    )
  }
}

// DELETE /api/contact-info/[id] - Delete contact info (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for write operations
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
        { error: 'Invalid contact info ID' },
        { status: 400 }
      )
    }

    // Soft delete by setting active to false
    await prisma.contactInfo.update({
      where: { id },
      data: { active: false }
    })

    return NextResponse.json({ message: 'Contact info deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact info:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact info' },
      { status: 500 }
    )
  }
}