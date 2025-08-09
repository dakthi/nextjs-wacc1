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
    facilityDetails?: {
      id: number;
      name: string;
      subtitle?: string;
      description?: string;
      capacity?: number;
      dimensions?: string;
      hourlyRate?: number;
      features?: string[];
      imageUrl?: string;
    }[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;

  return (
    <section className="py-0 bg-gray-50">
      <Container>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[33vh] max-h-[400px] min-h-[300px]">
          <div className="grid lg:grid-cols-8 gap-0 h-full">
            {/* Image Section - Takes 3 columns (about 1/3 of screen) */}
            <div
              className={`lg:col-span-3 relative ${
                props.imgPos === "right" ? "lg:order-2" : ""
              }`}
            >
              <div className="h-full">
                {data.video ? (
                  <VideoPlayer src={data.video} />
                ) : data.image && (
                  <div className="relative w-full h-full">
                    <Image
                      src={typeof data.image === "string" ? data.image : data.image.src}
                      fill
                      alt="Facility Image"
                      className="object-cover"
                      style={{
                        objectPosition: "center",
                        objectFit: "cover",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  </div>
                )}
              </div>
            </div>

            {/* Content Section - Takes 5 columns */}
            <div
              className={`lg:col-span-5 p-6 lg:p-8 flex flex-col justify-center overflow-y-auto ${
                props.imgPos === "right" ? "lg:order-1" : ""
              }`}
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {data.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {data.desc}
                </p>
              </div>

              {/* Bullets/Features */}
              <div className="grid gap-4 mb-6">
                {data.bullets.map((item, index) => (
                  <Benefit key={index} title={item.title} icon={item.icon}>
                    {item.desc}
                  </Benefit>
                ))}
              </div>

              {/* Facility Overview Stats */}
              {data.facilityDetails && data.facilityDetails.length > 0 && (
                <div className="mb-4">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <h4 className="text-base font-semibold text-gray-900 mb-2">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div>
                        <div className="text-lg font-bold text-primary-600">{data.facilityDetails.length}</div>
                        <div className="text-xs text-gray-600">Facilities</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary-600">
                          {Math.max(...data.facilityDetails.filter(f => f.capacity).map(f => f.capacity || 0))}
                        </div>
                        <div className="text-xs text-gray-600">Max Capacity</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary-600">
                          £{Math.min(...data.facilityDetails.filter(f => f.hourlyRate).map(f => f.hourlyRate || Infinity))}
                        </div>
                        <div className="text-xs text-gray-600">From/hour</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary-600">
                          {data.facilityDetails.reduce((acc, f) => acc + (f.features?.length || 0), 0)}
                        </div>
                        <div className="text-xs text-gray-600">Features</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              {data.buttons?.length && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {data.buttons.map((btn, idx) => (
                    <a
                      key={idx}
                      href={btn.href}
                      className={`inline-block px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 text-center ${
                        btn.variant === "secondary"
                          ? "text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white"
                          : "text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      }`}
                    >
                      {btn.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
    <div className="flex items-start space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg">
        {typeof props.icon === 'string' ? (
          <span className="text-primary-600 text-sm font-bold">{props.icon}</span>
        ) : (
          React.cloneElement(props.icon as React.ReactElement, {
            className: "w-4 h-4 text-primary-600",
          })
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">{props.title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{props.children}</p>
      </div>
    </div>
  );
}
