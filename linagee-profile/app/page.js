"use client"

import Image from 'next/image'


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 py-0">
      <div className="flex flex-col items-center justify-center mt-[10rem]">
        <Image src="/logo.svg" alt="Linagee Logo" width={100} height={100} />
        {/* <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white sm:text-4xl md:text-4xl">Linagee</h1> */}
        <p className="mt-3 text-2xl text-center font-light  text-gray-900 dark:text-white mb-5">A <span className="font-bold">decentralized</span> way to view your nfts</p>
      </div>

      
    </main>
  )
}
