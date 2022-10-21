export default {
  target: 'static',
  srcDir: 'src/',
  head: {
    titleTemplate: '%s - app',
    title: 'app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['~/sass/global.scss'],
  styleResources: { scss: ['~/sass/global.scss'] },

  plugins: ['~/plugins/filters', '~/plugins/v-mask'],

  components: false,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/style-resources'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {},

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          primary: '#25af6c',
          secondary: '#222222'
        },
        dark: {
          primary: '#25af6c',
          secondary: '#272727'
        }
      }
    }
  },

  build: {},
  server: { port: 3001 }
};
