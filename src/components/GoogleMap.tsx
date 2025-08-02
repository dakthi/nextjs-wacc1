"use client";

import React from 'react';

interface GoogleMapProps {
  address?: string;
  className?: string;
}

export const GoogleMap = ({ 
  address = "Churchill Gardens, Acton, London W3 0JN", 
  className = "w-full h-96 rounded-lg shadow-md" 
}: GoogleMapProps) => {
  // Encode the address for the Google Maps embed URL
  const encodedAddress = encodeURIComponent(address);
  
  // Google Maps embed URL - using the new embed API
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=15&maptype=roadmap`;
  
  // Fallback to basic Google Maps URL without API key
  const fallbackSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className={className}>
      <iframe
        src={fallbackSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="West Acton Community Centre Location"
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default GoogleMap;