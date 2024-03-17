import _ from 'lodash'
import Script from 'next/script'
// function
import { pageDetails, getGeneralInfo } from '@/function/page'
import { generateStaticRoutes, checkRoute } from '@/function/navigation'
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// component
import * as ComponentSection from '@/components/sections'

export async function generateMetadata({ params }) {
  const general = await getGeneralInfo()
  const path = await checkRoute(`/`)
  const { fields } = path

  const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')
  const description = _.get(fields, 'metaDescription') ? _.get(fields, 'metaDescription') : _.get(general, 'defaultMetaTitle')

  return {
    title: metaTitle,
    description: description,
    openGraph: {
      title: metaTitle,
      description: description,
      images: [`${_.get(fields, 'ogImage.imageUrl')}`],
      url: _.get(general, 'url'),
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: _.get(general, 'url'),
    },
  };
}

export default async function Home({ params }) {
  const pageData = await pageDetails(175386)

  return (
    _.size(pageData.activeSections) > 0 && (
      pageData.activeSections?.map((item, i) => {
        const componentName = sectionsComponent(item)

        if (componentName) {
          const ComponentType = ComponentSection[formatComponentName(componentName)] ? ComponentSection[formatComponentName(componentName)] : null

          if (ComponentType) {
            return <ComponentType 
              data={item} 
              key={item.name} 
              marginTop={`py-24 lg:py-28`} 
              sectionCount={i+1} 
            />
          }
        }
      })
    )
  )
}

export async function generateStaticParams() {
  return await generateStaticRoutes()
}
