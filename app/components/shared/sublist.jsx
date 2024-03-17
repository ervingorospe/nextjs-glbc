import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { MotionVariant } from '@/app/layouts'
// api
import { getCollection } from '@/api/collection'

export async function Sublist({ data, className, containerClass }) {
  const { fields } = data
  const collections = await getCollection(_.get(fields, 'contentCollection'))
  const subCollections = _.filter(collections[0].items, data => data.fields.active)

  return (
    <div className={containerClass}>
      <p className="font-heading text-2xl font-bold text-gray-900">{data.name}</p>
      {
        subCollections.length > 0 && (
          <div className={className}>
            {
              subCollections?.map(item => (
                <div key={item.id}>
                  <p className="text-lg uppercase font-medium tracking-wide text-secondary-700">{item.name}</p>
                  <p className="prose text-gray-700" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.body')}}></p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
