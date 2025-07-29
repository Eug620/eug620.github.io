<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-07-29 15:35:38
 * @FilePath     : /eug620.github.io/src/views/About.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue';
const durations = ref(0)


durations.value = dayjs().diff('2025.07.14', 'day')
// durations.value = Math.floor(
//   (Date.now() - (new Date('2024.08.11')).getTime()) / (24 * 60 * 60 * 1000)
// )
</script>

<template>
  <div class="About-container">
    <div class="About-container_title ">Eug</div>
    <div class="About-container_desc">98年的糟老头子</div>
    <div class="About-container_desc">喜欢lsy</div>
    <div class="About-container_tag">
      <a href="https://juejin.cn/user/3650034336020430" class="About-container_button mimesis">掘金</a>
      <a href="https://github.com/Eug620" class="About-container_button mimesis">Github</a>
    </div>
    <div class="text-base mb-4 fixed right-20 bottom-10 italic text-right">
      <div class="animate__animated animate__slow animate__fadeInRight">戒烟第<span class="text-2xl font-bold mx-2">{{ durations }}</span>天</div>
      <div class="text-xl animate__animated animate__delay-1s animate__slow animate__fadeInRight">Become a better self</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.About-container {
  @apply text-center leading-10 py-10;

  .button {
    width: 5rem;
    height: 3rem;
    margin: 0 .5rem;
  }

  &_title{
    @apply text-2xl mb-6 font-bold;
  }

  &_desc{
    @apply text-sm mb-4;
  }

  &_tag{
    @apply text-sm mb-2 flex justify-center;
  }

  &_button {
    @apply button  cursor-pointer;
  }
}

</style>
