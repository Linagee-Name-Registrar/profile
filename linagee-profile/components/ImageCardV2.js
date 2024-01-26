"use client"


import React, { useEffect, useRef, useState, Fragment, Suspense } from 'react';
import { fetchDataAndType } from '@/utils/utils';
import { FaImage } from "react-icons/fa";
import { Transition } from '@headlessui/react'
import AttributeGallery from '@/components/AttributeGallery';

function ImageCardV2({props, key}){
    // console.log(props);
    const [metadata, setMetadata] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            if (props.tokenUri) {
                const { md, type } = await fetchDataAndType(props.tokenUri);
                // console.log(md, type);
                setMetadata({ md, type });
            }
        };

        fetchData();
    }, [props.tokenUri]);

    const loadImage = () => {
        const image = new Image();
    
        image.onload = () => setLoading(false);
        image.onerror = () => setHasError(true);
    
        image.src = metadata.md.image
    
        // Set a timeout for 30 seconds
        const timeoutId = setTimeout(() => {
          setHasError(true);
        }, 60000);
    
        return () => clearTimeout(timeoutId);
      };
    
      useEffect(() => {
        if (metadata.md && metadata.md.image){
            loadImage();
        }
        
      }, [metadata]);

      const commonClasses = "absolute inset-0 w-full h-full object-cover rounded-md";
      const ambientClasses = "filter blur-lg dark:blur-md";
      const fadeOverlayClasses = "absolute inset-0  from-transparent to-white dark:to-gray-900 opacity-25 rounded-md ";


  return(
    <div key={key} className={`relative w-[16em] min-w-[10em] min-h-[20em] h-[20em] m-2 rounded-md  ${(loading && !hasError )? "bg-gray-100 dark:bg-gray-700 animate-pulse" : ""}`}>
                    <div className={`flex flex-col ${loading ? "animated-pulse" : ""}`}>
                <div className={"flex w-[16em] min-w-[10em] h-[16em] max-h-[16em] items-center p-5"}>
            <Suspense >
                    {/* {hasError && !loading && <FaImage className="w-100 h-100 dark:text-white text-gray-700 m-auto relative" />} */}
                    {!loading && !hasError && metadata.md.image && metadata.type === 'image'|| 'gif' && (
                        <div className="relative hover:scale-105 ease-in duration-200 cursor-pointer"  onClick={()=>setIsDrawerOpen(!isDrawerOpen)}>
                            <img className={`${commonClasses} ${ambientClasses}`} src={metadata?.md?.image} alt="" />
                            <div className={`${commonClasses} ${fadeOverlayClasses}`}></div>
                            <img className="relative w-full h-auto rounded-md" src={metadata?.md?.image} alt="" />
                        </div>
                    )}
                    {!loading && !hasError && metadata.md.image  && metadata.type === 'video' && (
                        <div className="relative hover:scale-105 ease-in duration-200 cursor-pointer"  onClick={()=>setIsDrawerOpen(!isDrawerOpen)}>
                            <video className={`${commonClasses} ${ambientClasses}`} src={metadata?.md?.image} autoPlay loop muted playsInline />
                            <div className={`${commonClasses} ${fadeOverlayClasses}`}></div>
                            <video className="relative w-full h-auto rounded-md" src={metadata?.md?.image} autoPlay loop muted playsInline />
                        </div>

                    )}
        </Suspense>
        <Transition show={isDrawerOpen}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in duration-300 transform "
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
            className={`z-50 bg-gray-800 opacity-90 dark:bg-black dark:opacity-80 m-2  absolute static rounded-md top-0 left-0 right-0 bottom-10 w-auto h-auto items-center justify-center overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thumb-gray-400 cursor-pointer`}
            onClick={()=>setIsDrawerOpen(!isDrawerOpen)}
          >
              {(metadata?.md?.attributes || props?.address) ? <AttributeGallery address={props?.address}  attributes={metadata?.md?.attributes}/> : <h3>Nothing to show ...</h3>}
        </Transition>
        </div>


        </div>

        <div className={"flex flex-col items-center justify-between ml-3 mr-3"}>
                    <div>
                        
                    </div>
                <button className="relative w-[10%] h-[10px] rounded-md hover:scale-150 ease-in duration-200 cursor-pointer"  onClick={()=>setIsDrawerOpen(!isDrawerOpen)}>
                    <div className="absolute h-[2px] w-full bg-gray-900 border-gray-900 dark:bg-white dark:border-white rounded md"></div>
                </button>

                <div className={"flex flex-col gap-3 font-light font-sans"}>
                    <div className={"flex flex-col gap-3 "}>

                        <h2 className={" m-2 mt-2 text-md font-semibold text-gray-900 dark:text-white"}>{`${props.contractName} #${props.tokenId}` || metadata?.md?.name }</h2>
                    </div>
                    
    
                </div>
            </div>

    </div>
    
  )
};
export default ImageCardV2;