/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import _ from 'lodash'
// function
import { getGeneralInfo, getSettings } from '@/function/page'
import { checkIfDisabled } from '@/function/disabled-script'

export async function HtmlHead() {
  const settings = _.first(await getSettings())
  const general = await getGeneralInfo()
  
  return (
    <head>
      <meta name="google-site-verification" content="8dKP2h4UHoDKuGEiZ9Y93sKwhp5huTiQb0eYK9i9gFs" />
      <meta property="og:locale" content="en_US"/>
      <meta property="og:type" content="website"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="theme-color" content="#ffffff"></meta>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <script src="https://cdn.jsdelivr.net/gh/modiphy/disabled@latest/dist/index.js"></script>
      <script type="text/javascript" src={`https://www.googletagmanager.com/gtag/js?id=${_.get(general, 'analyticsId')}`} async/>

      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${_.get(general, 'analyticsId')}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `${_.get(settings, 'fields.headScripts')}`,
        }}
      />
    </head>
  )
}
