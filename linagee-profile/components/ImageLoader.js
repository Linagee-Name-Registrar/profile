"use client"

import React, { useState, useEffect } from 'react';
import { FaImage } from "react-icons/fa";

function ImageLoader({ src }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadImage = () => {
    const image = new Image();

    image.onload = () => setIsImageLoaded(true);
    image.onerror = () => setHasError(true);

    image.src = src;

    // Set a timeout for 30 seconds
    const timeoutId = setTimeout(() => {
      setHasError(true);
    }, 30000);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    return loadImage();
  }, [src]);

  return (
    <div className="w-full h-full items-center justify-center">
      {!isImageLoaded && hasError && <FaImage className="w-50 h-50 m-auto" />}
      {!isImageLoaded && !hasError && <div className="flex-1 animated-pulse" />}
      {isImageLoaded && <img src={src} alt="Loaded"/>}
    </div>
  );
};

export default ImageLoader;
