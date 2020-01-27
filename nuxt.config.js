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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap' }
    ]
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
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/basic-usage.html
    'nuxt-i18n',
    // Doc: https://axios.nuxtjs.org/options
    // Doc: https://www.npmjs.com/package/@nuxtjs/proxy
    '@nuxtjs/proxy',
    'nuxt-clipboard2'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#804BC9',
          secondary: '#17054B',
          gray: '#75828F'
        }
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
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
      },
      {
        name: 'Nederlands',
        code: 'nl',
        iso: 'NL',
        file: 'nl.js'
      }
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
  router: {
    // Set the "Base" of the router.
    // https://router.vuejs.org/en/api/options.html#base
    base: '/explorer/'
  },
  proxy: {
    '/cache/': { target: 'https://api.lto.cloud/v1', pathRewrite: { '^/cache/': '' } },
    '/network/': { target: 'https://network.lto.cloud/v1', pathRewrite: { '^/network/': '' } },
    '/node/': { target: 'https://node.lto.cloud/', pathRewrite: { '^/node/': '' } }
  }
}
