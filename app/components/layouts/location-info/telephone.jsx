'use client'

import React from 'react'
import Link from 'next/link'

export function Telephone({ data, location, styles }) {
  const formatPhone = _.get(location, 'fields.telephone').replace(/[^A-Z0-9]/gi, '')

  return (
    <div>
      <p className={styles.title}>{data.name}</p>
      <p className={styles.contentText}>
        <Link href={`tel:${formatPhone}`} className={styles.link}>{_.get(location, 'fields.telephone')}</Link>
      </p>
    </div>
  )
}