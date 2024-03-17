'use client'

import React from 'react'
import clsx from 'clsx'

const background = {
  'default': '',
  'transparent': 'bg-transparent',
  'gray-700': 'bg-gray-700',
  'primary-100': 'bg-primary-100',
  'primary-200': 'bg-primary-200',
  'primary-300': 'bg-primary-300',
  'primary-400': 'bg-primary-400',
  'primary-500': 'bg-primary-500',
  'primary-600': 'bg-primary-600',
  'primary-700': 'bg-primary-700',
  'primary-800': 'bg-primary-800',
  'primary-900': 'bg-primary-900',
  'secondary-100': 'bg-secondary-100',
  'secondary-200': 'bg-secondary-200',
  'secondary-300': 'bg-secondary-300',
  'secondary-400': 'bg-secondary-400',
  'secondary-500': 'bg-secondary-500',
  'secondary-600': 'bg-secondary-600',
  'secondary-700': 'bg-secondary-700',
  'secondary-800': 'bg-secondary-800',
  'secondary-900': 'bg-secondary-900',
  'white': 'bg-white',
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
  'gray-200': 'bg-gray-200',
  'gray-300': 'bg-gray-300',
  'gray-400': 'bg-gray-400',
  'gray-500': 'bg-gray-500',
  'gray-600': 'bg-gray-600',
  'gray-700': 'bg-gray-700',
  'gray-800': 'bg-gray-800',
  'gray-900': 'bg-gray-900',
  'black': 'bg-black',
}

export function Section({ bg = 'default', className, ...props }) {
  return <section className={clsx(background[bg], className)} {...props} />
}
