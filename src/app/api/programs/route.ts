import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/programs - Get all programs
export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { active: true },
      include: {
        schedules: {
          where: { active: true },
          orderBy: { id: 'asc' }
        }
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(programs)
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

// POST /api/programs - Create a new program
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
      category,
      ageGroup,
      price,
      bookingInfo,
      instructor,
      contactEmail,
      contactPhone,
      contactWebsite,
      imageUrl,
      schedules = []
    } = body

    const program = await prisma.program.create({
      data: {
        title,
        description,
        category,
        ageGroup,
        price,
        bookingInfo,
        instructor,
        contactEmail,
        contactPhone,
        contactWebsite,
        imageUrl,
        schedules: {
          create: schedules.map((schedule: any) => ({
            description: schedule.description,
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime
          }))
        }
      },
      include: {
        schedules: true
      }
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}