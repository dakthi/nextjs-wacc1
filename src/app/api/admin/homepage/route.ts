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

    // Get hero-related settings from SiteSetting table
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            'hero_background_image',
            'hero_cta_button_text', 
            'hero_cta_button_link',
            'hero_subtitle',
            'hero_description'
          ]
        }
      }
    })

    // Convert to expected format for admin UI
    const content = {
      heroVideoUrl: settings.find(s => s.key === 'hero_background_image')?.value || '/img/entrance.jpeg',
      heroButtonText: settings.find(s => s.key === 'hero_cta_button_text')?.value || 'EXPLORE OUR PROGRAMS',
      heroButtonLink: settings.find(s => s.key === 'hero_cta_button_link')?.value || '/programs'
    }

    return NextResponse.json(content)
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

    // Update hero-related settings in SiteSetting table
    const settingsToUpdate = [
      { key: 'hero_background_image', value: data.hero_background_image || '/img/entrance.jpeg' },
      { key: 'hero_cta_button_text', value: data.hero_cta_button_text || 'EXPLORE OUR PROGRAMS' },
      { key: 'hero_cta_button_link', value: data.hero_cta_button_link || '/programs' }
    ]

    // Use upsert to create or update each setting
    for (const setting of settingsToUpdate) {
      await prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: { 
          key: setting.key, 
          value: setting.value, 
          type: 'string',
          description: `Hero section ${setting.key.replace('hero_', '').replace('_', ' ')}`
        }
      })
    }

    return NextResponse.json({ 
      message: 'Hero settings updated successfully',
      heroVideoUrl: data.hero_background_image,
      heroButtonText: data.hero_cta_button_text,
      heroButtonLink: data.hero_cta_button_link
    })
  } catch (error) {
    console.error('Error saving homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to save homepage content' },
      { status: 500 }
    )
  }
}