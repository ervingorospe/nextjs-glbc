/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, VideoHolder, ImageHolder } from '@/components/shared'
// constants
import { defaultHeroStyles } from '@/app/constants'

const defaults = { 
  ...defaultHeroStyles, 
  textAlign: 'text-center',
  bgColor: 'black',  
  title: {
    size: 'hero-title',
    style: 'call-to-action'
  }
}

export async function HeroCenteredBackgroundVideo({ data, sectionCount }) {
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
    <Section className="relative overflow-hidden" bg={bg}>
      {
        _.get(fields, 'backgroundVideo') && (
          <div className="absolute inset-0">
            <video playsInline autoPlay muted loop className="w-full h-full object-cover object-center">
              <source src={_.get(fields, 'backgroundVideo.videoUrl')} type="video/mp4"/>
            </video>
          </div>
        )
      }
      

      <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
      <div className="md:h-24 h-20 lg:h-28 xl:h-48"></div>

      <Container className="pt-48 relative z-1 md:pt-52 lg:pt-52 xl:pt-52">
        <Motion className="mx-auto max-w-screen-xl lg:mt-8">
          {/* title */}
          <MotionVariant variants={fadeInFromLeft}>
            <Title
              title={_.get(fields, 'title')}
              tag={titleTag}
              align={titleAlign}
              style={title.style}
              size={title.size}
              className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
            />
          </MotionVariant>
          
          {/* subtitle */}
          <MotionVariant variants={fadeInFromLeft}>
            <Title
              title={_.get(fields, 'subtitle')}
              tag={subtitleTag}
              align={titleAlign}
              style={subtitle.style}
              size={subtitle.size}
              className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
            />
          </MotionVariant>

          {/* body */}
          <MotionVariant variants={fadeInFromBottom}>
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`mt-6 mx-auto text-center ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            />
          </MotionVariant>

          {/* extra body */}
          <MotionVariant variants={fadeInFromBottom}>
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`mt-1 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
            />
          </MotionVariant>

          {
            (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
              <Motion className="mt-8 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4 justify-center">
                {
                  _.get(fields, 'button') && (
                    <MotionVariant variants={fadeInFromBottom}>
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
                    </MotionVariant>
                  )
                }

                {
                  _.get(fields, 'button-2') && (
                    <MotionVariant variants={fadeInFromBottom}>
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
                    </MotionVariant>
                  )
                }
              </Motion>
            )
          }
        </Motion>
      </Container>

      <div className="relative">
        <svg className="absolute bottom-0 left-0 right-0 h-[12vw] w-full scale-y-flipped transform fill-current text-primary-400" viewBox="0 0 1338 116" preserveAspectRatio="none"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
        <svg className="relative -bottom-px w-full scale-y-flipped transform fill-current text-white" viewBox="0 0 1338 116"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
      </div>
    </Section>
  )
}
