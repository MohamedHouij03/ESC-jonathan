'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/banner/A7404964 (2).jpg',
  '/images/banner/7a9ae62bebc0a8e32ecafda8b9025fdb.jpg',
  '/images/banner/95ff267774eb66a356ff5346f993efb2.jpg',
  '/images/banner/A7404373-2 (2).jpg',
  '/images/banner/A7404969 (1).jpg',
  '/images/banner/64188e37c55836c6271da3cfcfa00354.jpg',
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Image slides */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-4 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 