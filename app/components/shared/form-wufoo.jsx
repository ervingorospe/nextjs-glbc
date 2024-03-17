'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
// functions
import { splitWuffooForm } from '@/function/embed-codes'

export function FormWufoo({ data, type, className }) {
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
              <div dangerouslySetInnerHTML={{__html: wufooForm.divElement}}/>
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
