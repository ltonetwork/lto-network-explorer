import colors from 'vuetify/lib/util/colors'

export default {
  env: {
    BASE_ROUTE: process.env.BASE_ROUTE || ''
  },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - LTO Network',
    title: 'Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'LTO Network Explorer' || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize fonts
  */
  webfontloader: {
    custom: {
      families: [
        'Open Sans:n3,n4',
        'IBM Plex Sans:n3,n7'
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap',
        'https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap'
      ]
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#804BC9',
    height: '10px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/lto-icons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/filters.ts' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://www.npmjs.com/package/@nuxtjs/proxy
    '@nuxtjs/proxy',
    // Doc: https://nuxtjs.org/faq/cached-components/
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/Developmint/nuxt-webfontloader
    'nuxt-webfontloader',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/basic-usage.html
    'nuxt-i18n',
    'nuxt-clipboard2'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    breakpoint: {
      thresholds: {
        xs: 400,
        sm: 600,
        md: 800,
        lg: 1280
      },
      scrollBarWidth: 24
    },
    theme: {
      light: true,
      options: {
        customProperties: true,
        minifyTheme (css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        }
      },
      themes: {
        light: {
          primary: '#804BC9',
          secondary: '#17054B',
          anchor: '#804BC9',
          accent: '#82B1FF',
          error: colors.red,
          info: colors.lightBlue,
          success: colors.lightGreen,
          warning: colors.orange,
          grey: '#75828F'

        }
      }
    },
    treeShake: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    progress: false
  },
  /*
  ** i18n module configuration
  ** See https://nuxt-community.github.io/nuxt-i18n/basic-usage.html
  */
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en.js'
      }
      /*,
      {
        name: 'Nederlands',
        code: 'nl',
        iso: 'NL',
        file: 'nl.js'
      }
      */
    ],
    langDir: 'locales/',
    seo: true,
    lazy: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
  ** You can extend webpack config here
  */
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  generate: {
    fallback: false,
    exclude: [
      /^(?=.*\btypes\b).*$/
    ]
  },
  router: {
    base: '',
    middleware: 'redirect'
  },
  proxy: {
    '/cache/': { target: 'https://api.lto.cloud/v1', pathRewrite: { '^/cache/': '' } },
    '/network/': { target: 'https://network.lto.cloud/v1', pathRewrite: { '^/network/': '' } },
    '/node/': { target: 'https://nodes.lto.network', pathRewrite: { '^/node/': '' } },
    '/bridge/': { target: 'https://bridge.lto.network', pathRewrite: { '^/node/': '' } }
  }
}
