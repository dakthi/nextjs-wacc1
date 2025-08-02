import Image from "next/image";
import { SiteSettings } from "@/lib/settings";

interface VideoSelfHostedProps {
  settings?: SiteSettings;
}

export function VideoSelfHosted({ settings }: VideoSelfHostedProps) {
  const siteTitle = settings?.site_title || 'West Acton Community Centre';
  const heroSubtitle = settings?.hero_subtitle || 'Your local hub bringing together 2,000+ residents through education, leisure, and recreational programs';
  const residentsServed = settings?.residents_served || '2,000+';
  const weeklyPrograms = settings?.weekly_programs || '15+';
  const openingDays = settings?.opening_hours_text || '7';
  const mainHallCapacity = settings?.main_hall_capacity || '120';
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/entrance.jpeg"
          alt={`${siteTitle} Main Hall`}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
            WELCOME TO
            <br />
            <span className="text-accent-400">{siteTitle.toUpperCase()}</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto font-light">
            {heroSubtitle}
          </p>

          {/* Single CTA Button */}
          <a
            href="/programs"
            className="inline-block bg-primary-950 hover:bg-primary-900 text-white font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            EXPLORE OUR PROGRAMS
          </a>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">{residentsServed}</div>
              <div className="text-sm uppercase tracking-wide">Residents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">{weeklyPrograms}</div>
              <div className="text-sm uppercase tracking-wide">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">{openingDays.replace(/\D/g, '') || '7'}</div>
              <div className="text-sm uppercase tracking-wide">Days Open</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">{mainHallCapacity}</div>
              <div className="text-sm uppercase tracking-wide">Max Capacity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}