import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import { prisma } from "@/lib/prisma";
import { generateSEOMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return generateSEOMetadata({
    title: "Contact & Booking",
    description: "Get in touch with West Acton Community Centre for hall bookings, programme enquiries, and general information. Located in Churchill Gardens, West Acton.",
    url: "/contact",
    keywords: [
      "contact us",
      "hall booking",
      "enquiries",
      "West Acton address",
      "Churchill Gardens",
      "community centre contact",
      "facility hire",
      "programme information"
    ]
  });
}

// Location and transport
const locationInfo = [
  {
    title: "Underground",
    details: "West Acton Station (Central Line)",
    description: "Just minutes walk from the station"
  },
  {
    title: "Bus Routes",
    details: "218",
    description: "Bus route serving the area"
  },
  {
    title: "Private On-site Parking",
    details: "Available",
    description: "Convenient parking for visitors"
  },
];

interface ContactInfo {
  id: number
  type: string
  label: string | null
  value: string
  description: string | null
  displayOrder: number
  active: boolean
}

interface OpeningHours {
  id: number
  title: string
  schedule: any
  description: string | null
  type: string
  active: boolean
}

export default async function Contact() {
  // Fetch contact info and opening hours directly from database
  const settings = await getSettings()
  let contactInfoItems: ContactInfo[] = []
  let openingHours: OpeningHours[] = []
  
  try {
    // Only fetch from database if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      contactInfoItems = await prisma.contactInfo.findMany({
        where: { active: true },
        orderBy: { displayOrder: 'asc' }
      })
      
      openingHours = await prisma.openingHours.findMany({
        where: { active: true },
        orderBy: { id: 'asc' }
      })
    }
  } catch (error) {
    console.error('Failed to fetch CMS data:', error)
    // Fallback to empty arrays which will use static data
  }

  // Create dynamic location info from contact CMS data
  const dynamicLocationInfo = contactInfoItems.length > 0 ? contactInfoItems.map(item => ({
    title: item.label || item.type.charAt(0).toUpperCase() + item.type.slice(1),
    details: item.value,
    description: item.description || `${item.label || item.type} information`
  })) : locationInfo
  return (
    <div>
      <TextOnlyHero 
        title="Contact Us"
        subtitle="Get in touch with West Acton Community Centre"
        backgroundImage="/img/entrance.jpeg"
      />

      {/* Main Content - Two Column Layout on XL screens */}
      <Container className="py-16">
        <div className="grid gap-16 xl:grid-cols-2 xl:gap-24">
          {/* Left Column - Contact Form */}
          <div>
            <SectionTitle
              preTitle="Get In Touch"
              title="Contact Form"
            >
              Have a question or want to get involved? Send us a message using the form below.
            </SectionTitle>
            
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>

          {/* Right Column - Location Info */}
          <div className="space-y-16">
            {/* Map and Getting Here */}
            <div>
              <SectionTitle
                preTitle="Visit Us"
                title="Find West Acton Community Centre"
              >
                Located in the heart of Churchill Gardens, we're easily accessible by public transport 
                and offer convenient private on-site parking for all our visitors.
              </SectionTitle>

              <div className="mt-8">
                <GoogleMap 
                  address="West Acton Community Centre, Churchill Gardens, Acton, London W3 0JN"
                />
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Here</h3>
                <div className="space-y-6">
                  {dynamicLocationInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-lg">
                          {item.title === "Underground" ? "U" : 
                           item.title === "Bus Routes" ? "B" : "P"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-primary-600 font-medium">{item.details}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Address</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>{settings.site_title}</strong></p>
                  <p>{settings.address}</p>
                  <p className="text-sm text-gray-600 mt-4">
                    2 minutes from West Acton Tube Station • 1 minute from 218 bus stop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Opening Hours */}
      <Container className="py-16 bg-gray-50">
        <SectionTitle
          preTitle="Centre Hours"
          title="When We're Open"
        >
          The centre is open 7 days a week for programmes and events.
        </SectionTitle>

        <div className="max-w-2xl mx-auto mt-12">
          {openingHours.length > 0 ? (
            <div className="space-y-6">
              {openingHours.map((hours, index) => (
                <div key={hours.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-primary-600 mb-3">{hours.title}</h3>
                  {hours.description && (
                    <p className="text-gray-600 mb-4">{hours.description}</p>
                  )}
                  <div className="space-y-2">
                    {typeof hours.schedule === 'object' && hours.schedule ? 
                      Object.entries(hours.schedule).map(([day, time]) => (
                        <div key={day} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium text-gray-900 capitalize">{day}</span>
                          <span className="text-gray-700">{String(time)}</span>
                        </div>
                      )) : 
                      <div className="text-center">
                        <p className="text-lg text-gray-700">{settings.opening_hours_details}</p>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">Opening Hours</h3>
              <p className="text-xl font-semibold text-gray-900 mb-2">{settings.opening_hours_text} Days</p>
              <p className="text-lg text-gray-700">{settings.opening_hours_details}</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}