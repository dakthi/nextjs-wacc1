import Image from "next/image";
import React from "react";

interface SplitBannerSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  features?: string;
}

interface SplitBannerProps {
  sections: SplitBannerSection[];
}

export const SplitBanner = (props: Readonly<SplitBannerProps>) => {
  const { sections } = props;

  // Ensure we only show the first 2 sections
  const displaySections = sections.slice(0, 2);

  return (
    <section className="h-[50vh] sm:h-[60vh] lg:h-[67vh] flex flex-col sm:flex-row">
      {displaySections.map((section, index) => (
        <div key={section.id} className="relative flex-1 min-h-[25vh] sm:min-h-full">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={section.image}
              fill
              alt={section.title}
              className="object-cover"
              style={{ objectPosition: 'center center' }}
              priority={index === 0}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content - Left and Bottom aligned */}
          <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8">
            <div className="max-w-md">
              {/* Features/Badge */}
              {section.features && (
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                  {section.features}
                </div>
              )}

              {/* Title */}
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                {section.title}
              </h2>

              {/* Subtitle */}
              <h3 className="text-sm sm:text-lg lg:text-xl text-white/90 font-medium mb-2 sm:mb-4">
                {section.subtitle}
              </h3>

              {/* Description - Hidden on mobile for space */}
              <p className="hidden sm:block text-white/80 text-sm lg:text-base mb-4 sm:mb-6 leading-relaxed">
                {section.description}
              </p>

              {/* CTA Button - Simple style */}
              <a
                href={section.buttonLink}
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-xs sm:text-sm lg:text-base uppercase tracking-wide transition-colors duration-200 shadow-lg"
              >
                {section.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};