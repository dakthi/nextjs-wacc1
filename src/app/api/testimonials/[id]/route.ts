import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/testimonials/[id] - Get a specific testimonial
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid testimonial ID' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id }
    })

    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    )
  }
}

// PUT /api/testimonials/[id] - Update a testimonial
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
        { error: 'Invalid testimonial ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      quote,
      authorName,
      authorTitle,
      avatarUrl,
      displayOrder,
      active
    } = body

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        quote,
        authorName,
        authorTitle,
        avatarUrl,
        displayOrder,
        active
      }
    })

    return NextResponse.json(updatedTestimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

// DELETE /api/testimonials/[id] - Delete a testimonial (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication for write operations
  const isAuthed = await checkAuth(request as NextRequest)
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
        { error: 'Invalid testimonial ID' },
        { status: 400 }
      )
    }

    // Soft delete by setting active to false
    await prisma.testimonial.update({
      where: { id },
      data: { active: false }
    })

    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}