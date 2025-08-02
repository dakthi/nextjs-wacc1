import Image from "next/image";
import { Container } from "@/components/Container";

interface Highlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  price?: string;
  ages?: string;
}

interface WeeklyHighlightsProps {
  highlights: Highlight[];
}

export const WeeklyHighlights = ({ highlights }: WeeklyHighlightsProps) => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
            THIS WEEK'S PROGRAMS & FACILITIES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what's happening at WACC this week and explore our modern facilities
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <HighlightCard key={highlight.id} {...highlight} />
          ))}
        </div>
      </Container>
    </section>
  );
};

function HighlightCard({
  title,
  subtitle,
  description,
  image,
  buttonText,
  buttonLink,
  price,
  ages,
}: Highlight) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badge */}
        {price && (
          <div className="absolute top-4 right-4 bg-accent-400 text-primary-900 px-3 py-1 rounded-full text-sm font-bold">
            {price}
          </div>
        )}
        {ages && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {ages}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-primary-600 mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
          {subtitle}
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          {description}
        </p>
        
        <a
          href={buttonLink}
          className="inline-block w-full text-center bg-primary-950 hover:bg-primary-900 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}