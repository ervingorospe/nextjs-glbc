'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function AlertMessage() {
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <div className="rounded-md bg-primary-400 p-4 mb-4 relative">
        <div className="flex items-center justify-center">
          <div className="ml-3">
            <h2 className="font-heading font-semibold text-secondary-900 text-xl text-center">Thank you for your purchase</h2>
            <p className="prose text-gray-800 text-center">Need to purchase more shirts? Please select the style, color, and size to order another type of shirt below.</p>
          </div>
          <div className="absolute top-2 right-2">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={() => setShow(false)}
                type="button"
                className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
