'use client'

import React from 'react'

export function VideoHolder({ video, className, settings }) {
  return (
    <figure className={className.figure}>
      <div className={className.video}>
        <video controls={settings.control} playsInline autoPlay={settings.autoPlay} muted={settings.muted} loop={settings.loop}>
          <source src={video} type="video/mp4"/>
        </video>
      </div>
    </figure>
  )
}