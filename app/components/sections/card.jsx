/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromLeft, fadeInFromRight, fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'

const defaults = { ...defaultSectionStyles }

export async function Card({ data, sectionCount }) {
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
      <Container className="relative z-1 py-8" width={width}>
        <div className="relative isolate overflow-hidden bg-secondary-700 px-6 py-16 text-center shadow-2xl rounded-3xl sm:px-16 lg:text-left">
          <div className="pattern-secondary absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500"></div>

          <div className="relative z-1">
            <Motion className="grid justify-left items-center">
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

              {/* body */}
              <MotionVariant variants={fadeInFromBottom}>
                <Body
                  body={_.get(fields, 'body')}
                  size={bodySize}
                  className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
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
        </div>
      </Container>
    </Section>
  )
}
