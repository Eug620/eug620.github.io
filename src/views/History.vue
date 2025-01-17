<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2025-01-17 22:19:03
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-01-18 01:03:24
 * @FilePath     : /eug620.github.io/src/views/History.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="history" :style="historyStyle">
        <div class="justify-center content-center py-6 w-full">
            <div class="container-phone flex mx-auto rounded-lg flex-col">
                <div class="status-bar flex justify-between	items-center	">
                    <div>00:00</div>
                    <div class="flex">
                        <img class="status-bar_icon"
                            src="https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52216275DE31D4371B6F/zh_CN/50cd97875552cc335e2b1e693fe4c89d.png"
                            alt="">
                        <img class="status-bar_icon"
                            src="https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52216275DE31D4371B6F/zh_CN/d46076ac5e0e9cc450730cc189e8ce8d.png"
                            alt="">
                        <img class="status-bar_icon"
                            src="https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52216275DE31D4371B6F/zh_CN/aab3161f0b5c02018aa65dbb63e21cda.png"
                            alt="">
                    </div>
                </div>
                <div class="title-bar text-center">三文鱼</div>
                <div class="chatting-records flex-1">
                    <div class="flex records">
                        <div class="avatar"></div>
                        <div class="flex-1 records-reply">
                            <div class="reply">若我是白日，你便是那山，依你起，依你落。朝朝暮暮，千秋万代。
                            </div>
                        </div>
                    </div>
                    <div class="flex records">
                        <div class="flex-1 records-deliver">
                            <div class="deliver">晓看天色暮看云，行也思君，坐也思君；春赏百花冬赏雪，醒也思卿，梦也思卿。
                            </div>
                        </div>
                        <div class="avatar"></div>

                    </div>
                    <div class="flex records">
                        <div class="avatar"></div>
                        <div class="flex-1 records-reply">
                            <div class="reply">早
                            </div>
                        </div>
                    </div>

                </div>
                <div class="entry-bar flex flex-col">
                    <div>entry bar</div>
                    <div class="entry-bar_line mx-auto"></div>
                </div>
            </div>
        </div>
        <div class="control w-1/2 fixed right-0 top-0 h-full " v-if="controlVisiable">2</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const controlVisiable = ref(false)

const width = ref(355)
const historyStyle = computed(() => {
    return {
        '--w': `${width.value}px`
    }
})




</script>

<style>
.container-phone {
    width: var(--w);
    height: calc(var(--w) * 2532 / 1170);
    background-color: #ededed
}

.status-bar {
    padding: calc(var(--w)* 56 / 1170) calc(var(--w)* 30 / 1170) 0px;
    font-size: calc(var(--w) *52 / 1170);
    font-weight: bold;
}

.status-bar_icon {
    height: calc(var(--w) *52/1170);
}

.title-bar {
    font-size: calc(var(--w) *65/1170);
    padding: calc(var(--w) *40/1170) calc(var(--w) *40/1170) calc(var(--w) *20/1170) calc(var(--w) *40/1170);
    border-bottom: calc(var(--w) *2/1170) solid #d5d5d5;
    font-weight: bold;
}

.chatting-records {
    padding: calc(var(--w) *36/1170);
    overflow-y: scroll;
}

.chatting-records::-webkit-scrollbar {
    width: 0;
}

.records {
    margin-bottom: calc(var(--w) *55/1170);
    gap: calc(var(--w) *20/1170);
}

.avatar {
    background-color: #ccc;

    background: url(https://e282fa74745a7e0c24069d7d4708fc49a8ba23e1.mdnplay.dev/zh-CN/docs/Web/HTML/Element/img/favicon144.png) no-repeat;
    background-size: 100%;
    background-position: center;
    width: calc(var(--w) *120/1170);
    height: calc(var(--w) *120/1170);
    border-radius: calc(var(--w) *14/1170);
}

.reply {
    display: inline-block;
    min-height: calc(var(--w) *120/1170);
    background-color: #ffffff;
    padding: calc(var(--w) *15/1170) calc(var(--w) *40/1170);
    border-radius: calc(var(--w) *14/1170);
    font-size: calc(var(--w) *50/1170);
}

.records-reply {
    padding-right: calc(var(--w) *120/1170);
}

.records-deliver {
    padding-left: calc(var(--w) *120/1170);
}

.deliver {
    display: inline-block;
    min-height: calc(var(--w) *120/1170);
    background-color: #a9ea79;
    padding: calc(var(--w) *15/1170) calc(var(--w) *40/1170);
    border-radius: calc(var(--w) *14/1170);
    font-size: calc(var(--w) *50/1170);
    float: right;
}

.entry-bar {
    background-color: #f2f5f7;
    padding: calc(var(--w) *20/1170) calc(var(--w) *30/1170);
    border-top: calc(var(--w) *2/1170) solid #d5d5d5;
    gap: calc(var(--w) *80/1170);

}

.entry-bar_line {
    display: inline-block;
    height: calc(var(--w) *16/1170);
    border-radius: calc(var(--w) *16/1170);
    background-color: #020202;
    width: calc(var(--w) *420/1170);
}
</style>