import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/facilities - Get all facilities
export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(facilities)
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch facilities' },
      { status: 500 }
    )
  }
}

// POST /api/facilities - Create a new facility
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
      name,
      subtitle,
      description,
      capacity,
      dimensions,
      hourlyRate,
      features,
      imageUrl
    } = body

    const facility = await prisma.facility.create({
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

    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    console.error('Error creating facility:', error)
    return NextResponse.json(
      { error: 'Failed to create facility' },
      { status: 500 }
    )
  }
}