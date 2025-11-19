// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  // routeRules: {
  //   '/': { ssr: true }
  // },
  experimental: {
    appManifest: false
  },
  css: ['@/assets/css/main.css'],
  hooks: {
    'pages:extend'(pages) {
      for (const page of pages) {
        if (page.path !== '/login') {
          page.meta ||= {}
          page.meta.middleware = ['auth']
        }
      }
    }
  }
})