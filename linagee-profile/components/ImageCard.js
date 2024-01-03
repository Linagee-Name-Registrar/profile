"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { fetchNftData } from '@/utils/utils';
import ImageLoader from '@/components/ImageLoader';
import { PiSealQuestion } from "react-icons/pi";
import AttributeGallery from '@/components/AttributeGallery';

function ImageCard({props}) {
    const [metadata, setMetadata] = useState({});
    const [loading, setLoading] = useState(true);
    const [detailed, setDetailed] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const callMetadata = async (uri) => {
        try {
            const formattedUri = uri.startsWith("ipfs://")
                ? uri.replace("ipfs://", "https://ipfs.io/ipfs/")
                : uri;
    
            const metadataReturned = await fetchNftData(formattedUri);
            let image = metadataReturned?.image;
    
            if (image && image.startsWith("ipfs://")) {
                image = image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            setLoading(false);
            setMetadata({ ...metadataReturned, image: image }); 
    }catch (error) {
            console.log("error ", error);
            setLoading(false);
            setMetadata({});
        }
    }

    useEffect(() => {
        if(props.tokenUri){
            callMetadata(props.tokenUri);
        }
        
    }, [props.tokenUri]);
    return(
        

        <div className={`relative w-[16em] min-w-[10em] min-h-[20em] h-[20em] m-2  ${loading ? "animate-pulse" : ""}`}>

            <>
            <div className={"flex flex-col"}>
                <div className="flex w-[16em] min-w-[10em] h-[16em] max-h-[16em] items-center overflow-hidden">
                    <Suspense >
                    {/*<Suspense fallback={<LoadingIndicator width={12} height={12} className={"w-full flex h-[20vh] justify-center items-center"}/>}>*/}
                        <div className={"w-full hover:scale-105 ease-in duration-200 cursor-pointer p-5"} onClick={()=>setIsDrawerOpen(!isDrawerOpen)} >
                            <ImageLoader attributes={metadata?.attributes} src={metadata?.image} isDrawerOpen={isDrawerOpen}/>
                        </div>
                    </Suspense>

                    {/* <img className="w-full" src={item.image || item.stamp_url || (item.description).slice(6)} style={{imageRendering: "pixelated"}} loading={"lazy"}/> */}
                </div>

            </div>

                <div className={"flex flex-col items-center justify-between ml-3 mr-3"}>
                    <div>
                        
                    </div>
                <button className="relative w-[10%] h-[10px] rounded-md hover:scale-130 ease-in duration-200 cursor-pointer" onClick={()=>setIsDrawerOpen(!isDrawerOpen)}>
                    <div className="absolute h-[2px] w-full bg-white border-white rounded md"></div>
                </button>

                <div className={"flex flex-col gap-3 font-light font-sans"}>
                    <div className={"flex flex-col gap-3 "}>

                        <h2 className={" m-2 mt-2 text-md font-semibold text-gray-900 dark:text-white"}>{`${props.contractName} #${props.tokenId}` || metadata?.name }</h2>
                    </div>
                    
    
                </div>
            </div>
            

        </>




    </div>

    )
}

export default ImageCard