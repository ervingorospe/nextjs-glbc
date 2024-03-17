import { cache } from 'react';
import _ from 'lodash'
// function
import { formatRouteName } from './formatting'
// api
import { getCollection } from '@/api/collection'
import { getItem } from '@/api/item'

const ids = {
  navigation: 30988,
  actionButtons: 30964,
  freeStandingPages: 30990,
  blogs: 30971
}

const getStandingPages = cache(async () => {
  const collections = await getCollection(ids.freeStandingPages)
  return collections[0].items
})

const getNavigation = cache(async () => {
  const collections = await getCollection(ids.navigation)
  return collections[0].items
})

const generateStaticRoutes = cache(async () => {
  const navigations = await getNavigation()
  const standingPages = await getStandingPages()

  const standingPagesPaths = standingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      slug: [`${slug}`]
    }
  })

  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          slug: [`${mainParentRoute}`,`${parentRoute}`,`${formatRouteName(parentSlug)}`]
        }
      }

      return {
        slug: [`${parentRoute}`,`${formatRouteName(parentSlug)}`]
      }
    }
    
    return {
      slug: [`${formatRouteName(parentSlug)}`]
    }
  }))

  return [...paths, ...standingPagesPaths]
})

const getNavigationDetails = cache(async () => {
  const navigations = await getNavigation()
  const standingPages = await getStandingPages()

  const standingPagesPaths = standingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      ...data,
      slug
    }
  })

  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          ...data,
          slug: `${mainParentRoute}/${parentRoute}/${formatRouteName(parentSlug)}`,
        }
      }

      return {
        ...data,
        slug: `${parentRoute}/${formatRouteName(parentSlug)}`,
      }
    }

    return {
      ...data,
      slug: formatRouteName(parentSlug),
    }
  }))

  return [...paths, ...standingPagesPaths]
})

const checkRoute = cache(async (routeName) => {
  if (routeName === '/') {
    routeName = 'home'
  }

  const paths = await getNavigationDetails()
  return _.find(paths, data => data.slug == routeName)
})

const getActionButtons = cache(async () => {
  const temp = await getCollection(ids.actionButtons)
  return temp[0].items
})


// for blogs

// const generateStaticBlogs = cache( async () => {
//   const temp = await getCollection(ids.blogs)
//   const blogs = temp[0].items

//   const paths = blogs?.map(blog => {
//     const removeChar = blog.name.replace(/[^a-zA-Z0-9 ]/g, '')
//     const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

//     return {
//       slug
//     }
//   })
  
//   return paths
// })
// const getBlogDetails = cache( async () => {
//   const temp = await getCollection(ids.blogs)
//   const blogs = temp[0].items

//   const paths = blogs?.map(blog => {
//     const removeChar = blog.name.replace(/[^a-zA-Z0-9 ]/g, '')
//     const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

//     return {
//       slug,
//       ...blog
//     }
//   })
  
//   return paths
// })

// const checkBlog = cache(async (routeName) => {
//   if (routeName === '/') {
//     return
//   }

//   const paths = await getBlogDetails()
//   return _.find(paths, data => data.slug == routeName)
// })

export {
  checkRoute,
  generateStaticRoutes,
  getNavigationDetails,
  getActionButtons
}