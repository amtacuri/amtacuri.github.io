import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './style.css'
import toAgoTime from './filters'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

app.config.globalProperties.$filters = { toAgoTime }
app.mount('#app')
