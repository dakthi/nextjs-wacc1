import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the first (and should be only) homepage content record
    const content = await prisma.homepageContent.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(content || {})
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homepage content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Check if there's existing content
    const existingContent = await prisma.homepageContent.findFirst()

    let content
    if (existingContent) {
      // Update existing content - map the frontend field names to database field names
      content = await prisma.homepageContent.update({
        where: { id: existingContent.id },
        data: {
          // Hero Section
          heroVideoUrl: data.hero_background_image,
          heroButtonText: data.hero_cta_button_text,
          heroButtonLink: data.hero_cta_button_link,
          
          // Split Banner Section
          bannerProgramsTitle: data.banner_programs_title,
          bannerProgramsSubtitle: data.banner_programs_subtitle,
          bannerProgramsImage: data.banner_programs_image,
          bannerFacilitiesTitle: data.banner_facilities_title,
          bannerFacilitiesSubtitle: data.banner_facilities_subtitle,
          
          // Community Section
          communityPretitle: data.community_section_pretitle,
          communityTitle: data.community_section_title,
          communityDescription: data.community_section_description,
          
          // Facilities Section
          facilitiesTitle: data.facilities_section_title,
          facilitiesSectionHeading: data.facilities_section_heading,
          
          // Location Section
          locationTitle: data.location_section_title,
          locationDescription: data.location_section_description,
          locationContact: data.location_section_contact,
          locationSectionHeading: data.location_section_heading,
          locationImage: data.location_section_image,
          
          // Programs Section
          programsSectionTitle: data.programs_section_title,
          programsViewAllText: data.programs_button_text,
        }
      })
    } else {
      // Create new content record
      content = await prisma.homepageContent.create({
        data: {
          // Hero Section
          heroVideoUrl: data.hero_background_image,
          heroButtonText: data.hero_cta_button_text,
          heroButtonLink: data.hero_cta_button_link,
          
          // Split Banner Section
          bannerProgramsTitle: data.banner_programs_title,
          bannerProgramsSubtitle: data.banner_programs_subtitle,
          bannerProgramsImage: data.banner_programs_image,
          bannerFacilitiesTitle: data.banner_facilities_title,
          bannerFacilitiesSubtitle: data.banner_facilities_subtitle,
          
          // Community Section
          communityPretitle: data.community_section_pretitle,
          communityTitle: data.community_section_title,
          communityDescription: data.community_section_description,
          
          // Facilities Section
          facilitiesTitle: data.facilities_section_title,
          facilitiesSectionHeading: data.facilities_section_heading,
          
          // Location Section
          locationTitle: data.location_section_title,
          locationDescription: data.location_section_description,
          locationContact: data.location_section_contact,
          locationSectionHeading: data.location_section_heading,
          locationImage: data.location_section_image,
          
          // Programs Section
          programsSectionTitle: data.programs_section_title,
          programsViewAllText: data.programs_button_text,
        }
      })
    }

    return NextResponse.json(content, { status: 200 })
  } catch (error) {
    console.error('Error saving homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to save homepage content' },
      { status: 500 }
    )
  }
}