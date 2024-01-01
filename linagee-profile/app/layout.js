"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "next-themes"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LnrConfigProvider } from '@linagee/lnr-ethers-react';
import { ethers } from 'ethers';


const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }) {

  const infuraUrl = `https://mainnet.infura.io/v3/5b26585dfc17437da190dd2117648295`;
  const config = {
    provider: new ethers.providers.JsonRpcProvider(infuraUrl)
};



  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${inter.className} flex flex-col min-h-screen mb-20 sm:mb-0`}>
        <LnrConfigProvider config={config}>
          <ThemeProvider attribute="class">
              <Navbar />
              {children}
              <Footer />
          </ThemeProvider>
        </LnrConfigProvider >
      </body>
      
    </html>
  )
}
