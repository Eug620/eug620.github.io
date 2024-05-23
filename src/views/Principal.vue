<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-22 23:00:54
 * @FilePath     : /eug620.github.io/src/views/Principal.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import { ref } from 'vue';

const content = ref('')
fetch('https://api.vvhan.com/api/text/love?type=json').then(async res => {
  let result = await res.json()
  content.value = result.data.content
})

</script>

<template>
  <div class="text-center h-full items-center flex ">
    <h2 class="text-center w-full">{{ content }}</h2>
  </div>
</template>

<style scoped></style>
