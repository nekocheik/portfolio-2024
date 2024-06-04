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

library.add(faUserSecret)

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('AButton', Button)
  .use(router)
  .use(createThemeManager({ light: 'breeze', dark: 'storm', watchSystemTheme: true }))

app.mount('#app')
