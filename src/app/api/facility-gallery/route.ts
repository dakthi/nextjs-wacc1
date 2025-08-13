import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/facility-gallery - Get all gallery images
export async function GET() {
  try {
    const galleryImages = await prisma.facilityGallery.findMany({
      where: { active: true },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(galleryImages, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching facility gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    )
  }
}

// POST /api/facility-gallery - Create a new gallery image
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
      title,
      description,
      imageUrl,
      category,
      altText,
      displayOrder,
      featured
    } = body

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      )
    }

    const galleryImage = await prisma.facilityGallery.create({
      data: {
        title,
        description,
        imageUrl,
        category: category || 'general',
        altText: altText || title,
        displayOrder: displayOrder || 0,
        featured: featured || false
      }
    })

    return NextResponse.json(galleryImage, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    )
  }
}

// PUT /api/facility-gallery - Update display order (bulk operation)
export async function PUT(request: NextRequest) {
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { reorderData } = body

    if (!Array.isArray(reorderData)) {
      return NextResponse.json(
        { error: 'Invalid reorder data' },
        { status: 400 }
      )
    }

    // Update display order for multiple items
    const updatePromises = reorderData.map(({ id, displayOrder }) =>
      prisma.facilityGallery.update({
        where: { id },
        data: { displayOrder }
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ message: 'Display order updated successfully' })
  } catch (error) {
    console.error('Error updating display order:', error)
    return NextResponse.json(
      { error: 'Failed to update display order' },
      { status: 500 }
    )
  }
}