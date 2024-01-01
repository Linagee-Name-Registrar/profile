"use client"


function AttributeGallery({attributes}){


    return(
        

<div className="grid grid-cols-2 md:grid-cols-2 gap-1">

    {attributes && attributes.length > 0 && attributes.map((item, index) => ( 
        <div key={index} href="#" className="block max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

        <h5 className="text-xs text-gray-700 dark:text-gray-400 truncate">{item.trait_type}</h5>
        <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-white truncate">{item.value}</p>
        </div>

    ))}


</div>

    )
    }

export default AttributeGallery