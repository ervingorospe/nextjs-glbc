/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromLeft, fadeInFromRight } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'

const defaults = { 
  ...defaultSectionStyles, 
  title: {
    size: 'default',
    style: 'seo-headline'
  },
  subtitle: {
    size: 'text-xl',
    style: 'subtitle-seo-headline'
  },
}

export async function SeoHeadline({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = {...defaults.title}
  let subtitle ={...defaults.subtitle}

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = {...defaults.subtitle}
    subtitle = {...defaults.title}
  }

  return (
    <Section className="relative" bg={bg}>
      <div className="absolute left-0 right-0 top-0 h-3/5 bg-primary-200">
        <div className="pattern-primary-light absolute inset-0"></div>
        <svg className="absolute -bottom-px left-0 right-0 scale-y-flipped transform fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1328 37">
          <path d="m1265.09,29.67l-5.66-7.3c-4.52-5.83-11.49-9.24-18.86-9.24H88.35c-7.38,0-14.34,3.41-18.86,9.24l-5.66,7.3c-4.52,5.83-11.49,9.24-18.86,9.24H0V0h1328v38h-44.96c-7.38,0-14.34-3.41-18.86-9.24Z" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-70%"></div>
      </div>

      <Container className="relative z-1 py-8" width={width}>
        <div className="relative isolate overflow-hidden bg-secondary-700 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16 lg:text-left">
          <div className="pattern-secondary absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500"></div>

          <div className="relative z-1">
            <Motion className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
              {/* title */}
              <MotionVariant variants={fadeInFromLeft}>
                <Title
                  title={_.get(fields, 'title')}
                  tag={titleTag}
                  align={titleAlign}
                  style={title.style}
                  size={title.size}
                  className={`mx-auto ${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
                />
              </MotionVariant>

              {/* subtitle */}
              <MotionVariant variants={fadeInFromRight}>
                <Title
                  title={_.get(fields, 'subtitle')}
                  tag={subtitleTag}
                  align={titleAlign}
                  style={subtitle.style}
                  size={subtitle.size}
                  className={`mx-auto max-w-xl ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
                />
              </MotionVariant>
            </Motion>
          </div>
        </div>
      </Container>
    </Section>
  )
}
