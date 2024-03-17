'use client'

import React from 'react'
import Image from 'next/image'
import { defaultImageAlt } from '@/app/constants'

export function ImageHolder({ image, className }) {
  if (image) {
    return (
      <figure className={className.figure}>
        <Image
          src={image.imageUrl}
          alt={image.altText ? image.altText : defaultImageAlt}
          priority={true}
          height={500}
          width={500}
          className={className.image}
        />
        {
          image.caption && (
            <figcaption className="mt-2 block text-gray-400 italic">{image.caption}</figcaption>
          )
        }
      </figure>
    )
  }
}