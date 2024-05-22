import { createApp } from 'vue'
import  './styles/base.css'
import  './styles/iconfont.css'
// 引入进度条样式
import 'nprogress/nprogress.css'
import App from './App.vue'
import { useInitRouter } from './router'

const app = createApp(App)
const router = useInitRouter(app)
app.use(router)
app.mount('#app')
