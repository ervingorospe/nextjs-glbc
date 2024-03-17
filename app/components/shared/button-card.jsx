import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
import Image from 'next/image'
// function
import { getNavigationDetails } from '@/function/navigation'
// component
import { ImageHolder } from '@/components/shared'

export async function ButtonCard({ data }) {
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
        url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
      }
    }

    return (
      <Link href={buttonDetails.url} target={buttonDetails.target} className="cursor-pointer relative overflow-hidden aspect-h-1 aspect-w-1 group w-full rounded-lg">
        <div className="overlay z-1 absolute inset-0 bg-gradient-to-t from-black to-transparent"/>
        <ImageHolder
          image={_.get(data, 'fields.backgroundImage')}
          className={{
            figure: "z-0",
            image: "group-hover:scale-125 h-full w-full object-cover object-center transition ease-in-out duration-500"
          }}
        />
        
        <div className="z-10 overlay absolute inset-0 flex items-end">
          <div className="grid p-4 lg:h-5/6 xl:h-3/5">
            <div className="flex space-x-2 items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
                <Image
                  src={_.get(data, 'fields.icon.imageUrl')}
                  alt="HJC Consultine"
                  width={500}
                  height={500}
                  className="h-6 w-6"
                />
              </div>
              <p className="text-xl font-heading text-white font-semibold">{_.get(data, 'name')}</p>
            </div>
            <p className="text-gray-300 mt-4 text-sm" dangerouslySetInnerHTML={{__html: _.get(data, 'fields.body')}}/>
            <div className="text-primary-200 text-sm mt-4">
              {buttonDetails.text} <span className="transition-transform duration-500 group-hover:ml-1"aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}