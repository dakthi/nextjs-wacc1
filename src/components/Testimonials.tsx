import React from "react";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";

interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string | null;
  avatarUrl: string | null;
}

// Default fallback testimonials
const fallbackTestimonials = [
  {
    id: 1,
    quote: "WACC has been such a blessing for our family. The Stay & Play sessions give our toddler a chance to socialize while I connect with other parents in the community.",
    authorName: "Sarah Johnson",
    authorTitle: "Parent, West Acton resident",
    avatarUrl: "/img/user-1.png"
  },
  {
    id: 2,
    quote: "I've been attending Taekwondo classes here for 3 years. The instructors are excellent and the community spirit is amazing. It's not just exercise - it's a second home.",
    authorName: "David Chen",
    authorTitle: "Taekwondo student",
    avatarUrl: "/img/user-1.png"
  },
  {
    id: 3,
    quote: "We recently held our community fundraiser here and the staff were incredibly helpful. The Main Hall was perfect for our event and the kitchen facilities made catering so much easier.",
    authorName: "Amira Hassan",
    authorTitle: "Community organizer",
    avatarUrl: "/img/user-1.png"
  },
];

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        quote: true,
        authorName: true,
        authorTitle: true,
        avatarUrl: true,
      }
    });

    // Return database testimonials if available, otherwise fallback
    return testimonials.length > 0 ? testimonials : fallbackTestimonials;
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    return fallbackTestimonials;
  }
}

export const Testimonials = async () => {
  const testimonials = await getTestimonials();
  
  return (
    <section className="py-16 bg-gray-50">
      <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Our Community Says
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from members of our West Acton community about their experiences at WACC
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard 
            key={testimonial.id}
            quote={testimonial.quote}
            avatar={testimonial.avatarUrl || "/img/user-1.png"}
            name={testimonial.authorName}
            title={testimonial.authorTitle || ""}
          />
        ))}
      </div>
      </Container>
    </section>
  );
};

function TestimonialCard({
  quote,
  avatar,
  name,
  title,
}: {
  quote: string;
  avatar: string;
  name: string;
  title: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
        <p className="text-gray-800 text-base leading-relaxed lg:text-lg mb-6">
          "{quote}"
        </p>
      </div>
      <div className="border-t pt-4 flex items-center space-x-3">
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}