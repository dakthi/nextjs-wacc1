"use client";

import Link from "next/link";
import { Facebook, Linkedin, Instagram } from "./SocialIcons";
import { SiteSettings } from "@/lib/settings";

interface FooterContentProps {
  settings: SiteSettings;
}

export function FooterContent({ settings }: FooterContentProps) {
  const navigation = [
    { label: "Home", href: "/" },
    { label: "Facilities", href: "/facilities" },
    { label: "Programs", href: "/programs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-sm">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-primary-600 text-base mb-4 uppercase tracking-wide">Contact</h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center">
                <span className="font-medium text-primary-600">Address:</span>
                <span className="ml-2">{settings.address}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium text-primary-600">Phone:</span>
                <span className="ml-2">{settings.contact_phone}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium text-primary-600">Email:</span>
                <span className="ml-2">{settings.contact_email}</span>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-3">Explore</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-[#A0522D] transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-primary-600 text-base mb-4 uppercase tracking-wide">Opening Hours</h3>
            <div className="text-gray-600 space-y-2">
              <div>
                <p className="font-medium text-gray-800">Centre Hours:</p>
                <p>{settings.opening_hours_details}</p>
              </div>
              <div className="pt-2">
                <p className="font-medium text-gray-800">Office Hours:</p>
                <p>Monday: 9:30 AM - 11:00 AM</p>
                <p>Wed-Fri: 10:00 AM - 2:30 PM</p>
              </div>
            </div>
          </div>

          {/* Social & Links */}
          <div>
            <h3 className="font-semibold text-primary-600 text-base mb-4 uppercase tracking-wide">Connect</h3>
            <div className="space-y-3">
              {settings.social_facebook && (
                <div>
                  <a
                    href={settings.social_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Facebook />
                    <span className="ml-2">Follow us on Facebook</span>
                  </a>
                </div>
              )}
              {settings.social_twitter && (
                <div>
                  <a
                    href={settings.social_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <span className="ml-2">Follow us on Twitter</span>
                  </a>
                </div>
              )}
              {settings.social_instagram && (
                <div>
                  <a
                    href={settings.social_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Instagram />
                    <span className="ml-2">Follow us on Instagram</span>
                  </a>
                </div>
              )}
              <div>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary-600 transition-colors block"
                >
                  View on Google Maps
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  Serving 2,000+ residents • 15+ weekly programs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center py-8 border-t border-gray-200 mt-12">
          <div className="mb-4">
            <Link href="/" className="inline-flex items-center">
              <h2 className="text-xl font-heading font-bold text-primary-600 tracking-tight">
                {settings.site_title.toUpperCase()}
              </h2>
            </Link>
          </div>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {settings.site_title}. 
            Proudly serving the West Acton community.
          </p>
        </div>
      </div>
    </footer>
  );
}