"use client"

import React, { useState, useEffect } from 'react';
import { FaImage } from "react-icons/fa";
import AmbientCard from "@/components/AmbientCard";
import { getMediaType } from '@/utils/utils';


function ImageLoader({ src, isDrawerOpen, attributes }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [srcType, setSrcType] = useState('unknown');


  const loadType = async () => {
    const type = await getMediaType(src);
    console.log(src, type)
    if(type !== "unknown"){
      setSrcType(type);

    }

  }




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
    loadType();
    return loadImage();
  }, [src]);

  return (
    <div className="m-0 items-center justify-center rounded-md  p-5 w-full h-full">
      {!isImageLoaded && hasError && <FaImage className="w-50 h-50 m-auto" />}
      {!isImageLoaded && !hasError && <div className="flex-1 animated-pulse" />}
      {isImageLoaded && srcType !== "unknown" && (
        <AmbientCard src={src} type={srcType} isDrawerOpen={isDrawerOpen} attributes={attributes} alt="Loaded"/>
      )}
    </div>
  );
};

export default ImageLoader;
