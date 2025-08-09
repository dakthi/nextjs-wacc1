import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

interface LocationBenefit {
  title: string;
  desc: string;
  icon: React.ReactNode | string;
}

interface BenefitLocationProps {
  title: string;
  description: string;
  contact: string;
  sectionHeading: string;
  image?: string | { src: string };
  benefits: LocationBenefit[];
  buttons?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }[];
}

export const BenefitLocation = (props: Readonly<BenefitLocationProps>) => {
  const { title, description, contact, sectionHeading, image, benefits, buttons } = props;

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        {/* Centered content column with wide margins */}
        <div className="max-w-4xl mx-auto px-8">
          {/* Large, centered page title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h1>

          {/* Multi-paragraph text block, left-aligned */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed text-left">
              {description}
            </p>
          </div>

          {/* Contact line, left-aligned */}
          <p className="text-gray-600 text-left mb-12">
            {contact}
          </p>

          {/* Big, centered section heading as divider */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            {sectionHeading}
          </h2>

          {/* Location content with image and benefits */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Image section */}
            {image && (
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={typeof image === "string" ? image : image.src}
                  fill
                  alt="Location"
                  className="object-cover"
                />
              </div>
            )}

            {/* Benefits section */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <LocationBenefit key={index} benefit={benefit} />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex justify-center">
              <div className="flex flex-col sm:flex-row gap-4">
                {buttons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.href}
                    className={`inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 text-center uppercase ${
                      btn.variant === "secondary"
                        ? "text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white"
                        : "text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

function LocationBenefit(props: {
  benefit: LocationBenefit;
}) {
  const { benefit } = props;
  
  return (
    <div className="flex items-start space-x-4">
      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg">
        {typeof benefit.icon === 'string' ? (
          <span className="text-primary-600 text-lg font-bold">{benefit.icon}</span>
        ) : (
          React.cloneElement(benefit.icon as React.ReactElement, {
            className: "w-6 h-6 text-primary-600",
          })
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
        <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
      </div>
    </div>
  );
}