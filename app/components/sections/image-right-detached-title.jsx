import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft, fadeInFromRight, bgFadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'

const defaults = { ...defaultSectionStyles }

export async function ImageRightDetachedTitle({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-1">
        <Motion>
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
        </Motion>

        <div className="mt-6 grid gap-10 md:mt-8 lg:mt-6 lg:grid-cols-2 xl:gap-x-12">
          {
            fields.image && (
              <Motion>
                <MotionVariant variants={fadeInFromRight} className="relative">
                  <ImageHolder
                    image={fields.image} 
                    className={{
                      figure: "",
                      image: `h-full w-full object-center ${defaults.image.rounded}`
                    }}
                  />
                </MotionVariant>
              </Motion>
            )
          }

          <Motion className="md:row-start-1">
            {/* body */}
            <MotionVariant variants={fadeInFromBottom}>
              <Body
                body={_.get(fields, 'body')}
                size={bodySize}
                className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
              />
            </MotionVariant>

            {/* extra body */}
            <MotionVariant variants={fadeInFromBottom}>
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
              />
            </MotionVariant>

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-6">
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
                </div>
              )
            }
          </Motion>
        </div>
      </Container>

      <Motion className="absolute top-1/2 right-0 h-1/2 w-full">
        <MotionVariant variants={bgFadeInFromLeft}>
          <svg className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 191.78 120.53">
            <g id="Logos">
              <path className="fill-primary-50 pointer-events-none" d="m188.41,19.58l-18.6-16.9c-1.89-1.72-4.36-2.68-6.92-2.68H10.29C4.61,0,0,4.61,0,10.29v83.04c0,2.9,1.22,5.67,3.37,7.62l18.6,16.9c1.89,1.72,4.36,2.68,6.92,2.68h152.59c5.69,0,10.29-4.61,10.29-10.29V27.2c0-2.9-1.22-5.67-3.37-7.62Z"/>
            </g>
          </svg>
        </MotionVariant>
      </Motion>
    </Section>
  )
}
