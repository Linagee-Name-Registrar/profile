"use client"

import ImageCard from '@/components/ImageCard'


function GridGallery({props}){


    return(
        

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

    {props && props.length > 0 && props.map((item, index) => ( 
        <ImageCard key={`${index} - ${JSON.stringify(item)}`} props={item} />

    ))}

    {(!props || props.length == 0) && (
        <h3>Loading ...</h3>
    )}

</div>

    )
    }

export default GridGallery