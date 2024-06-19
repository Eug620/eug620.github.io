<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-06-19 23:17:31
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-20 00:59:00
 * @FilePath     : /eug620.github.io/src/views/Music.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="music">
        <div class="w-full flex flex-col  py-4  flex-wrap  w-full max-w-screen-lg px-2 mx-auto">
            <div v-if="MusicStore.picUrl" @click="MusicStore.useChangeStatus"
                class="my-10 flex-1 cursor-pointer text-center flex flex-col justify-items-center pr-2 pt-1">
                <img @click="MusicStore.useGetMusic" :src="MusicStore.picUrl"
                    class="h-32  mb-4 rounded-full mx-auto  cursor-pointer" v-if="MusicStore.picUrl" alt="下一首">
                <div class="flex-1 h-full truncate">{{ MusicStore.name }}</div>
                <div class="flex-1 h-full truncate">{{ MusicStore.auther }}</div>
                <div class=" flex-1 h-full truncate">{{ formatSeconds(MusicStore.currentTime) }}/{{
                formatSeconds(MusicStore.duration) }}
                </div>
            </div>

            <div class="flex-1 h-full overflow-y-auto">
                <div class="cursor-pointer h-12 flex mb-2 bg-slate-200 rounded-lg overflow-hidden"
                    v-for="music in MusicStore.history" :key="music.id">
                    <img :src="music.picUrl" class="h-12 mr-4" alt="" @click="MusicStore.usePlay(music)">
                    <div class="flex-1 my-1" @click="MusicStore.usePlay(music)">
                        <div>{{ music.name }}</div>
                        <div class="text-xs">{{ music.auther }}</div>
                    </div>
                    <div @click="MusicStore.delete(music.url)" class="px-4  bg-slate-300 text-slate-600	 text-xs"
                        style="line-height: 3rem;">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMusicStore } from '@/store/modules/music'
import { formatSeconds } from '@/utils/formatSeconds'

const MusicStore = useMusicStore()
</script>

<style></style>