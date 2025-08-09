import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/media/[id] - Get single media item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid media ID' },
        { status: 400 }
      )
    }

    const mediaItem = await prisma.mediaItem.findUnique({
      where: { id }
    })

    if (!mediaItem) {
      return NextResponse.json(
        { error: 'Media item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(mediaItem)
  } catch (error) {
    console.error('Error fetching media item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media item' },
      { status: 500 }
    )
  }
}

// PUT /api/media/[id] - Update media item metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
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
        { error: 'Invalid media ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { altText, caption } = body

    const mediaItem = await prisma.mediaItem.update({
      where: { id },
      data: {
        altText: altText || null,
        caption: caption || null
      }
    })

    return NextResponse.json(mediaItem)
  } catch (error) {
    console.error('Error updating media item:', error)
    return NextResponse.json(
      { error: 'Failed to update media item' },
      { status: 500 }
    )
  }
}

// DELETE /api/media/[id] - Delete media item and file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
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
        { error: 'Invalid media ID' },
        { status: 400 }
      )
    }

    // Get media item to find file path
    const mediaItem = await prisma.mediaItem.findUnique({
      where: { id }
    })

    if (!mediaItem) {
      return NextResponse.json(
        { error: 'Media item not found' },
        { status: 404 }
      )
    }

    // Delete file from disk
    const fullPath = path.join(process.cwd(), 'public', mediaItem.filePath)
    if (existsSync(fullPath)) {
      await unlink(fullPath)
    }

    // Delete database record
    await prisma.mediaItem.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Media item deleted successfully' })
  } catch (error) {
    console.error('Error deleting media item:', error)
    return NextResponse.json(
      { error: 'Failed to delete media item' },
      { status: 500 }
    )
  }
}