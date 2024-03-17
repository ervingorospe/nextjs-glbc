import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder, FormWufoo } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = { ...defaultSectionStyles }

export async function FormRightCollection({ data, sectionCount }) {
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
      <Container width={width} margin="section" className="relative z-1">
        <Motion className="mx-auto grid max-w-xl items-top gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div className="md:row-start-1">
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

            <ShoppingCard subCollection={subCollection}/>

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

          <div>
            <FormWufoo data={data} className="lg:max-h-[1200px] relative mx-auto w-full bg-white border rounded-lg"/>
          </div>
        </Motion>
      </Container>
    </Section>
  )
}

const ShoppingCard = ({ subCollection }) => {
  if (subCollection.length > 0 && subCollection)
    return (
      <div className="grid gap-8 lg:mt-8">
        {
          subCollection?.map(item => (
            <MotionVariant variants={fadeInFromBottom} className="grid lg:grid-cols-2 xl:grid-cols-12 gap-4 p-6" key={item.id}>
              <div className="h-full w-full xl:col-span-4">
                <ImageHolder
                  image={_.get(item, 'fields.image')}
                  className={{
                    figure: 'overflow-hidden',
                    image: '',
                  }}
                />
              </div>
              <div className="h-full w-full xl:col-span-8">
                <p className="text-2xl font-heading font-semibold text-gray-900">{_.get(item, 'name')}</p>
                <p className="mt-1 font-semibold uppercase text-xl text-gray-600">{_.get(item, 'fields.subtitle')}</p>
                <p className="prose max-w-full" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.description')}}/>
              </div>
            </MotionVariant>
          ))
        }
      </div>
    )
}
