"use client"

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Transition } from '@headlessui/react'
import AttributeGallery from '@/components/AttributeGallery';


function AmbientCard({ src, type, isDrawerOpen, attributes }){

    //const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const mediaRef = useRef(null);
    const canvasRef = useRef(null);
    const [targetWidth, setTargetWidth] = useState('100%')
    const [targetHeight, setTargetHeight] = useState('100%')


    const handleDims = (target) =>{
        if(target.naturalWidth !== target.naturalHeight){
            setTargetWidth(`${target.naturalWidth / target.naturalWidth * 100}%`)
            setTargetHeight(`${((target.naturalWidth - target.naturalHeight) / target.naturalWidth) * 150 }%`)
    
        }

        // setTargetWidth(`${target.naturalWidth}px`)
        // setTargetHeight(`${target.naturalHeight}px`)
        
    }
  
    const draw = () => {
      const ctx = canvasRef.current.getContext('2d');
      if(ctx && mediaRef.current){
        ctx.drawImage(mediaRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      }
    };
  
    useEffect(() => {
      if (type === 'video') {
        const video = mediaRef.current;
        video.addEventListener('loadeddata', () => {
          draw(); // Draw the initial frame
          video.addEventListener('timeupdate', draw); // Update as video plays
        });
  
        return () => {
          video.removeEventListener('loadeddata', draw);
          video.removeEventListener('timeupdate', draw);
        };
      } else {
        draw();
      }
    }, [src, type, targetHeight, targetWidth]);

  return (
    <section  className="relative w-full h-full p-2 ">
        <div className=" h-full w-auto  flex items-center justify-center ">
        <canvas  width={targetWidth} height={targetHeight} aria-hidden="true" style={{ width: targetWidth, height: targetHeight }} className="relative bg-image-blur rounded-md"  ref={canvasRef}></canvas>

        </div>

        <Transition show={isDrawerOpen}
  
        enter="transition ease-out duration-300 transform"
        enterFrom="translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-300 transform "
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-full opacity-0"
                className={`z-50 bg-black opacity-90 m-2 absolute static rounded-md top-0 left-0 right-0 bottom-0 w-auto h-auto items-center justify-center overflow-y-auto`}

                
                >
                    {attributes ? <AttributeGallery attributes={attributes}/> : <h3>Nothing to show ...</h3>}
        </Transition>



        <div className="p-2 absolute top-0 left-0 w-auto h-full m-auto flex flex-column items-center justify-center " >
        {type === 'video' && <video autoplay="autoplay" muted loop className="w-full h-full block rounded-md" ref={mediaRef} src={src} onLoad={(event) => handleDims(event.target)}></video>}
        {(type === 'image' || type === 'gif') && <img className="w-full h-auto rounded-md m-auto" ref={mediaRef} src={src} alt="Media content" onLoad={(event) => handleDims(event.target)} />}
        
        </div>

    </section>
  );
};

export default AmbientCard;