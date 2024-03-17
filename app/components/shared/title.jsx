'use client'

import React from 'react'
import clsx from 'clsx'
// component
import * as TitleComponent from '@/components/shared/title-tags'
// function
import { formatComponentName } from '@/function/formatting'

const titleAlign = {
  'default': '',
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right',
  'text-justify': 'text-justify'
}

const titleSizes = {
  'default': 'text-2xl md:text-5xl',
  'default-subtitle': 'text-base md:text-lg',
  'default-inverted': 'text-3xl md:text-6xl',
  'default-subtitle-inverted': 'text-xl md:text-2xl',
  'hero-title': 'text-4xl md:text-5xl xl:text-6xl',
  'hero-consultation': 'ext-4xl md:text-5xl',
  'hero-subtitle': 'text-xl md:text-2xl xl:text-4xl',
  'call-to-action': 'text-3xl md:text-4xl',
  'call-to-action-subtitle': 'text-xl md:text-2xl',
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-base': 'text-base md:text-lg',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl',
  'feed-inverted': 'text-3xl md:text-4xl'
}

const titleStyle = {
  'default': 'font-heading font-semibold text-gray-900',
  'default-subtitle': 'font-normal uppercase tracking-wide text-secondary-800',
  'default-inverted': 'font-heading font-semibold text-white',
  'default-subtitle-inverted': 'font-normal uppercase tracking-wide text-white',
  'hero-title': 'font-heading font-semibold text-white',
  'hero-subtitle': 'font-semibold uppercase text-primary-500',
  'call-to-action-subtitle': 'font-normal uppercase tracking-wide text-primary-300',
  'call-to-action': 'font-heading font-bold text-white',
  'seo-headline': 'font-heading font-bold text-white',
  'subtitle-seo-headline': 'leading-8 text-white',
  'hero-subtitle-custom': 'font-normal text-white',
  'subtitle-custom': 'font-normal text-secondary-800'
}

export function Title({ title, tag = "default", align = "default", style = "default", size = "default", className }) {
  if (title) {
    const TitleType = TitleComponent[formatComponentName(tag)];

    return (
      <div>
        <TitleType title={title} styles={clsx(titleStyle[style], titleSizes[size], titleAlign[align], className)}/>
      </div>
    )
  }
}
