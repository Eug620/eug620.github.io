<template>
    <div class="footer flex flex-wrap justify-center gap-4">
        <div v-for="rt in information" :key="rt.path" class="cursor-pointer">
            <router-link :to="rt.path">{{ rt.meta.title }}</router-link>
        </div>
        <div v-for="m in menus" :key="m.path" class="cursor-pointer">
            <a :href="m.path">{{ m.name }}</a>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { information } from '@/router/routes'

const menus = ref([
    {
        path: 'https://eug620.github.io/micro-react/#/excalidraw',
        name: 'Excalidraw'
    }
])
</script>
<style></style>