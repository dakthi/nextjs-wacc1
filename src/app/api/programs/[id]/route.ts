import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/programs/[id] - Get a specific program
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid program ID' },
        { status: 400 }
      )
    }

    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        schedules: {
          where: { active: true },
          orderBy: { id: 'asc' }
        }
      }
    })

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(program)
  } catch (error) {
    console.error('Error fetching program:', error)
    return NextResponse.json(
      { error: 'Failed to fetch program' },
      { status: 500 }
    )
  }
}

// PUT /api/programs/[id] - Update a program
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
        { error: 'Invalid program ID' },
        { status: 400 }
      )
    }

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

    // Update program and replace schedules
    const updatedProgram = await prisma.program.update({
      where: { id },
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
          deleteMany: {}, // Delete existing schedules
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

    return NextResponse.json(updatedProgram)
  } catch (error) {
    console.error('Error updating program:', error)
    return NextResponse.json(
      { error: 'Failed to update program' },
      { status: 500 }
    )
  }
}

// DELETE /api/programs/[id] - Delete a program (soft delete)
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
        { error: 'Invalid program ID' },
        { status: 400 }
      )
    }

    // Soft delete by setting active to false
    await prisma.program.update({
      where: { id },
      data: { active: false }
    })

    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { error: 'Failed to delete program' },
      { status: 500 }
    )
  }
}