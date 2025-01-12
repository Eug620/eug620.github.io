
<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-07-19 01:41:03
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-01-12 16:46:12
 * @FilePath     : /eug620.github.io/src/components/Equip.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="flex bg-slate-200 rounded-lg p-2">
        <div>
            <img :src="equip.iconPath" class="w-16 h-16" loading="lazy" alt="">
            <div class="text-xs" v-for="tag in equip.maps" :key="tag">{{ tag }}</div>
        </div>
        <div class="ml-2">
            <div>{{ equip.name }}</div>
            <div class="text-xs">合成：{{ equip.price }}</div>
            <div class="text-xs">出售：{{ equip.sell }}</div>
            <div class="text-xs">总价：{{ equip.total }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Items } from "@/types/LOL"

const { equip } = defineProps<{
    equip: Items
}>()
</script>

<style></style>