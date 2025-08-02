import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/settings/[key] - Get a specific site setting
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: params.key }
    })

    if (!setting) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Error fetching site setting:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site setting' },
      { status: 500 }
    )
  }
}

// PUT /api/settings/[key] - Update a specific site setting
export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
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
    const body = await request.json()
    const {
      value,
      type,
      description
    } = body

    const updatedSetting = await prisma.siteSetting.upsert({
      where: { key: params.key },
      update: {
        value,
        type,
        description
      },
      create: {
        key: params.key,
        value,
        type,
        description
      }
    })

    return NextResponse.json(updatedSetting)
  } catch (error) {
    console.error('Error updating site setting:', error)
    return NextResponse.json(
      { error: 'Failed to update site setting' },
      { status: 500 }
    )
  }
}

// DELETE /api/settings/[key] - Delete a site setting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
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
    await prisma.siteSetting.delete({
      where: { key: params.key }
    })

    return NextResponse.json({ message: 'Setting deleted successfully' })
  } catch (error) {
    console.error('Error deleting site setting:', error)
    return NextResponse.json(
      { error: 'Failed to delete site setting' },
      { status: 500 }
    )
  }
}