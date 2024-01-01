"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import GridGallery from '@/components/GridGallery'
import { useRouter } from 'next/router'
import { useLnrGetAddress } from "@linagee/lnr-ethers-react";
import {fetchNFTs} from '@/utils/promiseAllNfts'

export default function Me({ params }) {
  const [nfts, setNfts] = useState([])
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  var name = params.me;
  if (!name.endsWith('.og')) {
    name += '.og';
  }
  const { address, error, hasError, loading } = useLnrGetAddress(name);

  const callNFTs = async () => {
    if (address) {
      const nftsReturned = await fetchNFTs(address, page);
      console.log("detailed", nftsReturned)
      if (nftsReturned && nftsReturned.length > 0) {
        setNfts(prevNfts => [...prevNfts, ...nftsReturned])
      }
      setLoadingMore(false)
    }
  };

  useEffect(() => {
    callNFTs();
  }, [address, page]);

  const handleLoadMore = () => {
    setLoadingMore(true)
    setPage(prevPage => prevPage + 1)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 pt-5">
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.svg" alt="Linagee Logo" width={100} height={100} />
        <h1 className="text-6xl font-bold text-center text-gray-900 dark:text-white">{name}</h1>
        <p className="mt-3 text-center text-gray-500 dark:text-gray-400 mb-5">{address}</p>
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
