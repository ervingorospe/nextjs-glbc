import React from 'react'
import _ from 'lodash'
// function
import { getCallToAction, getSettings, getSocialMedia, getLocation, getFooterLocationInfo, getGeneralInfo, getFooterLogos } from '@/function/page'
import { getNavigationDetails } from '@/function/navigation'
// component
import { CallToAction, FooterContent } from '@/components/layouts'

export async function Footer() {
  const collection = await getCallToAction()
  const navigation = await getNavigationDetails()
  const socialMedia = await getSocialMedia()
  const settings = _.first(await getSettings())
  const location = await getLocation()
  const locationInfo = await getFooterLocationInfo()
  const general = await getGeneralInfo()
  const footerLogos = await getFooterLogos()

  return (
    <section className="overflow-hidden relative">
      <CallToAction collection={collection} navigation={navigation} settings={settings}/>
      <FooterContent 
        navigation={navigation} 
        socialMedia={_.filter(socialMedia, res => res.fields.active)} 
        location={_.filter(location[0].items, res => res.fields.active)}
        locationInfo={_.filter(locationInfo, res => res.fields.active)}
        general={general}
        logos={_.filter(footerLogos[0].items, res => res.fields.active)}
      />
    </section>
  )
}
