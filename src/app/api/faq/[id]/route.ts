import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/faq/[id] - Get a specific FAQ item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid FAQ item ID' },
        { status: 400 }
      )
    }

    const faqItem = await prisma.faqItem.findUnique({
      where: { id }
    })

    if (!faqItem) {
      return NextResponse.json(
        { error: 'FAQ item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(faqItem)
  } catch (error) {
    console.error('Error fetching FAQ item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQ item' },
      { status: 500 }
    )
  }
}

// PUT /api/faq/[id] - Update a FAQ item
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
        { error: 'Invalid FAQ item ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      question,
      answer,
      category,
      imageUrl,
      displayOrder,
      active
    } = body

    const updatedFaqItem = await prisma.faqItem.update({
      where: { id },
      data: {
        question,
        answer,
        category,
        imageUrl,
        displayOrder,
        active
      }
    })

    return NextResponse.json(updatedFaqItem)
  } catch (error) {
    console.error('Error updating FAQ item:', error)
    return NextResponse.json(
      { error: 'Failed to update FAQ item' },
      { status: 500 }
    )
  }
}

// DELETE /api/faq/[id] - Delete a FAQ item (soft delete)
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
        { error: 'Invalid FAQ item ID' },
        { status: 400 }
      )
    }

    // Soft delete by setting active to false
    await prisma.faqItem.update({
      where: { id },
      data: { active: false }
    })

    return NextResponse.json({ message: 'FAQ item deleted successfully' })
  } catch (error) {
    console.error('Error deleting FAQ item:', error)
    return NextResponse.json(
      { error: 'Failed to delete FAQ item' },
      { status: 500 }
    )
  }
}