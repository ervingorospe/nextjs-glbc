/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
// component
import { ImageHolder } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
import { MotionVariant } from '@/app/layouts'

export function ReviewCard({ data }) {
  const { fields } = data

  return (
    <MotionVariant variants={fadeInFromBottom} className="pt-8 sm:inline-block sm:w-full sm:px-4">
      <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6 border">
        <blockquote className="text-gray-700">
          <p>{_.get(fields, 'reviewBody')}</p>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-x-4">
          <ImageHolder
            image={_.get(fields, 'image')} 
            className={{
              figure: "",
              image: "h-12 w-auto rounded-full bg-gray-50"
            }}
          />
          <div>
            <div className="font-semibold text-gray-900">{_.get(data, 'name')}</div>
            <div className="text-gray-600 text-xs">{_.get(fields, 'organization')}</div>
          </div>
        </figcaption>
      </figure>
    </MotionVariant>
  )
}
