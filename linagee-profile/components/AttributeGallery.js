"use client"

function AttributeGallery({attributes, address}){


    return(
        

<div  className="grid grid-cols-1 md:grid-cols-1 gap-1 cursor-pointer mb-5 ">
{address && (
    <>
    <h5 className="m-2 mb-0 text-sm text-gray-400 dark:text-gray-400 ">Contract</h5>
    <h5 className="mx-2 mb-0 text-xs text-gray-400 font-bold dark:text-gray-400 ">{address}</h5>
    </>
)}
{attributes && attributes.length > 0 && ( 
    <>
    <h5 className="mx-2 mb-0 text-sm text-gray-400 dark:text-gray-400 ">Attributes</h5>

{attributes.map((item, index) => ( 
    <div key={index} href="#" className="block m-1 mx-2 p-2 max-w-xs  opacity-50 border border-gray-300 rounded-lg shadow dark:bg-black-800 dark:border-gray-700 ">
            <h5 className="text-xs text-gray-300 dark:text-gray-400 truncate">{item.trait_type}</h5>
            <p className="text-sm font-bold tracking-tight text-gray-300 dark:text-white truncate">{item.value}</p>     
    </div>

))}

    </>

)}



</div>

    )
    }

export default AttributeGallery