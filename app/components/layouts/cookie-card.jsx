'use client'

import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

export function CookieCard () {
  const [showCookie, setShowCookie] = useState(true)

  useEffect(() => {
    setShowCookie(Cookies.get('wpcc') !== 'dismissed')
  }, [])
  
  const hideCookie = () => {
    Cookies.set('wpcc', 'dismissed', { expires: 0.3 })
    setShowCookie(false)
  }

  return (
    <>
      {
        showCookie && (
          <Transition
            as={Fragment}  
            appear={showCookie} 
            show={showCookie}
            enter="transition-all ease-in duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-out duration-200 "
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-white border font-medium sm:rounded-md fixed z-50 bottom-0 sm:left-5 sm:bottom-5 p-7">
              <div className="max-w-[280px]">
                <span className="">This website uses cookies to ensure you get the best experience on our website. </span>
                <a className="underline text-sm md:text-base inline-flex items-center justify-center group text-red-700 hover:text-red-800" href="/cookie-policy" rel="noreferrer" target="_blank"> View Cookie Policy</a>
                <button onClick={() => hideCookie()} className="mt-4 button inline-flex w-full bg-primary-400 text-secondary-950 hover:bg-primary-300 focus:ring-primary-400">
                  Got it!
                </button>
              </div>
            </div>
          </Transition>
        )
      }
    </>
  )
}