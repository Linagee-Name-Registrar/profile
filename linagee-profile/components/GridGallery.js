"use client"

import ImageCard from '@/components/ImageCard'
import ImageCardV2 from '@/components/ImageCardV2'


function GridGallery({props}){


    return(
        

<div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-10">

    {props && props.length > 0 && props.map((item, index) => ( 
        <ImageCardV2 key={`${index} - ${item?.tokenId} ${item?.address}`} props={item} />

    ))}


</div>

    )
    }

export default GridGallery