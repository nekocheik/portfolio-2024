import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createThemeManager } from './plugins/themeManager'
import './assets/main.css'
import './assets/style.css'
import Button from './components/Button.vue'

const app = createApp(App)
  .component('AButton', Button)
  .use(router)
  .use(createThemeManager({ light: 'breeze', dark: 'storm', watchSystemTheme: true }))

app.mount('#app')
