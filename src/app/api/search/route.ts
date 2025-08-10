import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'program' | 'facility' | 'page'
  url: string
}

// GET /api/search - Global search across programs, facilities, and pages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json([])
    }

    const searchTerm = query.trim().toLowerCase()
    const results: SearchResult[] = []

    // Only search database if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      // Search Programs
      try {
        const programs = await prisma.program.findMany({
        where: {
          active: true,
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              instructor: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              category: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        },
        select: {
          id: true,
          title: true,
          description: true,
          instructor: true,
          category: true
        },
        take: 10
      })

      programs.forEach((program: any) => {
        results.push({
          id: `program-${program.id}`,
          title: program.title,
          description: program.description || `${program.category} program${program.instructor ? ` with ${program.instructor}` : ''}`,
          type: 'program',
          url: '/programs'
        })
      })
    } catch (error) {
      console.error('Error searching programs:', error)
    }

    // Search Facilities
    try {
      const facilities = await prisma.facility.findMany({
        where: {
          active: true,
          OR: [
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              subtitle: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        },
        select: {
          id: true,
          name: true,
          description: true,
          subtitle: true,
          capacity: true
        },
        take: 10
      })

      facilities.forEach((facility: any) => {
        results.push({
          id: `facility-${facility.id}`,
          title: facility.name,
          description: facility.description || facility.subtitle || `Capacity: ${facility.capacity} people`,
          type: 'facility',
          url: '/facilities'
        })
      })
    } catch (error) {
      console.error('Error searching facilities:', error)
    }

    // Search FAQ Items
    try {
      const faqItems = await prisma.faqItem.findMany({
        where: {
          active: true,
          OR: [
            {
              question: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              answer: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        },
        select: {
          id: true,
          question: true,
          answer: true
        },
        take: 5
      })

      faqItems.forEach((faq: any) => {
        results.push({
          id: `faq-${faq.id}`,
          title: faq.question,
          description: faq.answer.length > 100 ? faq.answer.substring(0, 100) + '...' : faq.answer,
          type: 'page',
          url: '/contact#faq'
        })
      })
    } catch (error) {
      console.error('Error searching FAQ:', error)
    }
    } // End of DATABASE_URL check

    // Add static page results based on search terms
    const staticPages = [
      {
        keywords: ['about', 'info', 'information', 'who', 'what', 'history'],
        result: {
          id: 'page-about',
          title: 'About West Acton Community Centre',
          description: 'Learn about our history, mission, and community impact',
          type: 'page' as const,
          url: '/about'
        }
      },
      {
        keywords: ['contact', 'phone', 'email', 'address', 'location', 'reach'],
        result: {
          id: 'page-contact',
          title: 'Contact Us',
          description: 'Get in touch with West Acton Community Centre',
          type: 'page' as const,
          url: '/contact'
        }
      },
      {
        keywords: ['book', 'booking', 'hire', 'rent', 'room', 'hall', 'venue'],
        result: {
          id: 'page-facilities',
          title: 'Book Our Facilities',
          description: 'Hire our halls and spaces for your events',
          type: 'page' as const,
          url: '/facilities'
        }
      },
      {
        keywords: ['program', 'programmes', 'class', 'classes', 'activity', 'activities', 'what\'s on'],
        result: {
          id: 'page-programs',
          title: 'Programs & Activities',
          description: 'Explore our weekly programs and activities',
          type: 'page' as const,
          url: '/programs'
        }
      }
    ]

    staticPages.forEach((page: any) => {
      if (page.keywords.some((keyword: any) => keyword.includes(searchTerm) || searchTerm.includes(keyword))) {
        results.push(page.result)
      }
    })

    // Remove duplicates and limit results
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.id === result.id)
    )

    // Sort results by relevance (programs first, then facilities, then pages)
    const sortedResults = uniqueResults.sort((a, b) => {
      const typeOrder = { program: 0, facility: 1, page: 2 }
      return typeOrder[a.type] - typeOrder[b.type]
    })

    return NextResponse.json(sortedResults.slice(0, 12))
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}