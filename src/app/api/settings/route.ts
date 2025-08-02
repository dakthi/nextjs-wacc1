import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'
import { clearSettingsCache } from '@/lib/settings'

// GET /api/settings - Get all site settings
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' }
    })

    return NextResponse.json(settings, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    )
  }
}

// POST /api/settings - Create a new site setting
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
      key,
      value,
      type,
      description
    } = body

    const setting = await prisma.siteSetting.create({
      data: {
        key,
        value,
        type,
        description
      }
    })

    return NextResponse.json(setting, { status: 201 })
  } catch (error) {
    console.error('Error creating site setting:', error)
    return NextResponse.json(
      { error: 'Failed to create site setting' },
      { status: 500 }
    )
  }
}

// PUT /api/settings - Bulk update site settings
export async function PUT(request: NextRequest) {
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
    const { settings } = body

    // Update each setting
    const updatePromises = settings.map((setting: any) =>
      prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: {
          value: setting.value,
          type: setting.type,
          description: setting.description
        },
        create: {
          key: setting.key,
          value: setting.value,
          type: setting.type,
          description: setting.description
        }
      })
    )

    const updatedSettings = await Promise.all(updatePromises)

    // Clear the settings cache so changes reflect immediately
    clearSettingsCache()

    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    )
  }
}