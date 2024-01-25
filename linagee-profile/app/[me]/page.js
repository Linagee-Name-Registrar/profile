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
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [address, setAddress] = useState()
  const [name, setName] = useState()




  const callNFTs = async () => {
    if (params.me) {
      const a = await resolveOrReturn(params.me)
      if(a !== false){
        if((params.me).length < 44 && !(params.me).includes("0x") && !(params.me).endsWith(".og")){
          setName(params.me + ".og")
        }
        if((params.me).length < 44 && !(params.me).includes("0x") && (params.me).endsWith(".og")){
          setName(params.me)
        }
        setAddress(a)
      const nftsReturned = await fetchNFTs(a, page);
      // console.log("detailed", nftsReturned)
      if (nftsReturned && nftsReturned.length > 0) {
        var n = [...nfts, ...nftsReturned]
        setNfts(removeDuplicates(n))
      }
      setLoadingMore(false)
    }
  }
  };

  useEffect(() => {
    setNfts([])
    callNFTs();
  }, [name, page]);

  const handleLoadMore = () => {
    setLoadingMore(true)
    setPage(prevPage => prevPage + 1)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 pt-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl  text-center text-gray-700 dark:text-white">{name}</h1>
        <p className="mt-3 text-center text-gray-600 text-sm dark:text-gray-400 mb-5">{address}</p>
      </div>

      <GridGallery props={nfts} />

      {/* {loadingMore ? (
        <p>Loading more...</p>
      ) : (
        <button onClick={handleLoadMore}>Load More</button>
      )} */}
    </main>
  )
}
