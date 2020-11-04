require('dotenv').config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

	transition: 'page',

  // Global CSS (https://go.nuxtjs.dev/config-css)
	css: [
		'~/assets/main.css'
	],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
	  '@/plugins/phone-number-input.js',
	  { src: '~/plugins/vue-notification', mode: 'client' },
	  { src: '~/plugins/vue-datepicker', mode: 'client' },
	  { src: '~/plugins/vue-timepicker', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
	  'bootstrap-vue/nuxt',
	  '@nuxtjs/axios',
	  '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  router: {
	  middleware: []
  }
}
