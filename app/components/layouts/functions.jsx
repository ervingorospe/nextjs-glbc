'use client'

import React, { Fragment } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
// layouts
import { Container } from '@/app/layouts'

export const MobileHeader = ({ navigation, general, actionButtons, logo }) => {
  return (
    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition xl:hidden"
      >
        {({ close }) => (
          <div className="overflow-hidden rounded bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <Link href="/">
                <Image
                  src={logo}
                  alt={_.get(general, 'organizationName')}
                  height={1000}
                  width={1000}
                  className="h-8 w-auto"
                />
              </Link>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="py-4 space-y-1 px-2 pt-2 pb-3 max-h-[700px] overflow-y-scroll">
              <Nav 
                navigation={navigation}
                close={() => close()}
                mobile={true}
                className={{
                  nav: "space-y-1 px-2 pt-2 pb-3",
                  link: "flex items-center rounded-md px-3 py-3 text-base font-medium text-gray-800 hover:text-gray-900",
                  subLink: "group/child-nav block px-3 py-3 text-sm font-medium text-gray-600 hover:text-gray-700",
                  subNav: {
                    popoverPanel: "flex w-screen max-w-xs flex-col",
                    container: "relative overflow-y-auto",
                    subContainer: "ml-2 relative grid",
                    subLinkContainer: "grid w-full text-left",
                    subLink: "group/child-nav block px-3 py-3 text-sm font-medium text-gray-600 hover:text-gray-700 border-b border-secondary-200 border-opacity-50"
                  }
                }}
              />
            </div>
            <div className="grid w-full border">
              <NavButtons close={() => close()} actionButtons={actionButtons} navigation={navigation} mobile={true}/>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Transition>
  )
}

export const DesktopHeader = ({ navigation, general, actionButtons, headerTheme, logoClass }) => {
  return (
    <Container className="flex max-w-screen-2xl items-center justify-between py-4 z-1000">
      <div>
        <Link href="/">
          <Image 
            className={logoClass.desktop}
            src={headerTheme.logo}
            alt={_.get(general, 'organizationName')}
            height={500}
            width={500}
          />
        </Link>
      </div>
      
      <div className="mt-1 flex items-center justify-end">
        <Nav 
          navigation={navigation}
          className={{
            nav: "hidden space-x-6 xl:flex",
            link: "flex text-sm items-center font-heading font-medium uppercase tracking-wider text-link hover:text-link-hover",
            subLink: "group/child-nav flex items-center border-b border-gray-200 border-opacity-50 px-5 pt-6 pb-4 hover:bg-gray-100",
            subNav: {
              popoverPanel: "absolute top-full z-10 flex w-screen max-w-xs flex-col pt-3 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2",
              container: "relative overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900 ring-opacity-15 overflow-y-auto max-h-[80vh]",
              subContainer: "relative grid",
              subLinkContainer: "group/child-nav flex items-center border-b border-gray-200 border-opacity-50 px-5 pt-6 pb-4 hover:bg-gray-100group/child-nav flex items-center border-b border-gray-200 border-opacity-50 px-5 pt-6 pb-4 hover:bg-gray-100",
              subLink: "group-hover/child-nav:text-primary-700 text-secondary-700 font-heading text-base font-medium tracking-wide"
            }
          }}
        />

        <div className="ml-8 hidden space-x-3 xl:flex">
          <NavButtons actionButtons={actionButtons} navigation={navigation} className=""/>
        </div>

        <div className="-my-2 -mr-2 ml-6 xl:hidden">
          <Popover.Button className="text-breadcrumps inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-600">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
      </div>
    </Container>
  )
}

const NavButtons = ({ actionButtons, navigation, close, mobile = false }) => {
  const filteredButtons = mobile ? _.filter(actionButtons, data => _.get(data, 'fields.active') && _.get(data, 'fields.isMobileFooterButton')) : _.filter(actionButtons, data => _.get(data, 'fields.active'))
  const styles = {
    mobile: 'button w-full rounded-t-none rounded flex px-5 py-3 text-center font-medium bg-primary-400 text-secondary-950 hover:bg-primary-300 focus:ring-primary-400',
    0: "button button inline-flex border-primary-button bg-primary-button text-primary-button hover:bg-primary-button-hover hover:text-primary-button-hover",
    1: "button button inline-flex border-primary-button bg-primary-button text-primary-button hover:bg-primary-button-hover hover:text-primary-button-hover",
  }

  return (
    filteredButtons?.map((item, i) => {
      if (_.get(item, 'fields.type') === 'Telephone') {
        const formatPhone = _.get(item, 'fields.button.text').replace(/[^A-Z0-9]/gi, '')

        return (
          <Link href={`tel:${formatPhone}`} className="flex items-center space-x-3 text-lg text-link hover:text-link-hover" key={item.name}>
            <span className="sr-only">Telephone</span>
            <span className="stroke-current text-link hover:text-link-hover">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </span>
            <p>{_.get(item, 'fields.button.text')}</p>
          </Link>
        )
      }

      return (
        <ButtonLink
          className={!mobile ? styles[i] : styles.mobile}
          navigation={navigation}
          close={close}
          data={{
            button: {
              ..._.get(item, 'fields.button'),
              text: _.get(item, 'fields.button') ? _.get(item, 'fields.button.text') : _.get(item, 'name'),
            },
            buttonPageLink: _.get(item, 'fields.buttonPageLink'),
          }}
          key={item.name}
        />
      )
    })
  )
}

export const Nav = ({ navigation, className, close, mobile = false }) => {
  const filteredNav = _.filter(navigation, data => _.get(data, 'fields.showInNavigation'))

  return (
    <nav className={className.nav}>
      {
        filteredNav?.map(item => {
          if (_.get(item, 'parentId') === 0){
            const subNav = _.filter(filteredNav, data => data.parentId === item.id);

            if (subNav.length === 0) {
              return (
                <ButtonLink
                  close={close}
                  className={className.link}
                  navigation={navigation}
                  data={{
                    button: {
                      url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                      text: item.name,
                      target: _.get(item, 'fields.nav.target'),
                    },
                    buttonPageLink: _.get(item, 'fields.pageLink'),
                  }}
                  key={item.name}
                />
              )
            }

            return (
              <SubNav
                closeMenu={close}
                navigation={navigation}
                item={item}
                subNav={subNav}
                className={className}
                key={item.name}
                mobile={mobile}
              />
            )
          }
        })
      }
    </nav>
  )
}

export const SubNav = ({ navigation, className, item, subNav, mobile, closeMenu }) => {
  const activeNav = _.filter(subNav, data => data.fields.showInNavigation)

  return (
    <Popover
      className="group relative"
    >
      {({ open }) => (
        <>
          <Popover.Button as={'div'} styles={{ border: 'none !important;' }} className="cursor-pointer">
            <span className={className.link}>
              <span>{item.name}</span>
              <svg
                className={`text-header-color ml-2 h-5 w-5 fill-current transition-transform ${open ? 'rotate-180 text-header-hover-color' : ''}`}
                x-description="Heroicon name: solid/chevron-down"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className={className.subNav.popoverPanel}
              static
            >
              {({ close }) => (
                <div className={className.subNav.container}>
                  <div className={className.subNav.subContainer}>
                    {
                      !mobile ? (
                        activeNav?.map(subItem => 
                          <div onClick={() => close()} key={subItem.id}>
                            <SubLinks
                              data={{
                                button: {
                                  url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                  text: subItem.name,
                                  target: _.get(subItem, 'fields.nav.target'),
                                },
                                buttonPageLink: _.get(subItem, 'fields.pageLink'),
                              }}
                              navigation={navigation}
                            />
                          </div>
                        )
                      )
                      :
                      (
                      <>
                        {
                          subNav?.map(subItem => {
                            if (_.get(subItem, 'fields.showInNavigation')) 
                              return (
                                <div
                                  onClick={ mobile ? () => closeMenu() : () => close()}
                                  key={subItem.name}
                                >
                                  <SubNavButton
                                    className={className.subLink}
                                    data={{
                                      button: {
                                        url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                        text: subItem.name,
                                        target: _.get(subItem, 'fields.nav.target'),
                                      },
                                      buttonPageLink: _.get(subItem, 'fields.pageLink'),
                                    }}
                                    mobile={mobile}
                                    navigation={navigation}
                                  />
                                </div>
                              )
                          })
                        }
                        </>
                      )
                    }
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export const ButtonLink = ({ data, className, navigation, close = () => {} }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? `/${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
    }
  }

  return (
    <span onClick={() => close()}>
      <Link href={buttonDetails.url ? buttonDetails.url : '/'} className={className} target={buttonDetails.target}>
        {buttonDetails.text}
      </Link>
    </span>
  )
}


const SubNavButton = ({ data, className, navigation, mobile }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? `/${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
    }
  }

  return (
    <Link href={buttonDetails.url ? buttonDetails.url : '/'} className={className} target={buttonDetails.target}>
      <div className="ml-3 flex items-center gap-3 transition-all">
        <p className="">
          {buttonDetails.text}
        </p>
        {
          !mobile && (
            <svg
              className="fill-gray-400 transition-transform group-hover/child-nav:translate-x-2 group-hover/child-nav:fill-primary-700"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="long-arrow-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
              height="12"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
            </svg>
          )
        }
      </div>
    </Link>
  )
}


// custom
const MainSubLink = ({ data, navigation }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? `/${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
    }
  }

  return (
    <Link href={buttonDetails.url ? buttonDetails.url : '/'} className="flex space-x-2 items-center" target={buttonDetails.target}>
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
          <Image
            src={_.get(data, 'icon.imageUrl')}
            alt="Greater Louisiana Baptist Convention"
            width={500}
            height={500}
            className="h-6 w-6"
          />
        </div>
      </div>
      
      <div className="text-primary-500 hover:text-primary-700">{buttonDetails.text}</div>
    </Link>
  )
}

const SubLinks = ({ data, navigation }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? `/${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
    }
  }

  return (
    <Link href={buttonDetails.url ? buttonDetails.url : '/'} className="group/child-nav flex items-center border-b border-gray-200 border-opacity-50 px-5 pt-6 pb-4 hover:bg-gray-100" target={buttonDetails.target}>
      <div className="ml-3 flex items-center gap-3 transition-all">
        <p className="group-hover/child-nav:text-primary-700 text-secondary-700 font-heading text-base font-medium tracking-wide">
          {buttonDetails.text}
        </p>
        <svg
          className="fill-gray-400 transition-transform group-hover/child-nav:translate-x-2 group-hover/child-nav:fill-primary-700"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="long-arrow-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          data-fa-i2svg=""
          height="12"
        >
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
        </svg>
      </div>
    </Link>
  )
}