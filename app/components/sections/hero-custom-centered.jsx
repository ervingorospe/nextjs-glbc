/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, VideoHolder, ImageHolder } from '@/components/shared'
// constants
import { defaultHeroStyles } from '@/app/constants'

const defaults = { 
  ...defaultHeroStyles, 
  textAlign: 'text-center',
  subtitle: {
    size: 'text-2xl',
    style: 'hero-subtitle-custom'
  },
}

export async function HeroCustomCentered({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative w-full" bg={bg}>
      <div className="pattern-secondary absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-950"></div>

      <div className="md:h-20 h-16 lg:h-22 xl:h-24"></div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 fill-current text-secondary-500 opacity-20" viewBox="-100 0 500 114" preserveAspectRatio="none"><path d="M669,0c-369.48,0 -669,50.148 -669,111.998l0,2.002l1338,0l0,-2.002c0,-61.85 -299.52,-111.998 -669,-111.998Z" /></svg>
        <svg className="absolute bottom-0 left-1/4 right-0 fill-current text-secondary-400 opacity-20" viewBox="-100 0 500 114" preserveAspectRatio="none"><path d="M669,0c-369.48,0 -669,50.148 -669,111.998l0,2.002l1338,0l0,-2.002c0,-61.85 -299.52,-111.998 -669,-111.998Z" /></svg>
        <svg className="absolute bottom-0 left-1/2 right-0 fill-current text-secondary-400 opacity-50" viewBox="-100 0 500 114" preserveAspectRatio="none"><path d="M669,0c-369.48,0 -669,50.148 -669,111.998l0,2.002l1338,0l0,-2.002c0,-61.85 -299.52,-111.998 -669,-111.998Z" /></svg>
      </div>

      <Container className="relative" width={width} margin="hero">
        <div className="grid justify-center items-center">
          <div className="">
            {/* title */}
            <Title
              title={_.get(fields, 'title')}
              tag={titleTag}
              align={titleAlign}
              style={title.style}
              size={title.size}
              className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
            />

            {/* subtitle */}
            <Title
              title={_.get(fields, 'subtitle')}
              tag={subtitleTag}
              align={titleAlign}
              style={subtitle.style}
              size={subtitle.size}
              className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
            />

            {/* body */}
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            />

            {/* extra body */}
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`mt-1 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
            />

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-6">
                  {
                    _.get(fields, 'button') && (
                      <Button
                        data={{
                          button: {
                            ..._.get(fields, 'button'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink')
                        }}
                        styles={defaults.buttonStyle}
                        className=""
                      />
                    )
                  }

                  {
                    _.get(fields, 'button-2') && (
                      <Button
                        data={{
                          button: {
                            ..._.get(fields, 'button-2'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink-2')
                        }}
                        styles={defaults.buttonStyle2}
                        className=""
                      />
                    )
                  }
                </div>
              )
            }
          </div>

          {
            _.get(fields, 'video') ? (
              <MotionVariant variants={fadeInFromBottom}>
                <VideoHolder
                  video={_.get(fields, 'video.videoUrl')} 
                  settings={{
                    control: true,
                    autoPlay: false,
                    muted: false,
                    loop: false
                  }}
                  className={{
                    figure: `h-auto overflow-hidden ${defaults.image.rounded}`,
                    video: `w-auto`
                  }}
                />
              </MotionVariant>
            ):
            (
              fields.image && (
                <MotionVariant variants={fadeInFromBottom} className="relative mt-6">
                  <ImageHolder
                    image={fields.image} 
                    className={{
                      figure: "",
                      image: `mx-auto h-auto w-auto ${defaults.image.rounded}`
                    }}
                  />
                </MotionVariant>
              )
            )
          }
        </div>
      </Container>

      <div className="relative">
        <svg className="absolute bottom-0 left-0 right-0 h-[12vw] w-full scale-y-flipped transform fill-current text-primary-400" viewBox="0 0 1338 116" preserveAspectRatio="none"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
        <svg className="relative -bottom-px w-full scale-y-flipped transform fill-current text-white" viewBox="0 0 1338 116"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
      </div>
    </Section>
  )
}
