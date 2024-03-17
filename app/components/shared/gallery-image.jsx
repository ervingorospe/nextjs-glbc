'use client'

import React from 'react'
import Image from 'next/image'

export function GalleryImage({ data, styles, openModal, index }) {
  return (
    <div 
      className={`${styles.container} group cursor-pointer overflow-hidden`}
      onClick={() => openModal(index)}
    >
      <div className="z-1 absolute inset-0 bg-black opacity-0 group-hover:opacity-50 ease-in-out duration-300"></div>
      <Image
        src={_.get(data, 'file.imageUrl')}
        alt={_.get(data, 'fields.altText')}
        height={500}
        width={500}
        priority={true}
        className={`${styles.image} transform transition duration-500 ease-in-out group-hover:scale-110 aspect-wider`}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
    </div>
  )
}
