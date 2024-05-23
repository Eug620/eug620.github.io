<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-22 22:25:31
 * @FilePath     : /eug620.github.io/src/views/About.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import { reactive } from 'vue';

const ipInfo = reactive({
  ip: undefined,
  info: {}
})
fetch('https://api.vvhan.com/api/ipInfo').then(async res => {
  let result = await res.json()
  ipInfo.info = result.info
  ipInfo.ip = result.ip
})

</script>

<template>
  <div class="text-center  leading-10 py-10">
        <div v-for="(v, k) in ipInfo.info " :key="k">
          {{ k }}: {{ v }}
        </div>

        <div v-if="ipInfo.ip">ip: {{ ipInfo.ip }}</div>
  </div>
</template>

<style scoped></style>
