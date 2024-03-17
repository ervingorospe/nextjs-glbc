/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import Link from 'next/link'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/app/constants'
// function
import { getSettings, facebookFeed } from '@/function/page'

const defaults = { 
  ...defaultSectionStyles,
  textAlign: 'text-center',
  width: "max-w-screen-xl"
}

export async function SocialmediaFeed({ data, sectionCount }) {
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

  const settings = _.first(await getSettings()) 
  const feedLimit = 3
  let feeds = []

  if (_.get(settings, 'fields.facebookFeedToken')) {
    const temp = await facebookFeed(settings.fields.facebookFeedId, feedLimit, settings.fields.facebookFeedToken)
    feeds = temp.data
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative">
        <div className="grid justify-center mx-auto max-w-3xl text-center lg:max-w-none">
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
            className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
          />

          {/* extra body */}
          <Body
            body={_.get(fields, 'extraBody')}
            size={extraBodySize}
            className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
          />
        </div>
    
        <Feeds feeds={feeds}/>

        {
          (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
            <div className="mt-8 grid justify-center">
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
      </Container>
    </Section>
  )
}

const Feeds = ({ feeds }) => {
  return (
    feeds.length > 0 && (
      <Motion className="mx-auto mt-8 grid max-w-xl gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {
          feeds?.map((feed, i) => {
            const data = _.get(feed, 'attachments.data[0]')

            return (
              <MotionVariant variants={fadeInFromBottom} key={i}>
                <ImageHolder
                  image={{
                    imageUrl: _.get(data, 'media.image.src'),
                    altText: 'Greater Louisiana Baptist Convention'
                  }}
                  className={{
                    figure: "aspect-h-9 aspect-w-16 w-full overflow-hidden rounded-lg",
                    image: "absolute left-0 top-0 h-full w-full object-cover object-center"
                  }}
                />

                <div className="mt-5">
                  <p className="font-heading text-sm italic text-gray-400">{moment(feed.created_time, "YYYYMMDD").fromNow()}</p>

                  <p className="mt-1.5 line-clamp-4 text-sm text-gray-600">{feed.message}</p>
                </div>

                <div className="mt-5">
                  <Link href={feed.permalink_url} target="_blank" className="text-base leading-6 text-secondary-700 hover:underline">View Facebook Post <span aria-hidden="true">→</span></Link>
                </div>
              </MotionVariant>
            )
          })
        }
      </Motion>
    )
  )
}
