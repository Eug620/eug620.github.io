<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:26:00
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-09 01:02:09
 * @FilePath     : /eug620.github.io/src/layout/index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="w-screen	h-screen pt-14">
    <div
      class="fixed bg-slate-100 overflow-x-scroll overflow-y-hidden z-10 h-14 leading-14 top-0 w-screen shadow-md flex items-center pt-2 justify-center">
      <div class="flex-1 min-w-36"></div>
      <div v-for="m in menus" :key="m.path" @click="() => router.push({ name: m.name })"
        class="cursor-pointer border-inherit items-center w-20 min-w-20 text-center"
        :class="{ 'underline underline-offset-8': route.name === m.name }">{{ m.meta.title }}</div>
      <div class="flex-1 flex text-right	min-w-36 -translate-y-1">
        <div v-if="MusicStore.picUrl" @click="handles"
          class="flex-1 cursor-pointer text-right flex flex-col justify-items-center pr-2">
          <div class=" flex-1 h-full">{{ MusicStore.name }}</div>
          <div class="text-xs flex-1 h-full">{{ MusicStore.auther }}</div>
          <div class="text-xs flex-1 h-full">{{ formatSeconds(MusicStore.currentTime) }}/{{ formatSeconds(MusicStore.duration) }}
          </div>
        </div>
        <img @click="MusicStore.useGetMusic" :src="MusicStore.picUrl" class="h-full w-14  cursor-pointer"
          v-if="MusicStore.picUrl" alt="下一首">
       
      </div>

    </div>
    <div class="h-full overflow-y-auto overflow-x-hidden">
      <router-view />
    </div>
    <div class="video-container w-0 h-0 fixed -bottom-1 -left-1">
      <audio autoplay @loadedmetadata="MusicStore.timeupdate" @timeupdate="MusicStore.timeupdate" controls
        v-if="MusicStore.url" class="audio-player" @ended="MusicStore.useGetMusic">
        <source :src="MusicStore.url" type="audio/mp3">
      </audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menus } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { useMusicStore } from '@/store/modules/music'
import { formatSeconds } from '@/utils/formatSeconds'
const router = useRouter()
const route = useRoute()
const MusicStore = useMusicStore()
MusicStore.useGetMusic()

const handles = () => {
  if (MusicStore.playing) {
    (document.querySelector('.audio-player') as HTMLAudioElement)?.pause()
    MusicStore.playing = false
  } else {
    (document.querySelector('.audio-player') as HTMLAudioElement)?.play()
    MusicStore.playing = true
  }
}
</script>

<style></style>