'use client';

import React from 'react';

const LocationInfo = () => {
  return (
    <div className="font-serif bg-[#fff9ec] text-[#1b1b1b]">
      {/* Address & Action */}
      <section className="py-5 px-6 text-center">
        <h3 className="text-2xl font-semibold text-[#5b4636]">Opening Hours</h3>
        <p className="text-gray-700 text-md">Monday – Sunday: 11:00 AM – 10:00 PM</p>
      </section>
      <section className="text-center px-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-[#5b4636]">Our Location</h2>
        <p className="text-md mb-2">3–7 Church St, Bishop&apos;s Stortford, CM23 2LY</p>
        <p className="text-md mb-4">
          {" "}
          <a href="tel:+441279000000" className="underline">
            +44 1279 000 000
          </a>
        </p>
        <a
          href="https://maps.app.goo.gl/TBqrnDyp5rqkLLrz6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#8B4513] text-white font-medium px-6 py-2 mb-4 rounded-full shadow hover:opacity-90 transition"
        >
          Get Directions
        </a>
      </section>

      {/* Embedded Google Map */}
      <div className="w-full h-[400px] pt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.5768418809917!2d0.16313217684992723!3d51.87238087190626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d89ca79885f0c5%3A0x7e28cb04c3be75f3!2s3-7%20Church%20St%2C%20Bishop's%20Stortford%20CM23%202LY%2C%20UK!5e0!3m2!1sen!2suk!4v1717457000000"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>

      {/* Opening Hours */}
      
    </div>
  );
};

export default LocationInfo;
