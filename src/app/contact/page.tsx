import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";

export const metadata = {
  title: "Contact & Booking | West Acton Community Centre",
  description: "Get in touch with WACC for bookings, enquiries, and information. Located in Churchill Gardens, Acton, London W3 0JN.",
};

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

export default function Contact() {
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
                  {locationInfo.map((item, index) => (
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
                  <p><strong>West Acton Community Centre</strong></p>
                  <p>Churchill Gardens</p>
                  <p>Acton, London W3 0JN</p>
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

        <div className="max-w-md mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-600 mb-4">Opening Hours</h3>
            <p className="text-xl font-semibold text-gray-900 mb-2">Monday - Sunday</p>
            <p className="text-lg text-gray-700">7:00 AM - 11:00 PM</p>
          </div>
        </div>
      </Container>
    </div>
  );
}