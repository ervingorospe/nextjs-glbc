/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft, fadeInFromRight } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, ReviewCard } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = { ...defaultSectionStyles }

export async function Reviews({ data, sectionCount }) {
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

  let subCollection = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollection = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container className="relative z-1 mx-auto" width={width} margin="section">
        <Motion className="absolute top-48 h-1/3 -right-64">
          <MotionVariant variants={fadeInFromRight} className="w-full h-full">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 164.25 164.25">
              <g id="Logos">
                <rect className="fill-primary-700" x="21.12" y="21.12" width="122" height="122" rx="10" ry="10" transform="translate(82.12 -34.02) rotate(45)"/>
              </g>
            </svg>
          </MotionVariant>
        </Motion>

        <div className="mx-auto max-w-2xl lg:max-w-full lg:mx-0 z-1 relative">
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
                className={`mt-1 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
              />
            </MotionVariant>
          </Motion>
          
          {
            subCollection.length > 0 && (
              <div className="mx-auto mt-8 flow-root sm:mt-10 lg:mx-0">
                <div className="mb-2">
                  <ReviewCard data={subCollection[0]}/>
                </div>
                      
                <Motion className="sm:columns-2 sm:text-[0] lg:columns-2">
                  {
                    subCollection.slice(1)?.map(item => (
                      <ReviewCard data={item} key={item.id}/>
                    ))
                  }
                </Motion>
              </div>
            )
          }
          
        </div>

        <Motion className="absolute bottom-16 h-1/3 -left-64">
          <MotionVariant variants={fadeInFromLeft} className="h-full w-full">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 164.25 164.25">
              <g id="Logos">
                <rect className="fill-primary-700" x="21.12" y="21.12" width="122" height="122" rx="10" ry="10" transform="translate(82.12 -34.02) rotate(45)"/>
              </g>
            </svg>
          </MotionVariant>
        </Motion>
      </Container>
    </Section>
  )
}


