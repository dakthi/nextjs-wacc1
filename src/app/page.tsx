import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { VideoSelfHosted } from "@/components/VideoSelfHosted";
import { WeeklyHighlights } from "@/components/WeeklyHighlights";
import AboutUs from "@/components/AboutUs";
import GoogleMap from "@/components/GoogleMap";
import ProgramSchedule from "@/components/ProgramSchedule";
import { getSettings } from "@/lib/settings";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Main highlights - programmes and facilities
const mainHighlights = [
  {
    id: "regular-events",
    title: "REGULAR PROGRAMMES",
    subtitle: "Weekly activities for all ages and interests",
    description: "From Stay & Play sessions and fitness classes to martial arts and educational programmes",
    image: "/img/poster-stayandplay.jpeg",
    buttonText: "VIEW PROGRAMMES",
    buttonLink: "/programs",
    features: "15+ weekly programmes",
  },
  {
    id: "room-hire",
    title: "ROOM HIRE",
    subtitle: "Flexible spaces for your events",
    description: "Sustainable facilities with LED lighting and energy-efficient systems, perfect for events, parties, meetings, and community gatherings",
    image: "/img/80-chairs.jpeg",
    buttonText: "BOOK NOW",
    buttonLink: "/facilities",
    features: "From £15/hour",
  },
];

// This will be replaced with dynamic data

// Benefits data for WACC
const benefitOne = {
  title: "Modern Facilities for Every Occasion",
  desc: "Our centre offers versatile spaces perfect for community events, fitness classes, children's parties, and group meetings.",
  image: "/img/80-chairs.jpeg",
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
  image: "/img/entrance.jpeg",
  bullets: [
    {
      title: "West Acton Station",
      desc: "Just minutes from West Acton Underground station on the Central line",
      icon: "●",
    },
    {
      title: "Bus Routes",
      desc: "Served by bus 218 for easy access from across London",
      icon: "●",
    },
    {
      title: "Private On-site Parking",
      desc: "Private parking available for visitors and event attendees",
      icon: "●",
    },
  ],
};


export default async function Home() {
  const settings = await getSettings();
  
  // Fetch some programmes for the programme preview
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
      desc: "Regular groups and programmes per week",
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
      title: "£15",
      desc: "Starting rate per hour for hall hire",
    },
    {
      title: "1990",
      desc: "Year we started serving the community",
    },
    {
      title: "35+",
      desc: "Years of community service",
    },
    {
      title: "100%",
      desc: "Volunteer-run community organisation",
    },
  ];

  // Format programmes for ProgramSchedule component
  const programScheduleSections = featuredPrograms.length > 0 ? [
    {
      title: "Featured Programmes",
      items: featuredPrograms.slice(0, 6).map((program: any) => ({
        name: program.title,
        subtitle: program.instructor ? `with ${program.instructor}` : undefined,
        description: program.description || undefined,
        schedule: program.schedules.length > 0 
          ? program.schedules.map((s: any) => s.description).filter((desc: any) => desc !== null && desc !== undefined)
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
      {/* Test 3: Hero + WeeklyHighlights + Community Stats */}
      <VideoSelfHosted settings={settings} />
      <WeeklyHighlights highlights={mainHighlights} />
      
      {/* Community Impact Stats */}
      <Container>
        <SectionTitle
          preTitle="Community Impact"
          title="Serving West Acton Together"
        >
          {settings.site_title} is dedicated to improving wellbeing through education, 
          leisure, and recreational programmes. We work closely with local businesses and community members 
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
            title="Featured Programmes This Week"
            sections={programScheduleSections}
          />
          <div className="text-center mt-8">
            <a
              href="/programs"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Programmes
            </a>
          </div>
        </Container>
      )}

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
