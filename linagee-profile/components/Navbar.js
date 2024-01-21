"use client"

import React from 'react';
import ThemeButton from '@/components/ThemeButton';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 px-4 py-2 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <a  className="flex items-center">
          <img src="/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Linagee</span>
        </a>
        <div className="flex items-center">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
            </div>
            <input
              type="text"
              className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Search..."
            />
          </div>
          {/* ThemeButton */}
          <div className="ml-4">
            <ThemeButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
