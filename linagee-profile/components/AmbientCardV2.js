"use client"

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Transition } from '@headlessui/react'
import AttributeGallery from '@/components/AttributeGallery';


function AmbientCardV2({ src, type, isDrawerOpen, attributes }){
  const renderMedia = () => {
    if (type === 'video') {
      return (
        <div className="relative overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 w-full h-full min-w-[100%] min-h-[100%] object-cover filter blur-2xl scale-110 -translate-x-1/2 -translate-y-1/2"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
          <video
            className="relative w-full h-auto"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      );
    } else if (type === 'image') {
      return (
        <div className="relative overflow-hidden">
          <img
            className="absolute top-1/2 left-1/2 w-full h-full min-w-[100%] min-h-[100%] object-cover filter blur-2xl scale-110 -translate-x-1/2 -translate-y-1/2"
            src={src}
            alt=""
          />
          <img
            className="relative w-full h-auto"
            src={src}
            alt=""
          />
        </div>
      );
    }
  };

  return renderMedia();
};
export default AmbientCardV2;