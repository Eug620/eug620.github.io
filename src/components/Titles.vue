<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-07-19 01:34:06
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-07-19 01:35:46
 * @FilePath     : /eug620.github.io/src/components/Titles.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="border-l-4 my-4 pl-4 border-slate-400 font-bold">{{title}}</div>
</template>

<script setup lang="ts">
const {title} = defineProps({
    title: String
})
</script>

<style>

</style>