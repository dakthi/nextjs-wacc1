import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/facilities/[id] - Get a specific facility
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid facility ID' },
        { status: 400 }
      )
    }

    const facility = await prisma.facility.findUnique({
      where: { id }
    })

    if (!facility) {
      return NextResponse.json(
        { error: 'Facility not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(facility)
  } catch (error) {
    console.error('Error fetching facility:', error)
    return NextResponse.json(
      { error: 'Failed to fetch facility' },
      { status: 500 }
    )
  }
}

// PUT /api/facilities/[id] - Update a facility
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
        { error: 'Invalid facility ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      name,
      subtitle,
      description,
      capacity,
      dimensions,
      hourlyRate,
      features,
      imageUrl
    } = body

    const updatedFacility = await prisma.facility.update({
      where: { id },
      data: {
        name,
        subtitle,
        description,
        capacity,
        dimensions,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        features,
        imageUrl
      }
    })

    return NextResponse.json(updatedFacility)
  } catch (error) {
    console.error('Error updating facility:', error)
    return NextResponse.json(
      { error: 'Failed to update facility' },
      { status: 500 }
    )
  }
}

// DELETE /api/facilities/[id] - Delete a facility (soft delete)
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
        { error: 'Invalid facility ID' },
        { status: 400 }
      )
    }

    // Soft delete by setting active to false
    await prisma.facility.update({
      where: { id },
      data: { active: false }
    })

    return NextResponse.json({ message: 'Facility deleted successfully' })
  } catch (error) {
    console.error('Error deleting facility:', error)
    return NextResponse.json(
      { error: 'Failed to delete facility' },
      { status: 500 }
    )
  }
}