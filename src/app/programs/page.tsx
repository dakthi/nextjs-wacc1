import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";
import { BenefitPrograms } from "@/components/BenefitPrograms";
import ProgramSchedule from "@/components/ProgramSchedule";
import { prisma } from "@/lib/prisma";
import { generateSEOMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { processProgramImage } from "@/lib/image-fallback";

interface CommunityGroup {
  id: number;
  title: string;
  description: string | null;
  active: boolean;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return generateSEOMetadata({
    title: "Programmes & Activities",
    description: "Join our 15+ weekly programmes including Stay & Play, Taekwondo, Zumba, Kumon, Judo, English lessons, and cultural groups. Activities for all ages and interests.",
    url: "/programs",
    keywords: [
      "programmes",
      "activities",
      "classes",
      "Stay & Play",
      "Taekwondo",
      "Zumba",
      "Kumon",
      "Judo",
      "English lessons",
      "fitness classes",
      "martial arts",
      "children activities",
      "adult education",
      "cultural groups"
    ]
  });
}

// Category colors for visual organization
const categoryColors = {
  "early-years": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "martial-arts": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "education": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "fitness": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const categoryNames = {
  "early-years": "Early Years",
  "martial-arts": "Martial Arts",
  "education": "Education",
  "fitness": "Fitness",
};

// Helper function to organize programmes by category for ProgramSchedule component
function organizeProgramsForSchedule(programs: any[]) {
  const groupedPrograms: { [key: string]: any[] } = {}
  
  programs.forEach(program => {
    if (!groupedPrograms[program.category]) {
      groupedPrograms[program.category] = []
    }
    
    // Transform program data for ProgramSchedule component
    const scheduleData = {
      name: program.title,
      subtitle: program.instructor ? `with ${program.instructor}` : undefined,
      description: program.description,
      schedule: program.schedules.map((s: any) => s.description).filter(Boolean),
      price: program.price,
      ageGroup: program.ageGroup,
      instructor: program.instructor,
      contact: {
        email: program.contactEmail,
        phone: program.contactPhone,
        website: program.contactWebsite
      }
    }
    
    groupedPrograms[program.category]!.push(scheduleData)
  })
  
  return groupedPrograms
}

// Helper function to get category title
function getCategoryTitle(category: string): string {
  const categoryTitles: { [key: string]: string } = {
    'early-years': 'Early Years Programmes',
    'martial-arts': 'Martial Arts & Combat Sports',
    'education': 'Education & Learning',
    'fitness': 'Fitness & Wellness'
  }
  return categoryTitles[category] || category
}

export default async function Programs() {
  let programs: any[] = []
  let communityGroups: CommunityGroup[] = []
  
  try {
    // Only fetch from database if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      // Fetch programmes from database
      programs = await prisma.program.findMany({
        where: { active: true },
        include: {
          schedules: {
            where: { active: true },
            orderBy: { id: 'asc' }
          }
        },
        orderBy: { createdAt: 'asc' }
      })

      // Fetch community groups from database
      communityGroups = await prisma.communityGroup.findMany({
        where: { active: true },
        orderBy: { id: 'asc' }
      })
    }
  } catch (error) {
    console.error('Error fetching programs data:', error)
    // Will use fallback data below
  }

  const settings = await getSettings()

  return (
    <div>
      <TextOnlyHero 
        title="Programmes & Activities"
        subtitle="15+ regular programmes every week for all ages and interests"
        backgroundImage="/img/IMG_1290.jpeg"
      />

      <BenefitPrograms
        title="Weekly Programmes & Activities"
        description="From early years to senior activities, martial arts to educational support, we offer diverse programmes designed to bring our community together. Join our vibrant community with activities for all ages and interests."
        contact={`For programme enquiries and registration, contact us at ${settings.contact_email} or call ${settings.contact_phone}`}
        sectionHeading="Current Programmes"
        programs={programs}
        viewAllHref="#community-groups"
      />

      {/* Community Groups Section */}
      {communityGroups.length > 0 && (
        <div id="community-groups">
          <Container className="py-16 bg-gray-50">
            <SectionTitle
              preTitle="Community Groups"
              title="Cultural & Social Groups"
            >
              Join our diverse community groups that celebrate different cultures and bring people together.
            </SectionTitle>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {communityGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {group.title}
                  </h3>
                  {group.description && (
                    <p className="text-gray-600 text-sm">
                      {group.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a
                href="/community-groups"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Groups
              </a>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}