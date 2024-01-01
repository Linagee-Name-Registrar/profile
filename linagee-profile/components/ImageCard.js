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
        

        <div className={`relative w-[14em] min-w-[10em] min-h-[20em] h-[20em] rounded-xl shadow-md overflow-hidden dark:bg-gray-600 m-2 ${loading ? "animate-pulse" : ""}`}>

            <>
            <div className={"flex flex-col"}>
                <div className="flex w-[14em] min-w-[10em] h-[14em] max-h-[14em] items-center overflow-hidden">
                    <Suspense >
                    {/*<Suspense fallback={<LoadingIndicator width={12} height={12} className={"w-full flex h-[20vh] justify-center items-center"}/>}>*/}
                        <div className={"w-full hover:scale-105 ease-in duration-200 cursor-pointer"}  onClick={()=>setDetailed(!detailed)}>
                            <ImageLoader src={metadata?.image} />
                        </div>
                    </Suspense>

                    {/* <img className="w-full" src={item.image || item.stamp_url || (item.description).slice(6)} style={{imageRendering: "pixelated"}} loading={"lazy"}/> */}
                </div>
                {detailed && (
                            <div className="absolute w-full h-full items-center backdrop-blur-sm bg-white/30 p-5 overflow-y-auto"  onClick={()=>setDetailed(!detailed)}>
                        <h2 className={"m-2 text-md font-bold text-gray-900 "}>Attributes</h2>
                            <AttributeGallery attributes={metadata?.attributes}/>
                
                                    {/* <img className="w-full" src={item.image || item.stamp_url || (item.description).slice(6)} style={{imageRendering: "pixelated"}} loading={"lazy"}/> */}
                                </div>
                )}

            </div>

                <div className={"flex flex-row items-center justify-between ml-3 mr-3"}>
                <div className={"flex flex-col gap-3 font-light font-sans"}>
                    <div className={"flex flex-col gap-3"}>
                        <h2 className={" m-2 mt-5 text-md font-semibold text-gray-900 dark:text-white"}>{metadata?.name || `${props.contractName} #${props.tokenId}`}</h2>
                    </div>
                    
    
                </div>
            </div>
            

        </>




        <PiSealQuestion aria-label="Learn more" alt="Learn more" className='absolute bottom-1.5 right-1.5 w-50 h-50 m-auto cursor-pointer hover:scale-130 ease-in duration-150' onClick={()=>setDetailed(!detailed)}/>
    </div>

    )
}

export default ImageCard