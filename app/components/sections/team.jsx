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

const defaults = { ...defaultSectionStyles, width: "max-w-screen-lg" }

export async function Team({ data, sectionCount }) {
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

  let subCollections = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollections = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative">
        <Motion>
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
              className={`mt-4 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
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
              className={`mt-2 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
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

          {
            subCollections.length > 0 && (
              <div className="mt-8 grid md:grid-cols-2 gap-8">
                {
                  subCollections?.map(team => (
                    <MotionVariant variants={fadeInFromBottom} key={team.id}>
                      <h2 className="font-heading text-xl text-gray-700 font-bold">{team.name}</h2>
                      <p className="text-base text-gray-500">{_.get(team, 'fields.jobTitle')}</p>
                    </MotionVariant>
                  ))
                }
              </div>
            )
          }
        </Motion>
      </Container>
    </Section>
  )
}
