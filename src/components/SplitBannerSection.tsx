"use client";

import OptimizedImage from "@/components/OptimizedImage";
import React from "react";

type BannerItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string | { src: string };
  buttonText: string;
  buttonLink: string;
};

interface SplitBannerSectionProps {
  items: BannerItem[];
}

export const SplitBannerSection = ({ items }: Readonly<SplitBannerSectionProps>) => {
  return (
    <div className="w-full pt-6 md:pt-0 bg-[#fff9ec]">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-y-6 xl:pt-6 md:gap-x-6">
        {items.map((item) => {
          const imageSrc = typeof item.image === "string" ? item.image : item.image.src;

          return (
            <div
              key={item.id}
              className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg"
            >
              {/* Background image */}
              <OptimizedImage
                src={imageSrc}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

              {/* Text content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white z-10">
                <h3 className="text-2xl md:text-3xl font-serif font-bold leading-snug tracking-tight">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="mt-3 text-sm md:text-base text-white/90 leading-relaxed">
                    {item.subtitle}
                  </p>
                )}

                <a
                  href={item.buttonLink}
                  className="mt-6 inline-block w-fit px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A0522D] to-[#8B4513] rounded-full hover:opacity-90 transition"
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
