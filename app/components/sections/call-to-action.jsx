/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
// component
import { ButtonLink } from '@/components/layouts'
import { Body, ImageHolder, Title } from '@/components/shared'
// constants
import { defaultCallToActionStyles } from '@/app/constants'

const defaults = { ...defaultCallToActionStyles }

export function CallToAction({ data = {}, navigation }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : 'h3'
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
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 left-0 right-0 h-3/4 w-full fill-current text-primary-300" viewBox="0 0 1000 500" preserveAspectRatio="none"><path d="M 0 500 L 0 250 Q 500 0 1000 250 L 1000 500 Z" /></svg>
        <svg className="absolute bottom-0 left-0 right-0 h-[12vw] w-full scale-y-flipped transform fill-current text-secondary-900" viewBox="0 0 1338 116" preserveAspectRatio="none"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
        <svg className="absolute bottom-0 left-0 right-0 w-full scale-y-flipped transform fill-current text-secondary-950" viewBox="0 0 1338 116"><path d="M669,4.34c-369.48,0 -669,49.875 -669,111.41l0,-116l1338,0l0,116c0,-61.535 -299.52,-111.41 -669,-111.41Z" /></svg>
      </div>

      <Container width={width} margin="" className="relative z-1 py-8 md:py-12">
        <div className="relative isolate overflow-hidden bg-secondary-700 px-6 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <div className="pattern-secondary absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-900"></div>

          <div className="relative z-1">
            <Title
              title={_.get(fields, 'title')}
              tag={titleTag}
              align={titleAlign}
              style={title.style}
              size={title.size}
              className={`mx-auto max-w-2xl ${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
            />

            <Title
              title={_.get(fields, 'subtitle')}
              tag={subtitleTag}
              align={titleAlign}
              style={subtitle.style}
              size={subtitle.size}
              className={`mt-1 mx-auto max-w-2xl ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
            />

            {/* body */}
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`mt-6 mx-auto max-w-xl leading-8 text-secondary-100 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            />

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {
                    _.get(fields, 'button') && (
                      <ButtonLink
                        data={{
                          button: {
                            ..._.get(fields, 'button'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink')
                        }}
                        className="button inline-flex bg-primary-400 text-secondary-950 hover:bg-primary-300 focus:ring-primary-400"
                        navigation={navigation}
                      />
                    )
                  }

                  {
                    _.get(fields, 'button-2') && (
                      <ButtonLink
                        data={{
                          button: {
                            ..._.get(fields, 'button-2'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink-2')
                        }}
                        className="button inline-flex bg-primary-400 text-secondary-950 hover:bg-primary-300 focus:ring-primary-400"
                        navigation={navigation}
                      />
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </Container>
    </Section>
  )
}
