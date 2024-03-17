/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_FLUX_API: process.env.REACT_APP_FLUX_API
  },
  async redirects() {
    return [
      {
        "source": "/join",
        "destination": "/personal-membership",
        permanent: true,
      },
      {
        "source": "/gallery2",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/gallery1",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/2016",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/announcements",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2019",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2015",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2018",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2017",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/about-us",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/youth-encampment",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/contact-us",
        "destination": "/contact",
        permanent: true,
      },
      {
        "source": "/2018-youth-encampment",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/s/Annual_Session_Program_2015.pdf",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/s/2015_youth_retreat_schedule.pdf",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2015-youth-encampment",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/how-to-join",
        "destination": "/personal-membership",
        permanent: true,
      },
      {
        "source": "/s/Conference_Registration_May_2017.pdf",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2020-glbc-quarterly-feb",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2015-glbc-womans-conference",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/s/northeast_womens_convention.pdf",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2017-congress-of-christian-education",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/2016-glbc-prayer-changes-things",
        "destination": "/events",
        permanent: true,
      },
      {
        "source": "/s/Course-Listings-la5a.pdf",
        "destination": "/events",
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
