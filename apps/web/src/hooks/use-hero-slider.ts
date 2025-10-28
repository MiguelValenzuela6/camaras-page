"use client";

import { useState, useEffect } from "react";

// Imágenes del slider
const SLIDER_IMAGES = [
  "/images/slider-hero/1.webp",
  "/images/slider-hero/2.webp",
  "/images/slider-hero/3.webp",
];

export function useHeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === SLIDER_IMAGES.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return {
    currentImage: SLIDER_IMAGES[currentImageIndex],
    currentIndex: currentImageIndex,
    totalImages: SLIDER_IMAGES.length,
  };
}
