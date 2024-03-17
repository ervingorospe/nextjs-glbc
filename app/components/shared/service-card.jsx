import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { MotionVariant } from '@/app/layouts'
// function
import { getNavigationDetails } from '@/function/navigation'

export async function ServiceCard({ item }) {
  return (
    <MotionVariant variants={fadeInFromBottom} className="flex flex-col">
      <dt className="text-base font-semibold leading-7 text-gray-900">
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
          <Image
            src={_.get(item, 'fields.icon.imageUrl')}
            alt="Greater Louisiana Baptist Church"
            width={500}
            height={500}
            className="h-6 w-6"
          />
        </div>
        {item.name}
      </dt>
      <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <p className="flex-auto" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.body')}}/>
        <p className="mt-6">
          <Button
            data={{
              icon: _.get(item, 'fields.icon'),
              button: {
                ..._.get(item, 'fields.button'),
              },
              buttonPageLink: _.get(item, 'fields.buttonPageLink')
            }}
            className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-700 group"
          />
        </p>
      </dd>
    </MotionVariant>
  )
}

async function Button({ data, className }) {
  if (data.button) {
    const navigation = await getNavigationDetails()
    
    let buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(data, 'button.url') ? _.get(data, 'button.url') : '/'
    }
  
    if (data.buttonPageLink) {
      const url = _.find(navigation, path => path.id === data.buttonPageLink)

      buttonDetails = {
        ..._.get(data, 'button'),
        url: _.get(url, 'slug') ? _.get(url, 'slug') : '/'
      }
    }

    return (
      <Link className={className} href={buttonDetails.url} target={buttonDetails.target}>{buttonDetails.text} <span className="transition-transform duration-500 group-hover:ml-1"aria-hidden="true">→</span></Link>
    )
  }
}
