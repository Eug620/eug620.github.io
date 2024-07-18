<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-07-19 01:50:09
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-07-19 02:08:16
 * @FilePath     : /eug620.github.io/src/components/Spells.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="flex my-2 items-center px-4">
        <img :src="spells?.abilityIconPath" class="mr-4 w-20 h-20 rounded-lg" alt="">
        <div>
            <div>
                <template v-if="pre">{{ pre }}:</template>
                {{ spells?.name }}
                <template v-if="pre">
                    - <span class="text-xs">{{
            spells?.costburn
        }}</span>
                </template>
            </div>
            <div class="text-xs pl-4">{{ spells?.description }}</div>
        </div>
    </div>

</template>

<script setup lang="ts">
const { spells, pre } = defineProps<{
    spells:any,
    pre?: string     
}>()
</script>

<style></style>