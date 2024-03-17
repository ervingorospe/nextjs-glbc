import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
import clsx from 'clsx'
// components
import { ImageHolder } from '@/components/shared'
// function
import { getNavigationDetails } from '@/function/navigation'

export async function Card({ data }) {
  const { fields } = data

  return (
    <div className="flex flex-col border-2 border-secondary-300 rounded p-4">
      <dt className="text-xl font-semibold leading-7 text-gray-900">
        <ImageHolder 
          image={_.get(fields, 'image')} 
          className={{
            figure: "mb-6 flex h-12 w-12 items-center justify-center rounded bg-primary-600",
            image: "h-7 w-7"
          }}
        />

        { _.get(data, 'name') }
      </dt>
      <dd className="mt-3 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <p className="flex-auto">{_.get(fields, 'body')}</p>
        <p className="mt-6">
          <Button
            data={{
              button: {
                ..._.get(fields, 'button'),
              },
              buttonPageLink: _.get(fields, 'buttonPageLink')
            }}
            className="text-base font-semibold leading-6 text-primary-600 hover:text-black"
          />
        </p>
      </dd>
    </div>
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
      <Link className={clsx(className)} href={buttonDetails.url} target={buttonDetails.target}>{buttonDetails.text} <span aria-hidden="true">→</span></Link>
    )
  }
}
