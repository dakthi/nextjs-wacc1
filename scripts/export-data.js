const { PrismaClient } = require('@prisma/client')
const fs = require('fs').promises
const path = require('path')

const prisma = new PrismaClient()

async function exportData() {
  try {
    console.log('📦 Exporting database data...')
    
    const data = {
      // Export all data from each table
      users: await prisma.user.findMany(),
      accounts: await prisma.account.findMany(),
      sessions: await prisma.session.findMany(),
      verificationTokens: await prisma.verificationToken.findMany(),
      siteSettings: await prisma.siteSetting.findMany(),
      facilities: await prisma.facility.findMany(),
      facilityServices: await prisma.facilityService.findMany(),
      programs: await prisma.program.findMany({
        include: { schedules: true }
      }),
      communityGroups: await prisma.communityGroup.findMany(),
      testimonials: await prisma.testimonial.findMany(),
      faqs: await prisma.faqItem.findMany(),
      contactInfo: await prisma.contactInfo.findMany(),
      openingHours: await prisma.openingHours.findMany(),
      mediaItems: await prisma.mediaItem.findMany(),
      bookings: await prisma.bookings.findMany(),
      bookingAvailability: await prisma.booking_availability.findMany(),
      exportedAt: new Date().toISOString()
    }

    // Remove sensitive data from users
    data.users = data.users.map(user => ({
      ...user,
      password: 'REDACTED' // Don't export actual password hashes
    }))

    // Write to JSON file
    const exportPath = path.join(process.cwd(), 'prisma', 'exported-data.json')
    await fs.writeFile(exportPath, JSON.stringify(data, null, 2))
    
    console.log('✅ Data exported successfully to:', exportPath)
    console.log('\n📊 Export summary:')
    console.log(`- Users: ${data.users.length}`)
    console.log(`- Accounts: ${data.accounts.length}`)
    console.log(`- Sessions: ${data.sessions.length}`)
    console.log(`- Verification Tokens: ${data.verificationTokens.length}`)
    console.log(`- Site Settings: ${data.siteSettings.length}`)
    console.log(`- Facilities: ${data.facilities.length}`)
    console.log(`- Programs: ${data.programs.length}`)
    console.log(`- Community Groups: ${data.communityGroups.length}`)
    console.log(`- Testimonials: ${data.testimonials.length}`)
    console.log(`- FAQs: ${data.faqs.length}`)
    console.log(`- Contact Info: ${data.contactInfo.length}`)
    console.log(`- Opening Hours: ${data.openingHours.length}`)
    console.log(`- Media Items: ${data.mediaItems.length}`)
    console.log(`- Bookings: ${data.bookings.length}`)
    console.log(`- Booking Availability: ${data.bookingAvailability.length}`)
    
  } catch (error) {
    console.error('❌ Error exporting data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

exportData()