import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/opening-hours - Get opening hours
export async function GET() {
  try {
    const openingHours = await prisma.openingHours.findMany({
      where: { active: true },
      orderBy: { id: 'asc' }
    })

    return NextResponse.json(openingHours)
  } catch (error) {
    console.error('Error fetching opening hours:', error)
    return NextResponse.json(
      { error: 'Failed to fetch opening hours' },
      { status: 500 }
    )
  }
}

// PUT /api/opening-hours/[id] - Update opening hours
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, schedule, description, type } = body

    const updatedHours = await prisma.openingHours.update({
      where: { id },
      data: {
        title,
        schedule,
        description,
        type
      }
    })

    return NextResponse.json(updatedHours)
  } catch (error) {
    console.error('Error updating opening hours:', error)
    return NextResponse.json(
      { error: 'Failed to update opening hours' },
      { status: 500 }
    )
  }
}