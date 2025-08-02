import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { VideoSelfHosted } from "@/components/VideoSelfHosted";
import { WeeklyHighlights } from "@/components/WeeklyHighlights";
import AboutUs from "@/components/AboutUs";
import GoogleMap from "@/components/GoogleMap";
import ProgramSchedule from "@/components/ProgramSchedule";
import { getSettings } from "@/lib/settings";
import { prisma } from "@/lib/prisma";

// Mid page highlights - this week's programs
const thisWeekHighlights = [
  {
    id: "stay-play",
    title: "STAY & PLAY SESSIONS",
    subtitle: "Monday, Wednesday & Friday • 10:00 AM - 11:45 AM",
    description: "Drop-in sessions for young children with toys, arts & crafts, and soft play",
    image: "/img/stayandplay.jpeg",
    buttonText: "JOIN US",
    buttonLink: "/programs",
    price: "£4 per session",
  },
  {
    id: "zumba",
    title: "ZUMBA FITNESS CLASSES",
    subtitle: "Tuesday • 10:00 AM & 6:15 PM",
    description: "High-energy dance fitness classes combining fun choreography with great music",
    image: "/img/zumba.jpeg",
    buttonText: "LEARN MORE",
    buttonLink: "/programs",
    ages: "Adults",
  },
  {
    id: "room-hire",
    title: "ROOM HIRE AVAILABLE",
    subtitle: "Main Hall (120 capacity) • Small Hall (15 capacity)",
    description: "Modern facilities perfect for events, parties, meetings, and community gatherings",
    image: "/img/main-hall-1.jpeg",
    buttonText: "BOOK NOW",
    buttonLink: "/facilities",
    price: "From £20/hour",
  },
];

// This will be replaced with dynamic data

// Benefits data for WACC
const benefitOne = {
  title: "Modern Facilities for Every Occasion",
  desc: "Our centre offers versatile spaces perfect for community events, fitness classes, children's parties, and group meetings.",
  image: "/img/main-hall.jpeg",
  bullets: [
    {
      title: "Main Hall (120 capacity)",
      desc: "9.81m × 12.64m space perfect for large events, exercise classes, and community gatherings",
      icon: "■",
    },
    {
      title: "Small Hall (15 capacity)", 
      desc: "4.26m × 6.20m intimate space ideal for small group classes and meetings",
      icon: "▪",
    },
    {
      title: "Kitchen Facilities",
      desc: "Equipped with sink, power outlets, and seating area for catering needs",
      icon: "●",
    },
  ],
};

const benefitTwo = {
  title: "Convenient Location & Access",
  desc: "Located in Churchill Gardens, West Acton, we're easily accessible by public transport and offer onsite parking.",
  image: "/img/location.jpeg",
  bullets: [
    {
      title: "West Acton Station",
      desc: "Just minutes from West Acton Underground station on the Central line",
      icon: "●",
    },
    {
      title: "Bus Routes",
      desc: "Served by buses 207, 218, and H40 for easy access from across London",
      icon: "●",
    },
    {
      title: "Onsite Parking",
      desc: "Convenient parking available for visitors and event attendees",
      icon: "●",
    },
  ],
};

// FAQ data for WACC
const faqData = [
  {
    question: "How do I book a room at WACC?",
    answer: "You can book rooms through our website contact form or email us at info@westactoncentre.co.uk. Our Main Hall is £50/hour and Small Hall is £20/hour.",
  },
  {
    question: "What are your opening hours?",
    answer: "The centre is open Monday to Sunday from 9:00 AM to 10:00 PM. Our office hours are Monday 9:30-11:00 AM and Wednesday-Friday 10:00 AM-2:30 PM.",
  },
  {
    question: "Do I need to book for Stay & Play sessions?",
    answer: "No booking required! Just come along on Monday, Wednesday, or Friday from 10:00-11:45 AM. Sessions cost £4 for members, £1 for siblings.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have onsite parking available for visitors and event attendees.",
  },
];

export default async function Home() {
  const settings = await getSettings();
  
  // Fetch some programs for the program preview
  const featuredPrograms = await prisma.program.findMany({
    where: { active: true },
    include: {
      schedules: {
        where: { active: true },
        orderBy: { id: 'asc' }
      }
    },
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  // Community stats data using settings
  const communityStats = [
    {
      title: settings.residents_served,
      desc: "Residents served in West Acton community",
    },
    {
      title: settings.weekly_programs,
      desc: "Regular groups and programs per week",
    },
    {
      title: settings.main_hall_capacity,
      desc: "Maximum capacity in our Main Hall",
    },
    {
      title: settings.opening_hours_text,
      desc: settings.opening_hours_details,
    },
  ];

  // Additional stats for extended content
  const extendedStats = [
    {
      title: "£20",
      desc: "Starting rate per hour for hall hire",
    },
    {
      title: "2009",
      desc: "Year we started serving the community",
    },
    {
      title: "15+",
      desc: "Years of community service",
    },
    {
      title: "100%",
      desc: "Volunteer-run community organization",
    },
  ];

  // Format programs for ProgramSchedule component
  const programScheduleSections = featuredPrograms.length > 0 ? [
    {
      title: "Featured Programs",
      items: featuredPrograms.slice(0, 6).map((program: any) => ({
        name: program.title,
        subtitle: program.instructor ? `with ${program.instructor}` : undefined,
        description: program.description || undefined,
        schedule: program.schedules.length > 0 
          ? program.schedules.map((s: any) => s.description).filter((desc: any): desc is string => desc !== null && desc !== undefined)
          : ["Schedule available upon inquiry"],
        price: program.price || undefined,
        contact: {
          email: program.contactEmail || undefined,
          phone: program.contactPhone || undefined,
          website: program.contactWebsite || undefined
        },
        ageGroup: program.ageGroup || undefined,
        instructor: program.instructor || undefined
      }))
    }
  ] : [];

  return (
    <div>
      {/* Hero Section */}
      <VideoSelfHosted settings={settings} />
      
      {/* Weekly Highlights */}
      <WeeklyHighlights highlights={thisWeekHighlights} />
      
      {/* Community Impact Stats */}
      <Container>
        <SectionTitle
          preTitle="Community Impact"
          title="Serving West Acton Together"
        >
          {settings.site_title} is dedicated to improving wellbeing through education, 
          leisure, and recreational programs. We work closely with local businesses and residents 
          to create a vibrant, supportive community.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 mt-16">
          {communityStats.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <p className="text-3xl font-heading font-bold text-primary-600 mb-2">
                {item.title}
              </p>
              <p className="text-gray-800 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* About Us Section */}
      <AboutUs />

      {/* Facilities Benefits */}
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      {/* Featured Programs Preview */}
      {programScheduleSections.length > 0 && (
        <Container className="py-16">
          <ProgramSchedule
            title="Featured Programs This Week"
            sections={programScheduleSections}
          />
          <div className="text-center mt-8">
            <a
              href="/programs"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Programs
            </a>
          </div>
        </Container>
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* Extended Community Stats */}
      <Container className="py-16">
        <SectionTitle
          preTitle="Our Track Record"
          title="Why Choose West Acton Community Centre"
        >
          Over the years, we've built a reputation for excellence, community focus, and 
          professional service that sets us apart from other venues in the area.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 mt-16">
          {extendedStats.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6 text-center shadow-sm">
              <p className="text-3xl font-heading font-bold text-primary-600 mb-2">
                {item.title}
              </p>
              <p className="text-gray-800 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* What Makes Us Special Section */}
      <Container className="py-16">
        <SectionTitle
          preTitle="What Makes Us Special"
          title="More Than Just a Venue"
        >
          We're not just a place to hold events – we're a community hub that brings people together, 
          supports local initiatives, and creates lasting connections.
        </SectionTitle>

        <div className="grid gap-8 lg:grid-cols-3 mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community-Led Events</h3>
            <p className="text-gray-600 leading-relaxed">
              From NHS seminars to cultural fairs and cake sales, we host events that matter to our community. 
              Every gathering strengthens the bonds that make West Acton special.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Spaces</h3>
            <p className="text-gray-600 leading-relaxed">
              Whether you need space for 15 or 120 people, our halls can be configured to suit your needs. 
              Kitchen facilities, AV equipment, and parking make hosting easy.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Standards</h3>
            <p className="text-gray-600 leading-relaxed">
              As a registered charity under Ealing Council, we maintain the highest standards of cleanliness, 
              safety, and service while keeping our rates competitive.
            </p>
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <Faq />

      {/* Location & Contact Section */}
      <Container className="py-16">
        <SectionTitle
          preTitle="Visit Us"
          title="Find West Acton Community Centre"
        >
          Located in the heart of Churchill Gardens, we're easily accessible by public transport 
          and offer convenient onsite parking for all our visitors.
        </SectionTitle>

        <div className="grid gap-12 lg:grid-cols-2 mt-16">
          <div>
            <GoogleMap address={settings.address} />
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Here</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 font-bold">🚇</span>
                  <div>
                    <p className="font-medium">Underground</p>
                    <p>West Acton Station (Central Line) - 5 minute walk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 font-bold">🚌</span>
                  <div>
                    <p className="font-medium">Bus Routes</p>
                    <p>207, 218, H40 - Churchill Gardens stop</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 font-bold">🚗</span>
                  <div>
                    <p className="font-medium">Parking</p>
                    <p>Free onsite parking available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Address:</strong> {settings.address}</p>
                <p><strong>Phone:</strong> {settings.contact_phone}</p>
                <p><strong>Email:</strong> {settings.contact_email}</p>
                <p><strong>Hours:</strong> {settings.opening_hours_details}</p>
              </div>
            </div>

            <div className="bg-white border border-primary-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="/programs" 
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  → View Programs
                </a>
                <a 
                  href="/facilities" 
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  → Book a Room
                </a>
                <a 
                  href="/about" 
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  → About Us
                </a>
                <a 
                  href="/contact" 
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  → Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
