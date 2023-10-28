// nuxt.config.ts
import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/sass/custom.scss',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
  ],
  hooks: {
    'vite:extendConfig': config => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve('./settings.scss') },
        })
      )
    },
  },
})
