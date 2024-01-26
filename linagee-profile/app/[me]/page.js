"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import GridGallery from '@/components/GridGallery'
import { useRouter } from 'next/router'
import { useLnrGetAddress } from "@linagee/lnr-ethers-react";
import {fetchNFTs} from '@/utils/promiseAllNfts'
import { resolveOrReturn } from '@/utils/promiseAllGraph';
import { removeDuplicates } from '@/utils/utils';

export default function Me({ params }) {
  const [nfts, setNfts] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [address, setAddress] = useState()
  const [name, setName] = useState()
  const [batch, setBatch] = useState(1)
  const [subPage, setSubPage] = useState(1)
  const [disabled, setDisabled] = useState(false)




  const callNFTs = async (page) => {
    console.log("calling page ", page)
    if (params.me) {
      if(params.me !== (name || address)){
        setNfts([])
        var a = await resolveOrReturn(params.me)
        if(a !== false){
          if((params.me).length < 44 && !(params.me).includes("0x") && !(params.me).endsWith(".og")){
            setName(params.me + ".og")
          }
          if((params.me).length < 44 && !(params.me).includes("0x") && (params.me).endsWith(".og")){
            setName(params.me)
          }
          setAddress(a)
      }
      var nftsReturned = await fetchNFTs(a, page);
      console.log("detailed", nftsReturned)
      if (nftsReturned && nftsReturned.length > 0) {
        var n = [...nfts, ...nftsReturned]
        setNfts(removeDuplicates(n))
      } else if (nftsReturned && nftsReturned.length === 0) {
        setLoadingMore(false)
        setDisabled(true)
      }
      setLoadingMore(false)
    }
  }
  };

  useEffect(() => {
    setNfts([])
    callNFTs(batch);
  }, [name]);


  const softLoadMore = () => {

    setLoadingMore(true)
    setSubPage(subPage + 1)
    if ((subPage * 12) >= nfts.length){
      setBatch(batch + 1)
      callNFTs(batch + 1)
      console.log("checking more")
    }
    else if ((subPage * 12) < nfts.length){
      setLoadingMore(false)
      setDisabled(true)
      console.log("no more")
    }
    setLoadingMore(false)
    console.log(subPage, nfts.slice(0, subPage * 12).length, nfts.length)
  }



  

  



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 pt-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-light text-center text-gray-700 dark:text-white sm:text-4xl md:text-5xl">{name}</h1>
        <p className="mt-3 text-center text-gray-600 text-sm dark:text-gray-400 mb-5 sm:text-xs ">{address}</p>
      </div>

      <GridGallery props={nfts.slice(0, subPage * 12)} />


        <button disabled={disabled} className={`  border-thin p-2 rounded-md text-sm font-semithin opacity-80 border border-gray-700 text-gray-700 dark:border-white dark:text-white w-auto h-auto ${loadingMore? "animate-pulse" : ""} ${!disabled ? "ease-in duration-200 hover:scale-110  cursor-pointer": "opacity-20"}`} onClick={softLoadMore}>
          {loadingMore ?(
            "Loading..."
          ) : (
            "Load More"
          )}
        </button>
     
    </main>
  )
}
