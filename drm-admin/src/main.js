import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import vueCookies from "vue-cookies";

const app = createApp(App)
app.use(router)
app.use(vueCookies)
app.mount('#app')