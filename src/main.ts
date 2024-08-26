import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createThemeManager } from './plugins/themeManager'
import './assets/main.css'
import './assets/style.css'
import Button from './components/Button.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createI18n } from 'vue-i18n'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import { MotionPlugin } from '@vueuse/motion'
import Aura from '@primevue/themes/aura'

library.add(faUserSecret)

window.log = (text) => {
  console.log(text + '---- ici --- app')
}
;(() => {
  const local = localStorage.getItem('locale')
  if (!local) {
    localStorage.setItem('locale', 'fr')
  }
})()

const i18n = createI18n({
  locale: localStorage.getItem('locale'),
  fallbackLocale: 'en',
  messages: {
    en: {
      nav: {
        home: 'Home',
        projets: 'Projects',
        who_i_am: 'Who I Am',
        change_language: 'Change Language'
      }
    },
    fr: {
      nav: {
        home: 'Accueil',
        projets: 'Projets',
        who_i_am: 'Qui je suis',
        change_language: 'Changer la langue'
      }
    }
  }
})

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('AButton', Button)
  .use(router)
  .use(i18n)
  .use(MotionPlugin)
  .use(createThemeManager({ light: 'breeze', dark: 'storm', watchSystemTheme: true }))
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })

app.mount('#app')
