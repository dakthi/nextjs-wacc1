import { getSettings } from "@/lib/settings";
import { FooterContent } from "./FooterContent";

export async function Footer() {
  const settings = await getSettings();
  
  return <FooterContent settings={settings} />;
}
