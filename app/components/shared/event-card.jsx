/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import _ from 'lodash'
import moment from 'moment'
// components
import { ImageHolder } from '@/components/shared'

export async function EventCard({ data }) {
  const { fields } = data

  return (
    <div className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
      <ImageHolder
        image={fields.image} 
        className={{
          figure: "aspect-h-9 aspect-w-16 w-full overflow-hidden rounded-t-lg",
          image: "absolute left-0 top-0 h-full w-full object-cover object-center"
        }}
      />
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 text-gray-900">
          {_.get(data, 'name')}
        </h5>
        {
          (_.get(fields, 'startDate') || _.get(fields, 'endDate')) && (
            <p className="text-secondary-700 mt-2">
              { _.get(fields, 'startDate') ? moment(_.get(fields, 'startDate')).format('LL') : ''} { _.get(fields, 'startDate') && _.get(fields, 'endDate') ? ' - ' : '' } { _.get(fields, 'endDate') ? moment(_.get(fields, 'endDate')).format('LL')  : ''}</p>
          )
        }
        
        {
          _.get(fields, 'description') && (
            <p className="mt-2 text-base text-gray-600" dangerouslySetInnerHTML={{__html: _.get(fields, 'description')}}/>
          )
        }

        {
          _.get(fields, 'flyer') && (
            <Link className="mt-4 button button-xs inline-flex bg-primary-400 text-secondary-950 hover:bg-primary-300 focus:ring-primary-400" href={_.get(fields, 'flyer.viewUrl')} target="_blank">
              View Flyer
            </Link>
          )
        }
      </div>
    </div>
  )
}