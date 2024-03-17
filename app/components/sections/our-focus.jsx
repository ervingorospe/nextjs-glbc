import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = { 
  ...defaultSectionStyles, 
  title: {
    size: 'default',
    style: 'default-inverted'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'default-subtitle-inverted'
  },
}

export async function OurFocus({ data, sectionCount }) {
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
    <Section className="relative bg-secondary-900">
      <div className="pattern-secondary absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-secondary-900 from-50%"></div>

      <Container width={width} margin="section" className="relative z-1">
        <Motion className="mx-auto mt-5 grid max-w-xl items-center gap-12 md:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-24">
          {
            _.get(fields, 'videoUrl') ? (
              <MotionVariant variants={fadeInFromTop}>
                <figure className={`${defaults.image.rounded}`}>
                  <iframe className="h-full w-full" src={_.get(fields, 'videoUrl')} allowFullScreen/>
                </figure>
              </MotionVariant>
            ):
            (
              fields.image && (
                <MotionVariant variants={fadeInFromBottom}>
                  <ImageHolder
                    image={fields.image} 
                    className={{
                      figure: "",
                      image: `h-full w-full ${defaults.image.rounded}`
                    }}
                  />
                </MotionVariant>
              )
            )
          }

          <div>
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
                className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} prose-secondary-invert mt-6 xl:prose-lg`}
              />
            </MotionVariant>

            {/* extra body */}
            <MotionVariant variants={fadeInFromBottom}>
              <strong>
                <Body
                  body={_.get(fields, 'extraBody')}
                  size={extraBodySize}
                  className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} prose-secondary-invert mt-6 xl:prose-lg`}
                />
              </strong>
            </MotionVariant>

            {
              subCollection.length > 0 && (
                <div className="mt-5 flex max-w-xl flex-col space-y-8 text-base leading-7 text-secondary-200 md:flex-row md:justify-between md:space-x-5 md:space-y-0">
                  {
                    subCollection?.map(item => (
                      <Features data={item} key={item.id}/>
                    ))
                  }
                </div>
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
          </div>
        </Motion>
      </Container>
    </Section>
  )
}


async function Features ({ data }) {
  const { fields } = data

  return (
    <MotionVariant variants={fadeInFromBottom} className="relative pl-10">
      <dt className="inline text-xl font-semibold text-white">
        <Image
          src={_.get(fields, 'icon.imageUrl')}
          alt="Greater Louisina Baptist Convention"
          height={500}
          width={500}
          className="absolute left-1 top-1 h-5 w-5 text-primary-400"
        />
        
        {_.get(data, 'name')}
      </dt>
    </MotionVariant>
  )
}