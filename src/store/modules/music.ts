/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-06-08 16:21:13
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-09 01:12:26
 * @FilePath     : /eug620.github.io/src/store/modules/music.ts
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { defineStore } from "pinia";
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
        id: '',
        name: '',
        auther: '',
        picUrl: '',
        url: '',
        className: 'store-music',
        currentTime: 0,
        duration: 0,
        playing: false,
    }),
    getters: {

    },
    actions: {
        useGetMusic() {
            this.url = ''
            fetch('https://api.vvhan.com/api/wyMusic/%E7%83%AD%E6%AD%8C%E6%A6%9C?type=json').then(async res => {
                let result: { info: TypeMusicInfo } = await res.json()
                console.log(result);
                this.auther = result.info.auther
                this.id = result.info.id
                this.name = result.info.name
                this.picUrl = result.info.picUrl
                this.url = result.info.url
                this.currentTime = 0
                this.duration = 0
             
            })
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
        initMusic() {

        }
    }
})


