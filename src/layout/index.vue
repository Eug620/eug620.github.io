<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:26:00
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-19 23:21:39
 * @FilePath     : /eug620.github.io/src/layout/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="w-screen	h-screen pt-14">
    <div
      class="animate__animated animate__slow animate__fadeInDown fixed bg-slate-100 overflow-x-auto overflow-y-hidden z-10 h-14 leading-14 top-0 w-screen shadow-md flex items-center pt-2 justify-center">
      <div v-for="m in menus" :key="m.path" @click="() => router.push({ name: m.name })"
        class="cursor-pointer border-inherit items-center w-20 min-w-20 text-center"
        :class="{ 'underline underline-offset-8': route.name === m.name }">{{ m.meta.title }}</div>
    </div>
    <div class="h-full overflow-y-auto overflow-x-hidden">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" class="animate__animated animate__fadeIn"
          v-if="!route.meta.keepAlive" />

        <keep-alive>
          <component :is="Component" :key="route.fullPath" class="animate__animated animate__fadeIn"
            v-if="route.meta.keepAlive" />
        </keep-alive>
      </router-view>

    </div>
  </div>
</template>

<script setup lang="ts">
import { menus } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
</script>

<style></style>