import React from 'react'
import _ from 'lodash'
// function
import { getLocation, getFooterLocationInfo } from '@/function/page'
// components
import { Address, Telephone, Email, Hours } from '@/components/layouts/location-info'
// constant
import { defaultLocationName } from '@/app/constants'

const styles = {
  title: 'font-heading text-2xl font-normal text-primary-200',
  contentText: 'mt-2 text-md text-white',
  link: 'text-white hover:underline',
  buttonStyle: 'button button-sm mt-4 inline-flex border-white bg-secondary-600 text-white hover:bg-white hover:text-primary-700 focus:ring-white focus:ring-offset-primary-600'
}

export async function LocationInfo() {
  const location = await getLocation()
  const locationInfo = await getFooterLocationInfo()
  const defaultLocationInfo = _.find(location[0].items, data => data.name === defaultLocationName)

  return (
    <dl className="mt-8 grid justify-left sm:grid-cols-3 gap-8">
      {
        _.find(locationInfo, data => data.fields.type === 'address') && (
          <Address
            data={_.find(locationInfo, data => data.fields.type === 'address')} 
            location={defaultLocationInfo}
            styles={styles}
          />
        )
      }
      
      {
        (_.find(locationInfo, data => data.fields.type === 'telephone') || _.find(locationInfo, data => data.fields.type === 'email')) && (
          <div className="grid gap-4">
            {
              _.find(locationInfo, data => data.fields.type === 'telephone') && (
                <Telephone
                  data={_.find(locationInfo, data => data.fields.type === 'telephone')} 
                  location={defaultLocationInfo}
                  styles={styles}
                />
              )
            }
            
            {
              _.find(locationInfo, data => data.fields.type === 'email') && (
                <Email
                  data={_.find(locationInfo, data => data.fields.type === 'email')} 
                  location={defaultLocationInfo}
                  styles={styles}
                />
              )
            }
          </div>
        )
      }

      {
        _.find(locationInfo, data => data.fields.type === 'hours') && (
          <Hours
            data={_.find(locationInfo, data => data.fields.type === 'hours')} 
            location={defaultLocationInfo}
            styles={styles}
          />
        )
      }
    </dl>
  )
}