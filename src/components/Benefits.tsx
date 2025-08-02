import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";
import { VideoPlayer } from "./VideoPlayer";

interface BenefitsProps {
  imgPos?: "left" | "right";
  size?: "small" | "medium" | "large";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image?: string | { src: string };
    video?: string;
    buttons?: {
      label: string;
      href: string;
      variant?: "primary" | "secondary";
    }[];
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode | string;
    }[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;

  return (
    <section className="py-16 bg-white">
      <Container className="flex flex-wrap lg:gap-10 lg:flex-nowrap">
      {/* Media (image or video) */}
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div
          className={`w-full max-w-[450px] ${
            props.size === "small"
              ? "max-w-[350px]"
              : props.size === "large"
              ? "max-w-[600px]"
              : ""
          }`}
        >
          {data.video ? (
            <VideoPlayer src={data.video} />
          ) : data.image && (
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={typeof data.image === "string" ? data.image : data.image.src}
                fill
                alt="Benefits"
                className="object-cover"
                style={{
                  objectPosition: "center",
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
            </div>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          {/* Title + Description */}
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-600 lg:text-xl xl:text-xl">
              {data.desc}
            </p>
          </div>

          {/* Detailed Information */}
          <div className="w-full mt-8 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-primary-600 mb-4 uppercase tracking-wide">
                Comprehensive Facility Details
              </h4>
              <div className="prose prose-lg max-w-none text-gray-800">
                <p className="mb-4 leading-relaxed">
                  {data.desc}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">What's Included:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Professional cleaning to high standards</li>
                      <li>• Full building and public liability insurance</li>
                      <li>• On-site volunteer management support</li>
                      <li>• Tables and chairs (10 large tables, 80 chairs)</li>
                      <li>• Kitchen access with appliances</li>
                      <li>• CCTV security (external)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Additional Services:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Setup and breakdown assistance</li>
                      <li>• Waste disposal facilities</li>
                      <li>• Wheelchair accessible entrance</li>
                      <li>• Free onsite parking</li>
                      <li>• Flexible booking arrangements</li>
                      <li>• Preferential rates for registered charities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-primary-600 mb-4 uppercase tracking-wide">
                Booking Information
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Operating Hours:</h5>
                  <p className="text-gray-700 mb-3">7:00 AM - 11:00 PM, 7 days a week</p>
                  
                  <h5 className="font-semibold text-gray-900 mb-2">Suitable Events:</h5>
                  <p className="text-gray-700">Parties, weddings, funerals, wakes, AGMs, training courses, community meetings, cultural events, fitness classes</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Pricing:</h5>
                  <p className="text-gray-700 mb-3">Competitive rates on request - varies by event type and duration</p>
                  
                  <h5 className="font-semibold text-gray-900 mb-2">Special Rates:</h5>
                  <p className="text-gray-700">Regular bookings and registered charities receive preferential pricing</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          {data.buttons?.length && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {data.buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.href}
                  className={`inline-block px-8 py-3 text-sm font-semibold rounded-full transition ${
                    btn.variant === "secondary"
                      ? "text-[#1a1a1a] border border-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      : "text-white bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:opacity-90"
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      </Container>
    </section>
  );
};

function Benefit(props: {
  title: string;
  icon: React.ReactNode | string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md w-11 h-11">
        {typeof props.icon === 'string' ? (
          <span className="text-2xl">{props.icon}</span>
        ) : (
          React.cloneElement(props.icon as React.ReactElement, {
            className: "w-7 h-7 text-white",
          })
        )}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800">{props.title}</h4>
        <p className="mt-1 text-gray-600">{props.children}</p>
      </div>
    </div>
  );
}
