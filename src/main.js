import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from '@/router/'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.mount('#app')
