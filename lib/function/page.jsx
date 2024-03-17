import _ from 'lodash'
import { cache } from 'react';
// api
import { getCollection, generalInfo } from '@/api/collection'
import { getItem } from '@/api/item'
import { getFacebookFeed } from '@/api/social-media'

const ids = {
  callToActionSections: 30987,
  footerLocationInfo: 30960,
  socialMedia: 30962,
  location: 30959,
  settings: 175387,
  footerLogos: 30961,
  blogAuthors: 30970
}

const getBlogAuthors = cache(async () => {
  const temp =  await getCollection(`${ids.blogAuthors}`)
  return temp[0].items
})

const getFooterLogos = cache(async () => {
  return await getCollection(`${ids.footerLogos}`)
})

const facebookFeed = cache(async (id, limit, token) => {
  return await getFacebookFeed(id, limit, token)
})

const getLocation = cache(async () => {
  return await getCollection(`${ids.location}`)
})

const getGeneralInfo = cache(async () => {
  return await generalInfo()
})

const getSettings = cache(async () => {
  const items = await getItem(ids.settings)
  return items
})

const pageDetails = cache(async (id) => {
  const collection = await getItem(id)

  const { sectionItems } = _.first(collection)
  const activeSections = _.filter(sectionItems, data => _.get(data, 'fields.active') === '1')

  return {
    activeSections
  }
})

const getCallToAction = cache(async () => {
  const temp = await getCollection(ids.callToActionSections)
  return temp[0].items
})

const getSocialMedia = cache(async () => {
  const temp = await getCollection(ids.socialMedia)
  return temp[0].items
})

const getFooterLocationInfo = cache(async () => {
  const temp = await getCollection(ids.footerLocationInfo)
  return temp[0].items
})

export {
  pageDetails,
  getSettings,
  getCallToAction,
  getSocialMedia,
  getLocation,
  getGeneralInfo,
  getFooterLocationInfo,
  facebookFeed,
  getFooterLogos,
  getBlogAuthors
}