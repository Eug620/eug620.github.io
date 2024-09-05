<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 23:03:24
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-09-05 22:34:26
 * @FilePath     : /eug620.github.io/src/views/Three.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div ref="refsThree" class="h-full"></div>
    <div v-if="modelsStore.models.findIndex(v => v.progress < 100) !== -1" class="fixed top-1/2 text-center w-full">
        <div>{{ modelsStore.models.find(v => v.progress < 100)?.key }}</div>
                <div>{{ modelsStore.models.find(v => v.progress < 100)?.progress }}% </div>
                </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useModelsStore } from '@/store/modules/models'
const modelsStore = useModelsStore()

const refsThree = ref()
onMounted(() => {
    modelsStore.init(refsThree.value)
})
const keycode = ref<null | number>(null)

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