import AboutUs from "@/components/AboutUs";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  
  return {
    title: `About Us | ${settings.site_title}`,
    description: `Learn about ${settings.site_title}'s mission, history, and commitment to serving our local community with ${settings.weekly_programs} programmes and sustainable facilities.`,
  };
}

export default function About() {
  return <AboutUs />;
}