"use client"

import Image from 'next/image'
import GridGallery from '@/components/GridGallery'
import { useRouter } from 'next/router'

export default function Home() {


  const props = {address: undefined, tokenId: undefined, tokenUri: undefined}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 pt-5">
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.svg" alt="Linagee Logo" width={100} height={100} />
        <h1 className="text-6xl font-bold text-center text-gray-900 dark:text-white">Linagee</h1>
        <p className="mt-3 text-center text-gray-500 dark:text-gray-400 mb-5">A place for Linagee NFTs</p>
      </div>

      
    </main>
  )
}
