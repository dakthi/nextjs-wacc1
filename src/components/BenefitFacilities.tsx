import React from "react";
import { Container } from "@/components/Container";
import OptimizedImage from "@/components/OptimizedImage";

interface FacilityCard {
  id: number;
  name: string;
  subtitle?: string;
  description?: string;
  capacity?: number;
  dimensions?: string;
  hourlyRate?: number;
  features?: string[];
  imageUrl?: string | null;
}

interface BenefitFacilitiesProps {
  title: string;
  description: string;
  contact: string;
  sectionHeading: string;
  facilities: FacilityCard[];
  viewAllHref?: string;
}

export const BenefitFacilities = (props: Readonly<BenefitFacilitiesProps>) => {
  const { title, description, contact, sectionHeading, facilities, viewAllHref = "#" } = props;

  return (
    <section className="min-h-screen flex items-center py-8 lg:py-16 bg-white">
      <Container className="w-full">
        {/* Centered content column */}
        <div className="max-w-6xl mx-auto">
          {/* Large, centered page title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4 lg:mb-8">
            {title}
          </h1>

          {/* Multi-paragraph text block, left-aligned */}
          <div className="prose prose-sm lg:prose-lg max-w-none mb-3 lg:mb-6">
            <p className="text-gray-700 leading-relaxed text-left text-sm lg:text-base">
              {description}
            </p>
          </div>

          {/* Contact line, left-aligned */}
          <p className="text-gray-600 text-left mb-4 lg:mb-8 text-xs lg:text-sm">
            {contact}
          </p>

          {/* Big, centered section heading as divider */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-6 lg:mb-8">
            {sectionHeading}
          </h2>

          {/* Dynamic column card grid - adjusts based on number of facilities */}
          <div className={`grid gap-4 lg:gap-6 mb-6 lg:mb-8 ${
            facilities.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
            facilities.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
            facilities.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {facilities.map((facility) => (
              <div key={facility.id} className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                {/* Title bar on top */}
                <div className="bg-primary-600 text-white py-2 lg:py-3 px-3 lg:px-4">
                  <h3 className="text-sm lg:text-base font-semibold text-center">
                    {facility.name}
                  </h3>
                  {facility.subtitle && (
                    <p className="text-primary-100 text-xs lg:text-sm text-center mt-1">
                      {facility.subtitle}
                    </p>
                  )}
                </div>

                {/* Compact horizontal image area with overlaid View button */}
                <div className="relative h-32 lg:h-40 bg-gray-200">
                  {facility.imageUrl ? (
                    <OptimizedImage
                      src={facility.imageUrl}
                      fill
                      alt={facility.name}
                      className="object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs lg:text-sm">
                      <span>No image available</span>
                    </div>
                  )}
                  
                  {/* Small "View" button overlaid on image */}
                  <button className="absolute bottom-2 right-2 bg-primary-600 hover:bg-primary-700 text-white px-2 lg:px-3 py-1 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors shadow-lg uppercase">
                    View
                  </button>
                </div>

                {/* Compact facility details */}
                <div className="p-2 lg:p-3 space-y-2">
                  {facility.description && (
                    <p className="text-gray-600 text-xs lg:text-sm line-clamp-2">{facility.description}</p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm">
                    {facility.capacity && (
                      <div className="bg-gray-50 p-1 lg:p-2 rounded text-center">
                        <div className="text-primary-600 font-bold text-sm lg:text-base">{facility.capacity}</div>
                        <div className="text-gray-600 text-xs">people</div>
                      </div>
                    )}
                    
                    {facility.hourlyRate && (
                      <div className="bg-gray-50 p-1 lg:p-2 rounded text-center">
                        <div className="text-primary-600 font-bold text-sm lg:text-base">£{facility.hourlyRate.toString()}</div>
                        <div className="text-gray-600 text-xs">per hour</div>
                      </div>
                    )}
                  </div>

                  {facility.features && facility.features.length > 0 && (
                    <div className="text-xs border-t pt-1">
                      <span className="text-gray-600">{facility.features.slice(0, 3).join(', ')}{facility.features.length > 3 ? '...' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Single, centered call-to-action button */}
          <div className="text-center">
            <a
              href={viewAllHref}
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-sm lg:text-lg font-semibold transition-colors shadow-lg uppercase"
            >
              View All Rooms
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};