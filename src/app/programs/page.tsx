import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";
import ProgramSchedule from "@/components/ProgramSchedule";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const settings = await getSettings();
  
  return {
    title: `Programs & Activities | ${settings.site_title}`,
    description: `Join our ${settings.weekly_programs} weekly programs including Stay & Play, Taekwondo, Zumba, Kumon, Judo, and cultural groups. Something for every age and interest.`,
  };
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

// Helper function to organize programs by category for ProgramSchedule component
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
    'early-years': 'Early Years Programs',
    'martial-arts': 'Martial Arts & Combat Sports',
    'education': 'Education & Learning',
    'fitness': 'Fitness & Wellness'
  }
  return categoryTitles[category] || category
}

export default async function Programs() {
  // Fetch programs from database
  const programs = await prisma.program.findMany({
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
  const communityGroups = await prisma.communityGroup.findMany({
    where: { active: true },
    orderBy: { id: 'asc' }
  })

  // Organize programs for ProgramSchedule component
  const groupedPrograms = organizeProgramsForSchedule(programs)
  const programScheduleData = {
    title: "Weekly Programs & Activities",
    sections: Object.keys(groupedPrograms).map(category => ({
      title: getCategoryTitle(category),
      items: groupedPrograms[category] || []
    }))
  }

  return (
    <div>
      <TextOnlyHero 
        title="Programs & Activities"
        subtitle="15+ regular programs every week for all ages and interests"
        backgroundImage="/img/IMG_1290 Large.jpeg"
      />

      <Container>
        <SectionTitle
          preTitle="Weekly Programs"
          title="Something for Everyone"
        >
          From early years to senior activities, martial arts to educational support, 
          we offer diverse programs designed to bring our community together.
        </SectionTitle>

        <div className="grid gap-8 lg:gap-12 mt-16">
          {programs.map((program: any) => (
            <div key={program.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {program.imageUrl && (
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {program.category && (
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${categoryColors[program.category as keyof typeof categoryColors]}`}>
                        {categoryNames[program.category as keyof typeof categoryNames]}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-800">
                      {program.ageGroup}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-primary-600 mb-3 uppercase tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {program.schedules && program.schedules.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Schedule</h4>
                    <div className="space-y-2">
                      {program.schedules.map((schedule: any, index: number) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          {schedule.description}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {program.price && (
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-600 mb-2">Cost</h4>
                      <p className="text-gray-700">{program.price}</p>
                    </div>
                  )}
                  
                  {program.bookingInfo && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-600 mb-2">Booking</h4>
                      <p className="text-gray-700">{program.bookingInfo}</p>
                    </div>
                  )}
                  
                  {(program.contactEmail || program.contactPhone || program.contactWebsite) && (
                    <div className="bg-blue-50 rounded-lg p-4 md:col-span-2">
                      <h4 className="font-semibold text-blue-600 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        {program.contactEmail && (
                          <p className="text-gray-700">
                            <span className="font-medium">Email:</span> {program.contactEmail}
                          </p>
                        )}
                        {program.contactPhone && (
                          <p className="text-gray-700">
                            <span className="font-medium">Phone:</span> {program.contactPhone}
                          </p>
                        )}
                        {program.contactWebsite && (
                          <p className="text-gray-700">
                            <span className="font-medium">Website:</span> {program.contactWebsite}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Use ProgramSchedule component for organized view */}
      <Container>
        <ProgramSchedule
          title={programScheduleData.title}
          sections={programScheduleData.sections}
          bgColor="bg-gray-50"
          textColor="text-gray-800"
        />
      </Container>

      <Container>
        <SectionTitle
          preTitle="Community Groups"
          title="Cultural & Social Groups"
        >
          Our centre hosts various community groups that celebrate different cultures and bring people together.
        </SectionTitle>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {communityGroups.map((group: any) => (
            <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-heading font-bold text-primary-600 mb-3 uppercase tracking-tight">
                {group.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}