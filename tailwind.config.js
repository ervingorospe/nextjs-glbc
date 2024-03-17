/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // font families are defined here in the config
    // fonts need to be imported in the CSS tab
    fontFamily: {
      // default/main body font
      sans: ['Geologica', 'sans-serif'],
      // heading font for hero titles, section titles, and RTE (Rich Text Editor) elements
      heading: ['Arimo', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      // brand yellow-400
      primary: colors.yellow,
      secondary: {
        50: '#faf6fe',
        100: '#f5ecfd',
        200: '#eadafb',
        300: '#d8bbf6',
        400: '#bf8fef',
        500: '#a866e5',
        600: '#934ad3',
        700: '#7c3ab6',
        800: '#683592',
        900: '#552c77',
        // brand
        950: '#3d1c55',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '.1',
      15: '.15',
      20: '.2',
      25: '.25',
      30: '.3',
      35: '.35',
      40: '.4',
      45: '.45',
      50: '.5',
      55: '.55',
      60: '.6',
      65: '.65',
      70: '.7',
      75: '.75',
      80: '.8',
      85: '.85',
      90: '.9',
      95: '.95',
      100: '1',
    },
    extend: {
      maxWidth: {
        prose: '75ch',
      },
      scale: {
        flipped: '-1',
      },
      zIndex: {
        1: '1',
        100: '100',
        1000: '1000',
        10000: '10000',
      },
      textColor: {
        'link': 'var(--link-text)',
        'link-hover': 'var(--link-text-hover)',
        'primary-button': 'var(--primary-button-text)',
        'primary-button-hover': 'var(--primary-button-text-hover)',
        'secondary-button': 'var(--secondary-button-text)',
        'secondary-button-hover': 'var(--secondary-button-text-hover)',
        breadcrumps: 'var(--header-breadcrumps)'
      },
      borderColor: {
        'primary-button': 'var(--primary-button-border)',
        'primary-button-hover': 'var(--primary-button-border-hover)',
        'secondary-button': 'var(--secondary-button-border)',
        'secondary-button-hover': 'var(--secondary-button-border-hover)'
      },
      backgroundColor: {
        'header-color': 'var(--bg-header-color)',
        'primary-button': 'var(--primary-button-bg)',
        'primary-button-hover': 'var(--primary-button-bg-hover)',
        'secondary-button': 'var(--secondary-button-bg)',
        'secondary-button-hover': 'var(--secondary-button-bg-hover)'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'max-width': '75ch',
            '--tw-prose-links': theme('colors.primary[700]'),
            'font-weight': '300',
            a: {
              'font-weight': '600',
            },
            'a:hover': {
              color: theme('colors.primary[600]'),
            },
            h1: {
              'font-family': '"Arimo", sans-serif',
              'font-weight': '700',
            },
            h2: {
              'font-family': '"Arimo", sans-serif',
              'font-weight': '600',
            },
            h3: {
              'font-family': '"Arimo", sans-serif',
              'font-weight': '600',
            },
            h4: {
              'font-family': '"Arimo", sans-serif',
              'font-weight': '600',
            },
          },
        },
        primary: {
          css: {
            '--tw-prose-body': theme('colors.primary[950]'),
            '--tw-prose-headings': theme('colors.primary[900]'),
            '--tw-prose-lead': theme('colors.primary[700]'),
            '--tw-prose-links': theme('colors.primary[900]'),
            '--tw-prose-bold': theme('colors.primary[900]'),
            '--tw-prose-counters': theme('colors.primary[600]'),
            '--tw-prose-bullets': theme('colors.gray[700]'),
            '--tw-prose-hr': theme('colors.primary[300]'),
            '--tw-prose-quotes': theme('colors.primary[900]'),
            '--tw-prose-quote-borders': theme('colors.primary[300]'),
            '--tw-prose-captions': theme('colors.primary[700]'),
            '--tw-prose-code': theme('colors.primary[900]'),
            '--tw-prose-pre-code': theme('colors.primary[100]'),
            '--tw-prose-pre-bg': theme('colors.primary[900]'),
            '--tw-prose-th-borders': theme('colors.primary[300]'),
            '--tw-prose-td-borders': theme('colors.primary[200]'),
          },
        },
        // custom color invert workaround
        'primary-invert': {
          css: {
            'a:hover': {
              color: theme('colors.secondary[700]'),
            },
            '--tw-prose-body': theme('colors.primary[900]'),
            '--tw-prose-headings': theme('colors.secondary[900]'),
            '--tw-prose-lead': theme('colors.primary[950]'),
            '--tw-prose-links': theme('colors.secondary[900]'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.secondary[900]'),
            '--tw-prose-bullets': theme('colors.secondary[900]'),
            '--tw-prose-hr': theme('colors.primary[600]'),
            '--tw-prose-quotes': theme('colors.primary[950]'),
            '--tw-prose-quote-borders': theme('colors.primary[600]'),
            '--tw-prose-captions': theme('colors.primary[300]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.primary[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.primary[700]'),
            '--tw-prose-td-borders': theme('colors.primary[600]'),
          },
        },
        secondary: {
          css: {
            '--tw-prose-body': theme('colors.secondary[800]'),
            '--tw-prose-headings': theme('colors.secondary[900]'),
            '--tw-prose-lead': theme('colors.secondary[700]'),
            '--tw-prose-links': theme('colors.secondary[900]'),
            '--tw-prose-bold': theme('colors.secondary[900]'),
            '--tw-prose-counters': theme('colors.secondary[600]'),
            '--tw-prose-bullets': theme('colors.secondary[400]'),
            '--tw-prose-hr': theme('colors.secondary[300]'),
            '--tw-prose-quotes': theme('colors.secondary[900]'),
            '--tw-prose-quote-borders': theme('colors.secondary[300]'),
            '--tw-prose-captions': theme('colors.secondary[700]'),
            '--tw-prose-code': theme('colors.secondary[900]'),
            '--tw-prose-pre-code': theme('colors.secondary[100]'),
            '--tw-prose-pre-bg': theme('colors.secondary[900]'),
            '--tw-prose-th-borders': theme('colors.secondary[300]'),
            '--tw-prose-td-borders': theme('colors.secondary[200]'),
          },
        },
        // custom color invert workaround
        'secondary-invert': {
          css: {
            'a:hover': {
              color: theme('colors.primary[300]'),
            },
            '--tw-prose-body': theme('colors.secondary[200]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.secondary[100]'),
            '--tw-prose-links': theme('colors.primary[400]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.secondary[400]'),
            '--tw-prose-bullets': theme('colors.secondary[400]'),
            '--tw-prose-hr': theme('colors.secondary[500]'),
            '--tw-prose-quotes': theme('colors.secondary[50]'),
            '--tw-prose-quote-borders': theme('colors.primary[400]'),
            '--tw-prose-captions': theme('colors.secondary[300]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.secondary[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.secondary[400]'),
            '--tw-prose-td-borders': theme('colors.secondary[600]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
