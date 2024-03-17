/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, EventCard } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = { 
  ...defaultSectionStyles, 
  width: "max-w-screen-xl", 
  textAlign: 'text-center' 
}

export async function ServiceCards({ data, sectionCount }) {
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
    const temp = _.filter(collections[0].items, data => { 
      if (data.fields.active) {
        const currentDate = new Date().setHours(0,0,0,0);
        const startDate = new Date(_.get(data, 'fields.startDate')).setHours(0,0,0,0);
        const endDate = new Date(_.get(data, 'fields.endDate')).setHours(0,0,0,0);

        if (startDate >= currentDate || endDate >= currentDate) {
          return data
        }
      }
    });
    
    subCollection = _.sortBy(temp, [function(o) { return moment(o.fields.startDate); }]);

    if (_.get(fields, 'collectionCountLimit')) {
      subCollection = subCollection.slice(0, _.get(fields, 'collectionCountLimit'))
    }
  }

  return (
    <Section className="relative overlfow-hidden" bg={bg}>
      <Container className="relative z-1" width={width} margin="section">
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
          subCollection.length > 0 ? (
            <Motion className="mx-auto mt-8 grid-cols-1 sm:grid md:grid-cols-2 overflow-hidden">
              {
                subCollection?.map(item => 
                  <MotionVariant variants={fadeInFromBottom} key={item.id}>
                    <EventCard data={item}/>
                  </MotionVariant>
                )
              }
            </Motion>
          )
          :
          (
            <Motion className="p-8 text-center">
              <MotionVariant variants={fadeInFromBottom} className="text-lg text-gray-700 italic">No Upcoming Events</MotionVariant>
            </Motion>
          )
        }

        {
          (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
            <Motion className="mt-10 flex justify-center">
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
      </Container>
    </Section>
  )
}

