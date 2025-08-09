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
      // Update existing content
      content = await prisma.homepageContent.update({
        where: { id: existingContent.id },
        data: {
          heroTitle: data.hero_title,
          heroSubtitle: data.hero_subtitle,
          heroDescription: data.hero_description,
          heroVideoUrl: data.hero_video_url,
          heroButtonText: data.hero_button_text,
          heroButtonLink: data.hero_button_link,
          
          bannerProgramsTitle: data.banner_programs_title,
          bannerProgramsSubtitle: data.banner_programs_subtitle,
          bannerProgramsImage: data.banner_programs_image,
          bannerFacilitiesTitle: data.banner_facilities_title,
          bannerFacilitiesSubtitle: data.banner_facilities_subtitle,
          
          communityPretitle: data.community_pretitle,
          communityTitle: data.community_title,
          communityDescription: data.community_description,
          
          aboutTitle: data.about_title,
          aboutDescription: data.about_description,
          aboutButtonText: data.about_button_text,
          aboutButtonLink: data.about_button_link,
          
          facilitiesTitle: data.facilities_title,
          facilitiesDescription: data.facilities_description,
          facilitiesContact: data.facilities_contact,
          facilitiesSectionHeading: data.facilities_section_heading,
          
          locationTitle: data.location_title,
          locationDescription: data.location_description,
          locationContact: data.location_contact,
          locationSectionHeading: data.location_section_heading,
          locationImage: data.location_image,
          
          programsSectionTitle: data.programs_section_title,
          programsViewAllText: data.programs_view_all_text,
        }
      })
    } else {
      // Create new content record
      content = await prisma.homepageContent.create({
        data: {
          heroTitle: data.hero_title,
          heroSubtitle: data.hero_subtitle,
          heroDescription: data.hero_description,
          heroVideoUrl: data.hero_video_url,
          heroButtonText: data.hero_button_text,
          heroButtonLink: data.hero_button_link,
          
          bannerProgramsTitle: data.banner_programs_title,
          bannerProgramsSubtitle: data.banner_programs_subtitle,
          bannerProgramsImage: data.banner_programs_image,
          bannerFacilitiesTitle: data.banner_facilities_title,
          bannerFacilitiesSubtitle: data.banner_facilities_subtitle,
          
          communityPretitle: data.community_pretitle,
          communityTitle: data.community_title,
          communityDescription: data.community_description,
          
          aboutTitle: data.about_title,
          aboutDescription: data.about_description,
          aboutButtonText: data.about_button_text,
          aboutButtonLink: data.about_button_link,
          
          facilitiesTitle: data.facilities_title,
          facilitiesDescription: data.facilities_description,
          facilitiesContact: data.facilities_contact,
          facilitiesSectionHeading: data.facilities_section_heading,
          
          locationTitle: data.location_title,
          locationDescription: data.location_description,
          locationContact: data.location_contact,
          locationSectionHeading: data.location_section_heading,
          locationImage: data.location_image,
          
          programsSectionTitle: data.programs_section_title,
          programsViewAllText: data.programs_view_all_text,
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