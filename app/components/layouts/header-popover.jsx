'use client'

import React, { useState, useEffect } from 'react'
import _ from 'lodash'
// tailwind
import { Popover } from '@headlessui/react'
// components
import { DesktopHeader, MobileHeader } from '@/components/layouts'
// constant
import { headerLogos } from '@/app/constants'

const theme = {
  darkTheme : {
    theme: 'dark-theme',
    logo: headerLogos.white,
    style: 'fixed'
  },
  lightTheme: {
    theme: 'light-theme',
    logo: headerLogos.dark,
    style: 'sticky top-0'
  }
}

export function HeaderPopover({ navigation, general, actionButtons }) {
  return (
    <Header 
      theme={theme.darkTheme}
      navigation={navigation}
      general={general}
      actionButtons={actionButtons}
    />
  )
}

const Header = ({ theme, navigation, general, actionButtons }) => {
  const [headerTheme, setHeaderTheme] = useState(theme)
  const [logoClass, setLogoClass] = useState({
    desktop: 'h-14 w-auto md:h-16 xl:h-20'
  })

  useEffect(() => {
    setHeaderTheme(theme)

    window.onscroll = async () => {
      if(window.pageYOffset === 0) {
        setHeaderTheme(theme)

        setLogoClass({
          desktop: 'h-14 w-auto md:h-16 xl:h-20'
        })
      }

      if(window.pageYOffset > 0) {
        setHeaderTheme({
          theme: 'light-theme',
          logo: headerLogos.dark
        })

        setLogoClass({
          desktop: 'h-10 w-auto md:h-12 xl:h-16'
        })
      }
    }
  }, [theme])

  return (
    <header className={`fixed w-full z-1000 bg-header-color ${headerTheme.theme} ${headerTheme.style}`}>
      <Popover>
        {({ open }) => (
          <>
            <DesktopHeader navigation={navigation} general={general} actionButtons={actionButtons} headerTheme={headerTheme} logoClass={logoClass}/>
            <MobileHeader navigation={navigation} general={general} actionButtons={actionButtons} logo={headerLogos.dark}/>
          </>
        )}
      </Popover>
    </header>
  )
}