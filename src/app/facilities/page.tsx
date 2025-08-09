import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Facilities & Room Hire | West Acton Community Centre",
  description: "Book our Main Hall (120 capacity) or Small Hall (15 capacity) for your events, classes, and gatherings. Competitive rates and sustainable facilities.",
};

// Facilities data
const mainHallData = {
  title: "Main Hall with Outside Area - Perfect for Large Events",
  desc: "Our spacious Main Hall includes access to paved outside area and kitchen facilities. Ideal for parties, weddings, funerals, wakes, NHS courses, and community events.",
  image: "/img/80-chairs.jpeg",
  bullets: [
    {
      title: "9.81m × 12.64m Space + Outside Paved Area",
      desc: "Generous indoor space with additional outdoor paved area for extended events",
      icon: "📏",
    },
    {
      title: "120 Person Capacity",
      desc: "Accommodates large groups for community events, celebrations, and professional courses",
      icon: "👥",
    },
    {
      title: "Includes Kitchen Access",
      desc: "Full kitchen facilities with fridge, kettle, microwave, and sink. No cooking allowed - outside catering welcome",
      icon: "🍽️",
    },
    {
      title: "Tables & Chairs Included",
      desc: "10 large rectangular tables and 80 chairs included in hire price",
      icon: "🪑",
    },
    {
      title: "On Request Pricing",
      desc: "Competitive rates varying by event type. Preferential rates for charities and regular bookings",
      icon: "💷",
    },
  ],
};

const smallHallData = {
  title: "Small Hall - Intimate Group Setting", 
  desc: "Our cozy Small Hall provides the perfect environment for small group classes, meetings, and intimate gatherings.",
  image: "/img/manager-office.jpeg",
  bullets: [
    {
      title: "4.26m × 6.20m Space",
      desc: "Comfortable size perfect for focused group activities and small meetings",
      icon: "📐",
    },
    {
      title: "15 Person Capacity",
      desc: "Ideal for workshops, small classes, and community group meetings",
      icon: "👤",
    },
    {
      title: "Competitive Rates",
      desc: "Affordable pricing for small group bookings and regular class sessions",
      icon: "💶",
    },
  ],
};

// Booking information
const bookingInfo = [
  {
    title: "Online Booking",
    desc: "Use our website contact form to submit your booking request with preferred dates and requirements",
    icon: "💻",
  },
  {
    title: "Contact Form", 
    desc: "Use our website contact form for all booking enquiries and availability requests",
    icon: "📧",
  },
  {
    title: "Booking Enquiries",
    desc: "Submit detailed booking requests through our contact form for prompt response",
    icon: "📞",
  },
];

// Additional facilities
const additionalFacilities = [
  {
    title: "Kitchen Facilities",
    description: "Equipped kitchen with sink, power outlets for kettle, and small seating area for refreshments",
  },
  {
    title: "Private On-site Parking",
    description: "Private parking available for event attendees and regular users",
  },
  {
    title: "Accessibility",
    description: "Ground floor access with facilities suitable for all community members",
  },
  {
    title: "Children's Parties",
    description: "Perfect venue for birthday parties (under 12s only) with safe, supervised environment",
  },
];

// Facility images gallery
const facilityImages = [
  {
    src: "/img/kitchen.jpeg",
    alt: "Kitchen facilities with appliances and seating area",
    title: "Kitchen Facilities"
  },
  {
    src: "/img/entrance.jpeg", 
    alt: "Main entrance to West Acton Community Centre",
    title: "Main Entrance"
  },
  {
    src: "/img/grass-field.jpeg",
    alt: "Outdoor grass field area for activities",
    title: "Outdoor Field"
  },
  {
    src: "/img/playground-1.jpeg",
    alt: "Children's playground equipment",
    title: "Playground Area"
  },
  {
    src: "/img/private-carpark.jpeg",
    alt: "Private parking area for visitors",
    title: "Parking Facilities"
  },
  {
    src: "/img/layout.jpeg",
    alt: "Community centre layout and floor plan",
    title: "Centre Layout"
  }
];

// Facility services and pricing data
const facilityServicesData = {
  title: "Room Hire & Services",
  sections: [
    {
      title: "Hall Rentals",
      items: [
        {
          name: "Main Hall",
          subtitle: "120 Person Capacity • 9.81m × 12.64m",
          description: "Spacious hall with outside paved area access, perfect for large events, parties, weddings, funerals, NHS courses, and community gatherings.",
          price: "On Request",
          duration: "Competitive rates vary by event type",
          features: [
            "120 person capacity",
            "Outside paved area access",
            "Kitchen facilities included",
            "10 large rectangular tables",
            "80 chairs included",
            "Professional cleaning included"
          ]
        },
        {
          name: "Small Hall",
          subtitle: "15 Person Capacity • 4.26m × 6.20m",
          description: "Intimate space ideal for small group classes, meetings, workshops, and community group gatherings.",
          price: "Contact for pricing",
          duration: "",
          features: [
            "15 person capacity",
            "Perfect for workshops",
            "Small group meetings",
            "Regular class sessions",
            "Comfortable environment"
          ]
        }
      ]
    },
    {
      title: "Additional Services",
      items: [
        {
          name: "Kitchen Access",
          description: "Full kitchen facilities with sink, power outlets for kettle, and small seating area. Outside catering welcome.",
          features: [
            "Sink and counter space",
            "Power outlets for appliances",
            "Small seating area",
            "Refrigeration available",
            "No cooking allowed - catering friendly"
          ]
        },
        {
          name: "Tables & Chairs",
          description: "Quality furniture included with hall rentals at no additional cost.",
          features: [
            "10 large rectangular tables (Main Hall)",
            "80 chairs (Main Hall)",
            "Professional setup available",
            "Included in hire price"
          ]
        },
        {
          name: "Parking & Access",
          description: "Convenient facilities to ensure your event runs smoothly.",
          features: [
            "Private on-site parking available",
            "Ground floor access",
            "Disability accessible",
            "Excellent transport links"
          ]
        }
      ]
    }
  ]
};

export default function Facilities() {
  return (
    <div>
      <TextOnlyHero 
        title="Facilities & Room Hire"
        subtitle="Modern, versatile spaces in the heart of West Acton"
        backgroundImage="/img/80-chairs.jpeg"
      />
      
      <Benefits data={mainHallData} />
      <Benefits imgPos="right" data={smallHallData} />


      <Container>
        <SectionTitle
          preTitle="Alternative Booking"
          title="Other Ways to Book"
        >
          All booking enquiries are handled through our convenient contact form system for prompt response.
        </SectionTitle>

        <div className="grid gap-10 lg:grid-cols-3 xl:grid-cols-3 mt-16">
          {bookingInfo.map((item, index) => (
            <div key={index} className="lg:col-span-1">
              <div className="flex flex-col justify-between w-full h-full px-6 py-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-lg leading-normal text-gray-500 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionTitle
          preTitle="Additional Amenities"
          title="Everything You Need"
        >
          Our facilities include additional amenities to ensure your event runs smoothly 
          and all attendees feel welcome.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2 mt-16">
          {additionalFacilities.map((facility, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {facility.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Services Menu */}
      <Container>
        <ServicesMenu
          title={facilityServicesData.title}
          sections={facilityServicesData.sections}
          bgColor="bg-white"
          accentColor="text-primary-600"
        />
      </Container>

      {/* Photo Gallery */}
      <Container>
        <SectionTitle
          preTitle="Facility Photos"
          title="Take a Visual Tour"
        >
          Explore our facilities through photos showing the main hall, kitchen, 
          outdoor areas, and parking facilities.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-3 mt-16">
          {facilityImages.map((image, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Location Map & Booking Form - Two Column Layout */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Location Map - Column 1 (narrower) */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
                Our Location
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Conveniently located in Churchill Gardens with excellent transport links and parking facilities.
              </p>
            </div>
            <GoogleMap 
              address="West Acton Community Centre, Churchill Gardens, Acton, London W3 0JN"
              className="w-full h-64 rounded-lg shadow-md border border-gray-200"
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                📍 Churchill Gardens, Acton, London W3 0JN
              </p>
              <p className="text-xs text-gray-500 mb-3">
                2 min from West Acton Station
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Churchill%20Gardens%2C%20Acton%2C%20London%20W3%200JN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary-600 hover:text-primary-800 font-medium text-sm underline"
              >
                Get Directions →
              </a>
            </div>
          </div>

          {/* Booking Form - Column 2 (wider) */}
          <div className="lg:col-span-2">
            <div className="bg-primary-50 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-6 text-center uppercase tracking-tight">
                Book Your Event
              </h3>
              <p className="text-gray-700 mb-8 text-center">
                Complete the form below and we'll get back to you with availability and pricing
              </p>
              
              <BookingForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}