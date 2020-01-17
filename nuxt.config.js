import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#17054B' },
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
    'nuxt-i18n'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
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
  }
}
