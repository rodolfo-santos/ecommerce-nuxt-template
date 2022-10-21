export default {
  target: 'static',
  srcDir: 'src/',
  components: false,

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

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  image: {
    domains: ['ecommerce-node-template.herokuapp.com'],
    presets: {
      category: {
        modifiers: {
          format: 'webp',
          width: 100,
          height: 100
        }
      }
    }
  },

  axios: {
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  },

  css: ['~/sass/global.scss'],

  styleResources: { scss: ['~/sass/global.scss'] },

  vuetify: {
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

  plugins: ['~/plugins/filters', '~/plugins/v-mask', '~/plugins/accessor'],

  compilerOptions: {
    types: ['@nuxt/types', '@nuxt/image']
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/style-resources', '@nuxt/image'],

  build: {},

  server: { port: process.env.PORT || 3000, host: process.env.HOST || '0.0.0.0' }
};
