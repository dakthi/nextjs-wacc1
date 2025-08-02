import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.programSchedule.deleteMany()
  await prisma.program.deleteMany()
  await prisma.facility.deleteMany()
  await prisma.facilityService.deleteMany()
  await prisma.contactInfo.deleteMany()
  await prisma.openingHours.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.faqItem.deleteMany()
  await prisma.communityGroup.deleteMany()
  await prisma.siteSetting.deleteMany()

  console.log('🗑️ Cleared existing data')

  // Seed Programs
  const stayPlay = await prisma.program.create({
    data: {
      title: "West Acton Stay & Play",
      description: "Drop-in session run by professionals with toys, arts & crafts, painting, cars & tractors, and soft play in our spacious hall.",
      category: "early-years",
      ageGroup: "Young children & parents",
      price: "Members £4.00 per session, siblings £1.00",
      bookingInfo: "No booking required - just come along!",
      imageUrl: "/img/poster-stayandplay.jpeg",
      schedules: {
        create: [
          { description: "Monday: 10:00 AM - 11:45 AM", dayOfWeek: "Monday", startTime: "10:00", endTime: "11:45" },
          { description: "Wednesday: 10:00 AM - 11:45 AM", dayOfWeek: "Wednesday", startTime: "10:00", endTime: "11:45" },
          { description: "Friday: 10:00 AM - 11:45 AM", dayOfWeek: "Friday", startTime: "10:00", endTime: "11:45" }
        ]
      }
    }
  })

  const taekwondo = await prisma.program.create({
    data: {
      title: "West Acton Taekwondo",
      description: "Traditional martial arts training for children and adults, building discipline, fitness, and confidence.",
      category: "martial-arts",
      ageGroup: "Ages 4+",
      imageUrl: "/img/poster-taekwondo.jpeg",
      schedules: {
        create: [
          { description: "Children (Ages 4-13): Wednesday: 5:00 PM - 7:00 PM", dayOfWeek: "Wednesday", startTime: "17:00", endTime: "19:00" },
          { description: "Children (Ages 4-13): Sunday: 10:00 AM - 11:30 AM", dayOfWeek: "Sunday", startTime: "10:00", endTime: "11:30" },
          { description: "Adults (Ages 14+): Friday: 6:30 PM - 8:30 PM", dayOfWeek: "Friday", startTime: "18:30", endTime: "20:30" },
          { description: "Adults (Ages 14+): Sunday: 11:30 AM - 2:00 PM (Technical)", dayOfWeek: "Sunday", startTime: "11:30", endTime: "14:00" },
          { description: "Adults (Ages 14+): Sunday: 1:30 PM - 3:00 PM (Sparring)", dayOfWeek: "Sunday", startTime: "13:30", endTime: "15:00" }
        ]
      }
    }
  })

  const kungFu = await prisma.program.create({
    data: {
      title: "Fitness Exercise Club - Lau Gar Kung Fu",
      description: "Traditional Shaolin-based martial art with structured training methods focusing on fitness and technique.",
      category: "martial-arts",
      ageGroup: "Adults",
      contactEmail: "b.k.f.f@hotmail.co.uk",
      contactPhone: "07572 718 870",
      imageUrl: "/img/poster-kungfu.jpeg",
      schedules: {
        create: [
          { description: "Tuesday: 7:30 PM - 9:00 PM", dayOfWeek: "Tuesday", startTime: "19:30", endTime: "21:00" }
        ]
      }
    }
  })

  const kumon = await prisma.program.create({
    data: {
      title: "Kumon Maths & English (and Kokugo - Japanese)",
      description: "Educational support in English, Maths, and Japanese language with local tutor Teruko Mori.",
      category: "education",
      ageGroup: "Children & young people",
      instructor: "Teruko Mori",
      contactEmail: "actonwest@kumoncentre.co.uk",
      contactWebsite: "www.kumon.co.uk/Acton-West",
      imageUrl: "/img/poster-kumon.jpeg",
      schedules: {
        create: [
          { description: "Tuesday: 3:00 PM - 6:00 PM", dayOfWeek: "Tuesday", startTime: "15:00", endTime: "18:00" },
          { description: "Saturday: 10:00 AM - 1:00 PM", dayOfWeek: "Saturday", startTime: "10:00", endTime: "13:00" }
        ]
      }
    }
  })

  const judo = await prisma.program.create({
    data: {
      title: "Ealing Judo Club",
      description: "Promotes fitness, confidence, friendship, and fun through judo training for all skill levels.",
      category: "martial-arts",
      ageGroup: "All ages",
      contactEmail: "EalingJudoClub@hotmail.com",
      contactWebsite: "www.ealingjudoclub.com",
      imageUrl: "/img/IMG_1290.jpeg",
      schedules: {
        create: [
          { description: "Contact for current schedule" }
        ]
      }
    }
  })

  const zumba = await prisma.program.create({
    data: {
      title: "Zumba with Anae",
      description: "High-energy dance fitness classes combining fun choreography with great music.",
      category: "fitness",
      ageGroup: "Adults",
      instructor: "Anae",
      bookingInfo: "Book at anae-fitness.com",
      contactWebsite: "anae-fitness.com",
      imageUrl: "/img/poster-zumba.jpeg",
      schedules: {
        create: [
          { description: "Tuesday: 10:00 AM - 11:00 AM", dayOfWeek: "Tuesday", startTime: "10:00", endTime: "11:00" },
          { description: "Tuesday: 6:15 PM - 7:15 PM", dayOfWeek: "Tuesday", startTime: "18:15", endTime: "19:15" }
        ]
      }
    }
  })

  console.log('✅ Created programs')

  // Seed Facilities
  const mainHall = await prisma.facility.create({
    data: {
      name: "Main Hall",
      subtitle: "120 Person Capacity • 9.81m × 12.64m",
      description: "Spacious hall with outside paved area access, perfect for large events, parties, weddings, funerals, NHS courses, and community gatherings.",
      capacity: 120,
      dimensions: "9.81m × 12.64m",
      hourlyRate: 50.00,
      features: [
        "120 person capacity",
        "Outside paved area access", 
        "Kitchen facilities included",
        "10 large rectangular tables",
        "80 chairs included",
        "Professional cleaning included"
      ],
      imageUrl: "/img/80-chairs.jpeg"
    }
  })

  const smallHall = await prisma.facility.create({
    data: {
      name: "Small Hall",
      subtitle: "15 Person Capacity • 4.26m × 6.20m",
      description: "Intimate space ideal for small group classes, meetings, workshops, and community group gatherings.",
      capacity: 15,
      dimensions: "4.26m × 6.20m",
      hourlyRate: 20.00,
      features: [
        "15 person capacity",
        "Perfect for workshops",
        "Small group meetings",
        "Regular class sessions",
        "Comfortable environment"
      ],
      imageUrl: "/img/manager-office.jpeg"
    }
  })

  // Seed Facility Services
  await prisma.facilityService.create({
    data: {
      name: "Kitchen Access",
      description: "Full kitchen facilities with sink, power outlets for kettle, and small seating area. Outside catering welcome.",
      category: "Additional Services",
      features: [
        "Sink and counter space",
        "Power outlets for appliances", 
        "Small seating area",
        "Refrigeration available",
        "No cooking allowed - catering friendly"
      ]
    }
  })

  await prisma.facilityService.create({
    data: {
      name: "Tables & Chairs",
      description: "Quality furniture included with hall rentals at no additional cost.",
      category: "Additional Services",
      features: [
        "10 large rectangular tables (Main Hall)",
        "80 chairs (Main Hall)",
        "Professional setup available",
        "Included in hire price"
      ]
    }
  })

  console.log('✅ Created facilities and services')

  // Seed Contact Information
  await prisma.contactInfo.createMany({
    data: [
      {
        type: "email",
        label: "General Enquiries",
        value: "info@westactoncentre.co.uk",
        description: "For bookings, program information, and general questions",
        displayOrder: 1
      },
      {
        type: "phone",
        label: "Phone",
        value: "020 8992 8899",
        description: "Call during office hours for immediate assistance",
        displayOrder: 2
      },
      {
        type: "email",
        label: "Ealing Council",
        value: "customers@ealing.gov.uk",
        description: "For council-related enquiries and services",
        displayOrder: 3
      },
      {
        type: "website",
        label: "Website",
        value: "www.westactoncentre.co.uk",
        description: "Visit our main website for updates and information",
        displayOrder: 4
      }
    ]
  })

  // Seed Opening Hours
  await prisma.openingHours.createMany({
    data: [
      {
        title: "Centre Opening Hours",
        schedule: ["Monday - Sunday: 9:00 AM - 10:00 PM"],
        description: "The centre is open 7 days a week for programs and events",
        type: "centre"
      },
      {
        title: "Office Hours", 
        schedule: [
          "Monday: 9:30 AM - 11:00 AM",
          "Wednesday - Friday: 10:00 AM - 2:30 PM"
        ],
        description: "Best times to reach us by phone for immediate assistance",
        type: "office"
      }
    ]
  })

  console.log('✅ Created contact info and hours')

  // Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        quote: "WACC has been such a blessing for our family. The Stay & Play sessions give our toddler a chance to socialize while I connect with other parents in the community.",
        authorName: "Sarah Johnson",
        authorTitle: "Parent, West Acton resident",
        avatarUrl: "/img/Sample_User_Icon.png",
        displayOrder: 1
      },
      {
        quote: "I've been attending Taekwondo classes here for 3 years. The instructors are excellent and the community spirit is amazing. It's not just exercise - it's a second home.",
        authorName: "David Chen",
        authorTitle: "Taekwondo student",
        avatarUrl: "/img/Sample_User_Icon.png",
        displayOrder: 2
      },
      {
        quote: "We recently held our community fundraiser here and the staff were incredibly helpful. The Main Hall was perfect for our event and the kitchen facilities made catering so much easier.",
        authorName: "Amira Hassan",
        authorTitle: "Community organizer",
        avatarUrl: "/img/Sample_User_Icon.png",
        displayOrder: 3
      }
    ]
  })

  // Seed FAQ Items
  await prisma.faqItem.createMany({
    data: [
      {
        question: "How do I book a room at WACC?",
        answer: "You can book rooms through our website contact form or email us at info@westactoncentre.co.uk. Our Main Hall is £50/hour and Small Hall is £20/hour.",
        category: "Booking",
        displayOrder: 1
      },
      {
        question: "What are your opening hours?",
        answer: "The centre is open Monday to Sunday from 9:00 AM to 10:00 PM. Our office hours are Monday 9:30-11:00 AM and Wednesday-Friday 10:00 AM-2:30 PM.",
        category: "General",
        displayOrder: 2
      },
      {
        question: "Do I need to book for Stay & Play sessions?",
        answer: "No booking required! Just come along on Monday, Wednesday, or Friday from 10:00-11:45 AM. Sessions cost £4 for members, £1 for siblings.",
        category: "Programs",
        displayOrder: 3
      },
      {
        question: "Is parking available?",
        answer: "Yes, we have onsite parking available for visitors and event attendees.",
        category: "General",
        displayOrder: 4
      }
    ]
  })

  // Seed Community Groups
  await prisma.communityGroup.createMany({
    data: [
      {
        title: "The Society of Afghan Residents",
        description: "Cultural community group supporting Afghan families in West Acton"
      },
      {
        title: "Arab Families Community Group",
        description: "Supporting Arab families in the local community"
      }
    ]
  })

  console.log('✅ Created testimonials, FAQs, and community groups')

  // Seed Site Settings
  await prisma.siteSetting.createMany({
    data: [
      {
        key: "site_title",
        value: "West Acton Community Centre",
        type: "text",
        description: "Main site title"
      },
      {
        key: "community_residents",
        value: "2000",
        type: "number",
        description: "Number of residents served"
      },
      {
        key: "weekly_programs",
        value: "15",
        type: "number", 
        description: "Number of regular programs per week"
      },
      {
        key: "main_hall_capacity",
        value: "120",
        type: "number",
        description: "Maximum capacity in Main Hall"
      }
    ]
  })

  console.log('✅ Created site settings')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })