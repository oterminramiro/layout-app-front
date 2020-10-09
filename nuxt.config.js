export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'vue-app',
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
		'@/plugins/phone-number-input.js'
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
	],

	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/axios',
		'@nuxt/content',
	],

	axios: {
		baseURL: process.env.API_URL,
	},

	// Content module configuration (https://go.nuxtjs.dev/config-content)
	content: {},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
	}
}
