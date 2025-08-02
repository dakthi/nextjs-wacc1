"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
  image?: string;
}

interface FaqSection {
  title: string;
  icon: string;
  items: FaqItem[];
}

interface FaqProps {
  data?: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    title: "General Information",
    icon: "",
    items: [
      {
        question: "Where is the West Acton Community Centre located?",
        answer: "The centre is located at Churchill Gardens, West Acton, London W3 0JN, just two minutes' walk from West Acton Tube Station (Central Line) and one minute from the 218 bus stop.",
        image: "/img/location.jpeg"
      },
      {
        question: "What are the opening hours?",
        answer: "We are generally open 7:00 AM – 11:00 PM, seven days a week, subject to availability and bookings.",
        image: "/img/entrance.jpeg"
      },
      {
        question: "How do I contact the centre?",
        answer: (
          <div className="space-y-2">
            <p><strong>Email:</strong> via the booking form on our website (all enquiries come directly to our manager's email)</p>
            <p><strong>Facebook:</strong> We have a Facebook page ("West Acton Community Centre") for updates</p>
            <p><strong>Phone:</strong> not currently listed for public calls; email is preferred</p>
          </div>
        )
      },
      {
        question: "Is there parking available?",
        answer: "Yes, we have private parking, including disabled parking spaces.",
        image: "/img/private-carpark-1.jpeg"
      },
      {
        question: "Is the venue wheelchair accessible?",
        answer: "Yes, the centre is fully wheelchair accessible."
      },
      {
        question: "Do you have Wi-Fi?",
        answer: "No, we do not provide public Wi-Fi at the moment."
      }
    ]
  },
  {
    title: "Facilities & Hire",
    icon: "",
    items: [
      {
        question: "What spaces are available for hire?",
        answer: (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-primary-600 mb-2">Main Hall</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Capacity: up to 120 people</li>
                <li>Includes: access to outside paved area and the main kitchen</li>
                <li>Suitable for: parties, weddings, funerals/wakes, NHS courses, AGMs, large meetings, and social events</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary-600 mb-2">Small Room</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Capacity: 15–20 people (depending on seating arrangement)</li>
                <li>Includes: access to a kitchenette (but no outside area)</li>
                <li>Suitable for: AGMs, small group meetings, courses, and community gatherings</li>
              </ul>
            </div>
          </div>
        ),
        image: "/img/main-hall-1.jpeg"
      },
      {
        question: "What facilities are included?",
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Tables and chairs:</strong> 10 large rectangular tables and 80 chairs available</li>
            <li><strong>Kitchen facilities:</strong> fridge, kettle, microwave, and sink (note: no cooking is allowed, but you may bring your own food and drink)</li>
            <li><strong>Outdoor area:</strong> available only with the main hall hire</li>
            <li><strong>Rubbish disposal:</strong> outdoor container provided</li>
            <li><strong>CCTV:</strong> installed for safety</li>
            <li><strong>Cleaning:</strong> high professional standards; the centre is cleaned before events</li>
          </ul>
        ),
        image: "/img/kitchen-1.jpeg"
      },
      {
        question: "What are the booking times?",
        answer: "Bookings can run until 11:00 PM at the latest. Morning start times are flexible and can be agreed based on need."
      },
      {
        question: "How much does it cost to hire a room?",
        answer: (
          <div className="space-y-2">
            <p>Rates are on request because pricing depends on event type and organisation type (e.g., regular bookings, one-off bookings, charities).</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cheapest rate in the area:</strong> around £15/hour for small rooms</li>
              <li><strong>Parties:</strong> typically from £50, depending on requirements</li>
              <li><strong>Charity discount:</strong> preferential rates are available for registered charities (proof of charity number required)</li>
            </ul>
          </div>
        )
      },
      {
        question: "Can I book online?",
        answer: (
          <div className="space-y-2">
            <p>Not yet. Currently, bookings work like this:</p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Fill in the enquiry form with your event details</li>
              <li>We send you a booking form with our terms and conditions</li>
              <li>Once agreed, your booking is confirmed</li>
            </ol>
          </div>
        )
      },
      {
        question: "What events are allowed?",
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li>Parties (including children's parties)</li>
            <li>Weddings and wakes</li>
            <li>Corporate or NHS training courses</li>
            <li>Community meetings and AGMs</li>
            <li>Fitness and activity classes</li>
            <li>Cultural and social gatherings</li>
          </ul>
        )
      },
      {
        question: "Is there staff on-site?",
        answer: "No, the centre is run entirely by volunteers. An on-site manager is available to help ensure everything runs smoothly."
      },
      {
        question: "Do you have insurance?",
        answer: "Yes, we have full building and public liability insurance.",
        image: "/img/certificate-insurance.jpeg"
      }
    ]
  },
  {
    title: "Programmes & Activities",
    icon: "",
    items: [
      {
        question: "What regular activities and classes take place?",
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Stay and Play</strong> (for children up to 5) – Mondays, Wednesdays, Fridays 10:00–11:45, £4/child, siblings £1 (includes coffee and tea)</li>
            <li><strong>Taekwondo</strong> (children & adults) – times published on the programme schedule</li>
            <li><strong>Martial Arts</strong> (Lau Gar Kung Fu)</li>
            <li><strong>Kumon</strong> English & Maths tutoring</li>
            <li><strong>Zumba with Anae</strong> – Tuesdays 10:00–11:00 & 18:00–19:00</li>
            <li><strong>Knitting group</strong></li>
            <li><strong>Warm Hub for seniors</strong> – Mondays 12:15–13:45 (term time)</li>
            <li><strong>Learning English, Maths, and Arabic school</strong> (Saturdays, term time)</li>
          </ul>
        ),
        image: "/img/stayandplay.jpeg"
      },
      {
        question: "Do I need to book for Stay and Play?",
        answer: "No, it's a drop-in session."
      },
      {
        question: "What does Stay and Play cost?",
        answer: (
          <ul className="list-disc pl-6 space-y-1">
            <li>£4 per child</li>
            <li>Siblings £1</li>
            <li>Tea and coffee included</li>
          </ul>
        )
      },
      {
        question: "What age group is Stay and Play for?",
        answer: "Children up to 5 years old."
      },
      {
        question: "Are martial arts classes available for adults?",
        answer: "Yes, Taekwondo offers adult classes and there is a Lau Gar Kung Fu session.",
        image: "/img/poster-taekwondo.jpeg"
      },
      {
        question: "Are fitness or dance classes available?",
        answer: "Yes, Zumba with Anae is held weekly (Tuesday mornings and evenings).",
        image: "/img/zumba.jpeg"
      },
      {
        question: "Who runs Zumba and how do I book?",
        answer: (
          <div className="space-y-1">
            <p><strong>Instructor:</strong> Anae</p>
            <p><strong>Booking:</strong> via her website (listed on the programmes page)</p>
          </div>
        )
      },
      {
        question: "Are there cultural or community groups?",
        answer: (
          <div className="space-y-2">
            <p>Yes, groups include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Warm Hub for seniors</li>
              <li>Various user group meetings and AGMs</li>
              <li>Some language and cultural education groups</li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    title: "Community & Volunteering",
    icon: "",
    items: [
      {
        question: "How can I get involved or volunteer?",
        answer: "Contact us via email or booking form to express interest. Opportunities include event support, community programme help, and administration."
      },
      {
        question: "Do you have community events?",
        answer: "Currently, most activity is focused on user groups and classes. Community-wide events may be held occasionally (check our Facebook page)."
      },
      {
        question: "Do you post updates on social media?",
        answer: 'Yes, we have a Facebook page ("West Acton Community Centre"). Updates are limited but active.',
        image: "/img/notice-board.jpeg"
      }
    ]
  },
  {
    title: "Policies & Governance",
    icon: "",
    items: [
      {
        question: "Do you have official policies?",
        answer: "Yes, around 10 key policies (health & safety, safeguarding, etc.) are in place and can be provided on request."
      },
      {
        question: "Who runs the centre?",
        answer: "The centre is run by a charity (trustee-led) on a new lease, with volunteer management and no permanent paid staff."
      },
      {
        question: "Do you give preferential rates?",
        answer: "Yes, charities and regular bookings receive preferential rates."
      }
    ]
  }
];

export const Faq = ({ data }: FaqProps) => {
  const [selectedSection, setSelectedSection] = useState<string>("General Information");

  // Use provided data or default sections
  const sectionsToUse = data ? [{ title: "FAQ", icon: "", items: data }] : faqSections;
  const currentSection = sectionsToUse.find(section => section.title === selectedSection) || sectionsToUse[0];
  
  if (!currentSection) {
    return <div>No FAQ sections available</div>;
  }

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our facilities, programmes, and services
          </p>
        </div>

        {!data && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {faqSections.map((section) => (
                <button
                  key={section.title}
                  onClick={() => setSelectedSection(section.title)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSection === section.title
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-heading font-bold text-primary-600 mb-2 uppercase tracking-tight">
              {currentSection.title}
            </h3>
          </div>
          
          {currentSection.items.map((item, index) => (
            <div key={`${currentSection.title}-${index}`} className="mb-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex items-center justify-between w-full px-6 py-4 text-lg text-left text-gray-800 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-50 transition-colors">
                      <span className="font-medium">{item.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-primary-600 transition-transform flex-shrink-0 ml-4`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-6 pt-4 pb-6 text-gray-700 bg-gray-50 rounded-b-lg border-l border-r border-b border-gray-200">
                      <div className={`${item.image ? 'grid grid-cols-1 md:grid-cols-2 gap-6 items-start' : ''}`}>
                        <div>
                          {typeof item.answer === 'string' ? (
                            <p>{item.answer}</p>
                          ) : (
                            item.answer
                          )}
                        </div>
                        {item.image && (
                          <div className="flex justify-center">
                            <div className="relative w-full max-w-sm h-48 rounded-lg overflow-hidden shadow-md">
                              <Image
                                src={item.image}
                                alt={`Image related to: ${item.question}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
