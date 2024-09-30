<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-09-28 01:12:57
 * @FilePath     : /eug620.github.io/src/views/About.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue';
const durations = ref(0)


durations.value = dayjs().diff('2024.08.11', 'day')
// durations.value = Math.floor(
//   (Date.now() - (new Date('2024.08.11')).getTime()) / (24 * 60 * 60 * 1000)
// )
</script>

<template>
  <div class="text-center  leading-10 py-10">
    <div class="text-2xl mb-6 font-bold">Eug</div>
    <div class="text-sm mb-4">98年的糟老头子</div>
    <div class="text-sm mb-2 flex justify-center">
      <a href="https://juejin.cn/user/3650034336020430" class="About-button mimesis cursor-pointer">掘金</a>
      <a href="https://github.com/Eug620" class="About-button mimesis cursor-pointer">Github</a>
    </div>
    <div class="text-base mb-4 fixed right-20 bottom-10 italic">戒烟第<span class="text-2xl font-bold mx-2">{{ durations }}</span>天</div>
  </div>
</template>

<style scoped>
.About-button {
  width: 5rem;
  height: 3rem;
  margin: 0 .5rem;
}
</style>
