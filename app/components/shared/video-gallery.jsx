import React from 'react'
import _ from 'lodash'
// api
import { getItem } from '@/api/item'

export async function VideoGallery({ id, autoPlay = false }) {
  const item = await getItem(id)
  const file = item[0]
  
  return (
    <figure className="relative">
      <div className="w-full">
        <video autoPlay muted loop>
          <source src={_.get(file, 'file.videoUrl')} type="video/mp4"/>
        </video>
      </div>
    </figure>
  )
}
