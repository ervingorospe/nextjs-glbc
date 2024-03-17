import React from 'react'

export function BgImage({ backgroundImage, className, styles }) {
  return (
    _.get(backgroundImage, 'imageUrl') &&  (
      <div className={className}
        style={{ 
          backgroundImage: `url(${_.get(backgroundImage, 'imageUrl')})`, 
          ...styles
        }}
      />
    )
  )
}