'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
// components
import { Body } from '@/components/shared'
// functions
import { splitWuffooForm } from '@/function/embed-codes'

export function FormWufooApplication({ data, type, className, body }) {
  const { fields } = data

  const [wufooForm, setWufooForm] = useState({})

  useEffect(() => {
    if (fields.embed)
      setWufooForm(splitWuffooForm(fields.embed))
  }, [fields.embed])

  return (
    <div>
      {
        fields.embed && (
          <div className={className}>
            <div className="px-6 pt-6">
              {/* extra body */}
              <div className="prose prose-base mt-1" dangerouslySetInnerHTML={{__html: body}}/>
              <div className="mt-2" dangerouslySetInnerHTML={{__html: wufooForm.divElement}}/>
              <Script
                id="form-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: eval(`${wufooForm.scriptCode}`),
                }}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}
