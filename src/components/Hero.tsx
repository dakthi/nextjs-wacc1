import Image from "next/image";
import { SiteSettings } from "@/lib/settings";

interface HeroProps {
  settings?: SiteSettings;
  backgroundImage?: string;
}

export function Hero({ settings, backgroundImage }: HeroProps) {
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
          src={settings?.hero_background_image || backgroundImage || "/img/entrance.jpeg"}
          alt={`${siteTitle} Hero Background`}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">
              {siteTitle}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {heroSubtitle}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                {residentsServed}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Residents Served
              </div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                {weeklyPrograms}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Weekly Programs
              </div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                {openingDays}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Days a Week
              </div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                {mainHallCapacity}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium">
                Main Hall Capacity
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href={settings?.hero_cta_button_link || "/programs"}
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {settings?.hero_cta_button_text || "Explore Programs"}
            </a>
            <a
              href="/facilities"
              className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/30"
            >
              Book Facilities
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}