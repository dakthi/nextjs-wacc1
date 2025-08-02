import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";
import GoogleMap from "@/components/GoogleMap";

export const metadata = {
  title: "Contact & Booking | West Acton Community Centre",
  description: "Get in touch with WACC for bookings, enquiries, and information. Located in Churchill Gardens, Acton, London W3 0JN.",
};

// Contact information
const contactInfo = [
  {
    type: "General Enquiries",
    value: "info@westactoncentre.co.uk",
    description: "For bookings, program information, and general questions"
  },
  {
    type: "Phone",
    value: "020 8992 8899",
    description: "Call during office hours for immediate assistance"
  },
  {
    type: "Ealing Council",
    value: "customers@ealing.gov.uk",
    description: "For council-related enquiries and services"
  },
  {
    type: "Website",
    value: "www.westactoncentre.co.uk",
    description: "Visit our main website for updates and information"
  },
];

// Opening hours
const openingHours = [
  {
    title: "Centre Opening Hours",
    schedule: "Monday - Sunday: 9:00 AM - 10:00 PM",
    description: "The centre is open 7 days a week for programs and events"
  },
  {
    title: "Office Hours",
    schedule: [
      "Monday: 9:30 AM - 11:00 AM",
      "Wednesday - Friday: 10:00 AM - 2:30 PM"
    ],
    description: "Best times to reach us by phone for immediate assistance"
  },
];

// Location and transport
const locationInfo = [
  {
    title: "Underground",
    details: "West Acton Station (Central Line)",
    description: "Just minutes walk from the station"
  },
  {
    title: "Bus Routes",
    details: "207, 218, H40",
    description: "Multiple bus routes serve the area"
  },
  {
    title: "Parking",
    details: "Onsite parking available",
    description: "Free parking for visitors and event attendees"
  },
];

// Social media info
const socialMedia = [
  {
    platform: "Facebook",
    stats: "100 likes, 119 followers",
    description: "Follow us for updates on events, new classes, and community news"
  },
  {
    platform: "Instagram", 
    description: "Visual updates and behind-the-scenes content from our programs"
  },
];

export default function Contact() {
  return (
    <div>
      <TextOnlyHero 
        title="Contact & Booking"
        subtitle="Get in touch with West Acton Community Centre"
      />

      <Container>
        <SectionTitle
          preTitle="Get in Touch"
          title="Contact Information"
        >
          We're here to help with bookings, enquiries, and any questions about our 
          programs and facilities.
        </SectionTitle>

        <div className="grid gap-8 lg:grid-cols-2 mt-16">
          {contactInfo.map((contact, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-heading font-bold text-primary-600 mb-3 uppercase tracking-tight">
                {contact.type}
              </h3>
              <p className="text-2xl font-bold text-gray-800 mb-3">
                {contact.value}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {contact.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionTitle
          preTitle="Visit Us"
          title="Location & Opening Hours"
        >
          Find us in Churchill Gardens, West Acton, with excellent transport links 
          and convenient parking.
        </SectionTitle>

        <div className="mt-16">
          <div className="bg-primary-50 rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-3xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
              West Acton Community Centre
            </h3>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Churchill Gardens, Acton, London W3 0JN
            </p>
            <p className="text-gray-700">
              2 minutes from West Acton Tube Station • 1 minute from 218 bus stop
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {openingHours.map((hours, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
                  {hours.title}
                </h3>
                {Array.isArray(hours.schedule) ? (
                  <div className="space-y-2 mb-4">
                    {hours.schedule.map((time, idx) => (
                      <p key={idx} className="text-lg font-semibold text-gray-800">
                        {time}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    {hours.schedule}
                  </p>
                )}
                <p className="text-gray-700 leading-relaxed">
                  {hours.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            {locationInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <h3 className="text-lg font-heading font-bold text-primary-600 mb-3 uppercase tracking-tight">
                  {info.title}
                </h3>
                <p className="text-lg font-bold text-gray-800 mb-2">
                  {info.details}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Google Map */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
                Find Us on the Map
              </h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                West Acton Community Centre is conveniently located in Churchill Gardens, 
                just minutes from West Acton tube station and multiple bus routes.
              </p>
            </div>
            <GoogleMap 
              address="West Acton Community Centre, Churchill Gardens, Acton, London W3 0JN"
              className="w-full h-96 rounded-lg shadow-md border border-gray-200"
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Churchill Gardens, Acton, London W3 0JN
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Churchill%20Gardens%2C%20Acton%2C%20London%20W3%200JN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-primary-600 hover:text-primary-800 font-medium text-sm underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <SectionTitle
          preTitle="Stay Connected"
          title="Social Media & Community"
        >
          Follow us on social media for the latest updates, events, and community news.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 mt-16">
          {socialMedia.map((social, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {social.platform}
              </h3>
              {social.stats && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  {social.stats}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                {social.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Book or Join Us?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Whether you need a venue, want to join a program, or have questions about our community centre
            </p>
            <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-sm">info@westactoncentre.co.uk</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-sm">020 8992 8899</p>
              </div>
            </div>
            <p className="text-sm mt-4 opacity-75">
              Office Hours: Mon 9:30-11:00 AM, Wed-Fri 10:00 AM-2:30 PM
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}