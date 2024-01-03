"use client"

import ImageCard from '@/components/ImageCard'


function GridGallery({props}){


    return(
        

<div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-10">

    {props && props.length > 0 && props.map((item, index) => ( 
        <ImageCard key={`${index} - ${JSON.stringify(item)}`} props={item} />

    ))}


</div>

    )
    }

export default GridGallery