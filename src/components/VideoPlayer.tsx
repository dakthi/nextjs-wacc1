'use client';

import React from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className = '' }) => {
  return (
    <div className={`relative w-full aspect-[9/16] overflow-hidden rounded-lg shadow-lg ${className}`}>
      <video
        src={`/${src}`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: 'center',
          objectFit: 'cover',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}; 