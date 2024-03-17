import React from 'react'
// layouts
import { Section, Container } from "@/app/layouts"

export async function DefaultHero({ data }) {
  return (
    <Section className="relative w-full" bg="secondary-700">
      <div className="pattern-secondary absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-950"></div>

      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 fill-current text-secondary-500 opacity-20" viewBox="-100 0 500 114" preserveAspectRatio="none"><path d="M669,0c-369.48,0 -669,50.148 -669,111.998l0,2.002l1338,0l0,-2.002c0,-61.85 -299.52,-111.998 -669,-111.998Z" /></svg>
        <svg className="absolute bottom-0 left-1/4 right-0 fill-current text-secondary-400 opacity-20" viewBox="-100 0 500 114" preserveAspectRatio="none"><path d="M669,0c-369.48,0 -669,50.148 -669,111.998l0,2.002l1338,0l0,-2.002c0,-61.85 -299.52,-111.998 -669,-111.998Z" /></svg>
        <svg className="absolute bottom-0 left-1/2 right-0 fill-current text-secondary-400 opacity-50" viewBox="-100 0 500 114" preserveAspectRatio="none"><path d="M669,0c-369.48,0 -669,50.148 -669,111.998l0,2.002l1338,0l0,-2.002c0,-61.85 -299.52,-111.998 -669,-111.998Z" /></svg>
      </div>

      <Container className="relative" width="max-w-screen-2xl" margin="hero">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-semibold text-white md:text-5xl xl:text-6xl">{data.name}</h1>
        </div>
      </Container>
      
      <div className="relative">
        <svg className="absolute bottom-0 left-0 right-0 h-[12vw] w-full scale-y-flipped transform fill-current text-primary-400" viewBox="0 0 1338 116" preserveAspectRatio="none"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
        <svg className="relative -bottom-px w-full scale-y-flipped transform fill-current text-white" viewBox="0 0 1338 116"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
      </div>
    </Section>
  )
}
