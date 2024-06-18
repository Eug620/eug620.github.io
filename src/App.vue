<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-24 01:22:38
 * @FilePath     : /eug620.github.io/src/App.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
// import { useModelsStore } from '@/store/modules/models'
// const modelsStore = useModelsStore()
// modelsStore.initModels()

//判断系统类型
function OSnow() {
  var agent = navigator.userAgent.toLowerCase();
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
    import('./styles/win.css')
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    import('./styles/win.css')
  }
  if (isMac) {
  }
}
OSnow();
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
