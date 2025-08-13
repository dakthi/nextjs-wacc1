"use client";

import { useEffect, useState } from "react";
import { SiteSettings, useSettings } from "@/lib/settings";
import { FooterContent } from "./FooterContent";

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const { fetchSettings } = useSettings();

  useEffect(() => {
    fetchSettings().then(setSettings);
  }, [fetchSettings]);

  if (!settings) {
    return (
      <footer className="bg-white border-t border-gray-200 text-sm">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </footer>
    );
  }

  return <FooterContent settings={settings} />;
}
