/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-23 23:55:00
 * @FilePath     : /eug620.github.io/src/main.ts
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { createApp } from 'vue'
import  './styles/base.css'
import  './styles/iconfont.css'
// 引入进度条样式
import 'nprogress/nprogress.css'
import App from './App.vue'
import { useInitRouter } from './router'
import { pinia } from './store'


const app = createApp(App)
const router = useInitRouter(app)
app.use(pinia)
app.use(router)
app.mount('#app')
