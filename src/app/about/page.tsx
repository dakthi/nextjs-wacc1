import AboutUs from "@/components/AboutUs";
import { generateSEOMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return generateSEOMetadata({
    title: "About Us",
    description: "Learn about West Acton Community Centre's mission, history, and commitment to serving our local community with 15+ programmes and sustainable facilities.",
    url: "/about",
    keywords: [
      "about us",
      "community centre history",
      "West Acton mission",
      "community values",
      "local organisation",
      "volunteer run",
      "community impact"
    ]
  });
}

export default function About() {
  return <AboutUs />;
}