import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/facility-gallery/[id] - Get single gallery image
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const galleryImage = await prisma.facilityGallery.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!galleryImage) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
      { status: 500 }
    )
  }
}

// PUT /api/facility-gallery/[id] - Update gallery image
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      title,
      description,
      imageUrl,
      category,
      altText,
      displayOrder,
      active,
      featured
    } = body

    const galleryImage = await prisma.facilityGallery.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(category !== undefined && { category }),
        ...(altText !== undefined && { altText }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(active !== undefined && { active }),
        ...(featured !== undefined && { featured })
      }
    })

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    )
  }
}

// DELETE /api/facility-gallery/[id] - Delete gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    await prisma.facilityGallery.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Gallery image deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    )
  }
}