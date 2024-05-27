<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-27 23:30:13
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-28 00:38:18
 * @FilePath     : /eug620.github.io/src/views/Music.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="py-20 text-center">
        <div class="text-2xl">{{ MusicInfo.name }}</div>
        <div class="text-xs my-3">{{ MusicInfo.auther }}</div>
        <img :src="MusicInfo.picUrl" class="w-80 mx-auto rounded-full" :class="[rotate && 'animation-rotate']" alt="">
        <!-- <audio :src="MusicInfo.url" autoplay></audio> -->
        <audio autoplay controls v-if="MusicInfo.url" class="mx-auto" @playing="usePlaying" @pause="usePause"
            @ended="useGetMusic">
            <source :src="MusicInfo.url" type="audio/mp3">
        </audio>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
interface TypeMusicInfo {
    auther: string;
    id: string;
    name: string;
    picUrl: string;
    url: string;
}
const MusicInfo = reactive<TypeMusicInfo>({
    id: '',
    name: '',
    auther: '',
    picUrl: '',
    url: '',
})
const useGetMusic = () => {
    MusicInfo.url = ''
    fetch('https://api.vvhan.com/api/wyMusic/%E7%83%AD%E6%AD%8C%E6%A6%9C?type=json').then(async res => {
        let result: { info: TypeMusicInfo } = await res.json()
        console.log(result);
        MusicInfo.auther = result.info.auther
        MusicInfo.id = result.info.id
        MusicInfo.name = result.info.name
        MusicInfo.picUrl = result.info.picUrl
        MusicInfo.url = result.info.url
    })
}
useGetMusic()

const rotate = ref(false)
const usePlaying = () => {
    rotate.value = true

}
const usePause = () => {
    rotate.value = false

}

</script>

<style>
@keyframes RotateZ {
    0% {
        transform: rotateZ(0deg);
    }

    50% {
        transform: rotateZ(180deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

.animation-rotate {
    animation: RotateZ 10s linear infinite;
}
</style>