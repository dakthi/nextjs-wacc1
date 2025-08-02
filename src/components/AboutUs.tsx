import React from "react";
import { Container } from "@/components/Container";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <Container>
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-6 uppercase tracking-tight">
              About West Acton Community Centre
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Serving our local community with pride and dedication since our establishment
            </p>
          </div>

          <div className="grid gap-12 lg:gap-16">
            <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-6 uppercase tracking-tight">
                Our Mission
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Located in Churchill Gardens, we are more than just a venue — we are the heart of West Acton, 
                bringing together over <strong>2,000 residents</strong> through education, leisure, and recreational programs.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                Our mission is simple: <strong>to improve wellbeing through community connection</strong>. Whether you're looking 
                for a space to host your event, want to join one of our 15+ weekly programs, or simply need a 
                place where you belong, WACC is here for you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
                  Programs & Activities
                </h3>
                <p className="text-gray-800 leading-relaxed mb-4">
                  From our Stay & Play sessions for young families to martial arts classes, from cultural groups 
                  to fitness programs, we believe there's something for everyone in our community.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  We work closely with local businesses and residents to create events that bring us all together.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
                  Modern Facilities
                </h3>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Our facilities include a spacious <strong>Main Hall</strong> that accommodates up to 120 people, 
                  a cozy <strong>Small Hall</strong> perfect for intimate gatherings, and kitchen facilities to support your catering needs.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  With convenient parking and excellent transport links, we're easily accessible to all.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-6 uppercase tracking-tight">
                Community-Led Approach
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                What sets us apart is our commitment to being truly <strong>community-led</strong>. We host regular fundraising 
                events, from NHS seminars to cultural fairs and cake sales that support our programs and facilities.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                Every event, every program, every gathering is designed to strengthen the bonds that make West Acton special.
                Open <strong>seven days a week from 7 AM to 11 PM</strong>, we're here when you need us.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-accent-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-heading font-bold text-primary-600 mb-6 uppercase tracking-tight">
                Come and Be Part of Our Community
              </h3>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
                At WACC, we believe that strong communities are built through connection, shared experiences, 
                and mutual support. We invite you to discover what makes West Acton special.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                  <h4 className="font-bold text-primary-600 mb-3 text-lg uppercase tracking-wide">VOLUNTEER-RUN CENTRE</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our dedicated team of volunteers ensures every event runs smoothly. We provide on-site management 
                  and support throughout your booking, maintaining the highest standards of service and care.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <h4 className="font-bold text-primary-600 mb-3 text-lg uppercase tracking-wide">REGISTERED CHARITY</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Operating as a registered charity under Ealing Council ownership, we reinvest all proceeds back into 
                  the community. This allows us to offer competitive rates while continuously improving our facilities and services.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <h4 className="font-bold text-primary-600 mb-3 text-lg uppercase tracking-wide">PROFESSIONAL STANDARDS</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We maintain professional cleaning standards and carry comprehensive building and public liability insurance. 
                  All policies are in place to ensure your events are safe, secure, and worry-free.
                </p>
              </div>
            </div>
          </div>

          {/* Certificates and Documentation */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
                Certifications & Documentation
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We maintain all necessary certifications and documentation to ensure our facility meets 
                professional standards for safety, hygiene, and insurance coverage.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src="/img/certificate-insurance.jpeg"
                    alt="Building and Public Liability Insurance Certificate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Insurance Certificate
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Comprehensive building and public liability insurance coverage
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src="/img/certificate-hygiene.jpeg"
                    alt="Food Hygiene Certificate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Hygiene Certificate
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Food safety and hygiene standards certification
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src="/img/fire-procedure.jpeg"
                    alt="Fire Safety Procedures"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Fire Safety Procedures
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Emergency procedures and fire safety protocols
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
