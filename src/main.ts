import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { formatNumber } from './utils/numberFormatter'
import './assets/css/main.css'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$formatNumber = formatNumber

app.use(pinia)
app.use(router)
app.mount('#app')
