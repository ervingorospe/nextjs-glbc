'use client'

import React from 'react'
import Link from 'next/link'

export function EmailSignup({ data, settings }) {
  const { fields } = data

  return (
    <section className="relative bg-secondary-950">
      <div className="container relative z-1 max-w-screen-xl py-8 text-left">
        <div className="rounded-2xl border-2 border-primary-400 bg-secondary-900 px-6 py-6 md:px-12 md:py-12 lg:px-16 lg:py-16 xl:flex xl:items-center">
          <div className="xl:-mt-2 xl:w-0 xl:flex-1">
            {/* title */}
            <h2 className="font-heading text-2xl font-semibold text-white md:text-4xl">{fields.title}</h2>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form name="form1294" className="wufoo sm:flex" acceptCharset="UTF-8" autoComplete="off" encType="multipart/form-data" method="post" action={_.get(settings, 'fields.wufooEmailSignupFormUrl')}>
              <label htmlFor="emailAddress" className="sr-only">Email address</label>
              <input id="Field6" name="Field6" spellCheck="false" type="email" autoComplete="email" maxLength="255" required="" className="w-full rounded border-gray-400 px-5 py-2.5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700" placeholder="Enter your email" />
              <button id="saveForm" name="saveForm" type="submit" className="button mt-3 flex w-full bg-primary-400 text-secondary-950 hover:bg-primary-300 focus:ring-white focus:ring-offset-primary-400 sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0">Subscribe</button>

              <div className="hidden">
                <label htmlFor="comment">Do Not Fill This Out</label>
                <textarea name="comment" id="comment" rows="1" cols="1"></textarea>
                <input type="hidden" id="idstamp" name="idstamp" value={_.get(settings, 'fields.wufooEmailSignupFormPassword')} />
                <input type="hidden" id="encryptedPassword" name="encryptedPassword" value="" />
              </div>
            </form>

            <p className="mt-3 text-center text-sm text-secondary-200">
              We care about protecting your data. Read our
              <Link href="/privacy-policy" target="_blank" className="font-bold text-white hover:underline"> Privacy Policy. </Link>
            </p>
          </div>
        </div>
      </div>
      
    </section>
  )
}
