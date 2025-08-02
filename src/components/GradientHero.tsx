"use client";

import Link from "next/link";

export const GradientHero = () => {
  return (
    <section className="bg-gradient-to-r from-[#f9fbfc] to-[#f3f6fa] py-20 px-6 h-3/4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight font-serif">
          Empower Your Salon with <br/> NailPro Solutions
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Built for modern nail professionals, NailPro Solutions gives you the power to manage
          bookings, staff, and client relationships — all in one ownable, elegant platform. Say goodbye
          to clunky apps and recurring fees.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full hover:opacity-90 transition"
          >
            Get In Touch
          </Link>
          <Link
            href="/solutions"
            className="inline-block px-8 py-3 text-sm font-semibold text-[#1a1a1a] border border-gray-300 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
          >
            See Features
          </Link>
        </div>
      </div>
    </section>
  );
};
