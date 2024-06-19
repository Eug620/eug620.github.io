/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-06-08 16:21:13
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-20 00:59:22
 * @FilePath     : /eug620.github.io/src/store/modules/music.ts
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import { useDBStore } from '@/store/modules/database'
import { nextTick, toRaw } from "vue";

interface TypeMusicInfo {
    auther: string;
    id: string;
    name: string;
    picUrl: string;
    url: string;
}
export const useMusicStore = defineStore({
    id: 'music',
    state: () => ({
        class: 'audio-player',
        id: '',
        name: '',
        auther: '',
        picUrl: '',
        url: '',
        className: 'store-music',
        currentTime: 0,
        duration: 0,
        playing: false,
        history: [] as TypeMusicInfo[],
    }),
    getters: {

    },
    actions: {
        useGetMusic() {
            const db = useDBStore()
            fetch('https://api.vvhan.com/api/wyMusic/%E7%83%AD%E6%AD%8C%E6%A6%9C?type=json').then(async res => {
                let result: { info: TypeMusicInfo } = await res.json()
                if (this.history.find(v => v.url !== result.info.url) || !this.history.length) {
                    this.history.unshift(Object.assign(result.info, { timestamp: Date.now() }))
                    await db.music.setItem('history', toRaw(this.history))
                    this.usePlay(result.info)
                } else {
                    this.useGetMusic()
                }
            })
        },
        async useChangeStatus() {
            try {
                if (this.playing) {
                    (document.querySelector(`.${this.className}`) as HTMLAudioElement)?.pause()
                    this.playing = false
                } else {
                    (document.querySelector(`.${this.className}`) as HTMLAudioElement)?.play()
                    this.playing = true
                }
            } catch (_) {
                this.delete()
            }
        },
        usePlay(info: TypeMusicInfo) {
            this.url = ''
            nextTick(() => {
                this.auther = info.auther
                this.id = info.id
                this.name = info.name
                this.picUrl = info.picUrl
                this.url = info.url
                this.currentTime = 0
                this.duration = 0
                this.playing = false
                this.useChangeStatus()
            })

        },
        async delete(url?: string) {
            const db = useDBStore()
            const history = toRaw(this.history).filter((v) => v.url !== (url || this.url))
            await db.music.setItem('history', history)
            this.initMusic()
        },
        timeupdate(e: any) {
            if (e?.target?.currentTime && e?.target.duration) {
                this.currentTime = Math.floor(e?.target?.currentTime)
                this.duration = Math.floor(e?.target?.duration)
            } else {
                this.currentTime = 0
                this.duration = 0
            }
        },
        async initMusic() {
            this.history = await useDBStore().music.getItem('history') || []
            if (this.history.length) {
                this.usePlay(this.history[0])
            } else {
                this.useGetMusic()
            }
        }
    }
})


