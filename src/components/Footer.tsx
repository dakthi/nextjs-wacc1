"use client";

import { useEffect, useState } from "react";
import { SiteSettings, fetchClientSettings } from "@/lib/settings";
import { FooterContent } from "./FooterContent";

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const loadSettings = async () => {
      try {
        const data = await fetchClientSettings();
        if (mounted) {
          setSettings(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load footer settings:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array - only runs once on mount

  if (isLoading || !settings) {
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
