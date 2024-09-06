<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 23:03:24
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-09-06 22:36:53
 * @FilePath     : /eug620.github.io/src/views/Three.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div ref="refsThree" class="h-full"></div>
    <div v-if="modelProgress.length || animationsProgress.length" class="fixed leading-5 left-0 bottom-0 text-left text-xs p-2 ">
        <div v-if="animationsProgress.length" class="text-sm font-bold my-1">动作:</div>
        <div v-for="ap in animationsProgress" :key="ap.key" class="pr-24">{{ ap?.key.toLocaleUpperCase() }}<span class="text-emerald-400 ml-2">{{ ap?.progress }}%</span> </div>
        <div v-if="modelProgress.length" class="text-sm font-bold my-1">模型:</div>
        <div v-for="mp in modelProgress" :key="mp.key" class="pr-24">{{ mp?.key }}<span class="text-emerald-400  ml-2">{{ mp?.progress }}%</span>  </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useModelsStore } from '@/store/modules/models'
const modelsStore = useModelsStore()

const refsThree = ref()
onMounted(() => {
    modelsStore.init(refsThree.value)
})
const keycode = ref<null | number>(null)
const modelProgress = computed(() => {
    return modelsStore.models.filter((v:any) => v.progress < 100)
})
const animationsProgress = computed(() => {
    return modelsStore.keys.filter((v:any) => v.progress < 100)
})

window.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.key)
    const current = modelsStore.keys.find((v:any) => v.key === e.key)
    if (current && keycode.value !== e.keyCode) {
        keycode.value = e.keyCode
        modelsStore.setAnimations(0, current.index)
    }
})
window.addEventListener('keyup', () => {
    keycode.value = null
    modelsStore.setAnimations(0, 0)
})
</script>

<style></style>