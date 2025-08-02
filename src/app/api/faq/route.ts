import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/auth-middleware'

// GET /api/faq - Get all FAQ items
export async function GET() {
  try {
    const faqItems = await prisma.faqItem.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json(faqItems)
  } catch (error) {
    console.error('Error fetching FAQ items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQ items' },
      { status: 500 }
    )
  }
}

// POST /api/faq - Create a new FAQ item
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
      question,
      answer,
      category,
      imageUrl,
      displayOrder = 0
    } = body

    const faqItem = await prisma.faqItem.create({
      data: {
        question,
        answer,
        category,
        imageUrl,
        displayOrder
      }
    })

    return NextResponse.json(faqItem, { status: 201 })
  } catch (error) {
    console.error('Error creating FAQ item:', error)
    return NextResponse.json(
      { error: 'Failed to create FAQ item' },
      { status: 500 }
    )
  }
}