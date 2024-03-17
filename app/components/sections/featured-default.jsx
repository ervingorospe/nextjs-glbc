import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = { 
  ...defaultSectionStyles, 
  textAlign: "text-center lg:text-left",
  buttonStyle: "button-secondary-outlined",
  buttonStyle2: "button-secondary-outlined"
}

export async function FeaturedDefault({ data, sectionCount }) {
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

  let subCollection = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollection = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <Section className="relative" bg={bg}>
      <div className="absolute left-0 top-0 right-0 -bottom-px">
        <svg className="absolute bottom-0 left-0 right-0 h-3/4 w-full fill-current text-primary-500" viewBox="0 0 1000 500" preserveAspectRatio="none"><path d="M 0 500 L 0 250 Q 500 0 1000 250 L 1000 500 Z" /></svg>
        <svg className="absolute bottom-0 left-0 right-0 h-[12vw] w-full scale-y-flipped transform fill-current text-secondary-700" viewBox="0 0 1338 116" preserveAspectRatio="none"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
        <svg className="absolute bottom-0 left-0 right-0 w-full scale-y-flipped transform fill-current text-secondary-900" viewBox="0 0 1338 116"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
      </div>

      <Container width={width} margin="section" className="relative z-1">
        <div className="relative isolate overflow-hidden bg-primary-400 p-6 rounded-2xl md:p-8 lg:p-12 xl:p-16 2xl:p-24">
          <div className="absolute inset-0">
            <div className="pattern-primary absolute inset-0"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400"></div>
          </div>

          <Motion className="relative z-1 mx-auto max-w-screen-xl">
            {/* title */}
            <MotionVariant variants={fadeInFromTop}>
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
            <MotionVariant variants={fadeInFromTop}>
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
              subCollection.length > 0 && (
                <Motion className="mt-8">
                  <ul className="grid list-disc gap-6 pl-8 text-base md:text-lg">
                    {
                      subCollection?.map(list => (
                        <li key={list.id}>
                          <MotionVariant variants={fadeInFromBottom}>
                            <strong>{list.name} </strong>
                            <span className="text-gray-700">{_.get(list, 'fields.body')}</span>
                          </MotionVariant>
                        </li>
                      ))
                    }
                  </ul>
                </Motion>
              )
            }
            
            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-6 flex space-x-3">
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
    </Section>
  )
}

