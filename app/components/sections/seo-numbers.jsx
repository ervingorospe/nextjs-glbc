/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = { ...defaultSectionStyles }

export async function SeoNumbers({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      <Container className="relative z-1 mx-auto" width={width} margin="section">
        <div className="mx-auto max-w-2xl lg:max-w-full lg:mx-0 grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          <Motion className="z-1">
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

            {
              subCollection.length > 0 && (
                <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
                  {
                    subCollection?.map(item => (
                      <MotionVariant variants={fadeInFromBottom} className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6" key={item.id}>
                        <dt className="text-sm leading-6 text-gray-600">{_.get(item, 'fields.name')}</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-secondary-600">
                          {_.get(item, 'fields.prefix') ?? _.get(item, 'fields.prefix')}{_.get(item, 'fields.number') ?? _.get(item, 'fields.number')}{_.get(item, 'fields.suffix') ?? _.get(item, 'fields.suffix')}
                        </dd>
                      </MotionVariant>
                    ))
                  }
                </dl>
              )
            }
          </Motion>
          
          <Motion className="relative">
            <MotionVariant className="z-1 relative" variants={fadeInFromBottom}>
              <ImageHolder
                image={fields.image} 
                className={{
                  figure: "",
                  image: "shadow-lg rounded-2xl"
                }}
              />
            </MotionVariant>

            <div className="hidden lg:flex absolute pattern-primary rounded-3xl w-full -bottom-14 -top-14 -right-14"/>
            <div className="hidden lg:flex absolute bg-primary-700 opacity-70 rounded-3xl w-full -bottom-14 -top-14 -right-14"></div>
          </Motion>
        </div>
      </Container>
    </Section>
  )
}


