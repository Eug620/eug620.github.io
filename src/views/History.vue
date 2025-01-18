<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2025-01-17 22:19:03
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-01-18 21:41:55
 * @FilePath     : /eug620.github.io/src/views/History.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="history bg-black min-h-full relative	overflow-hidden" :style="historyStyle">
        <div class="justify-center content-center py-6 w-full">
            <div class="container-phone flex mx-auto rounded-lg flex-col overflow-hidden">
                <div class="status-bar flex justify-between	items-center	">
                    <div class="status-bar_time">{{ time }}</div>
                    <div class="flex status-bar_status items-center">
                        <span class="iconfont icon-phone-signal-full"></span>
                        <span class="iconfont icon-guojiIWLAN"></span>
                        <span class="iconfont icon-dianchidianliang"></span>
                    </div>
                </div>
                <div class="title-bar justify-between items-center flex">
                    <span class="iconfont icon-fanhui"></span>
                    <div class="text-center flex-1">{{ replyName }}</div>
                    <span class="iconfont icon-shenglve" @click="useSwitchControl(!controlVisiable)"></span>
                </div>
                <div class="chatting-records flex-1">
                    <div class="flex records animate__animated animate__fadeIn" v-for="(records, idx) in recordsList"
                        :key="idx">
                        <template v-if="records.type === 'reply'">
                            <div class="avatar" :style="{ backgroundImage: `url(${replyAvatar})` }"></div>
                            <div class="flex-1 records-reply">
                                <div class="reply">{{ records.message }} </div>
                            </div>
                        </template>
                        <template v-if="records.type === 'deliver'">
                            <div class="flex-1 records-deliver">
                                <div class="deliver">{{ records.message }}
                                </div>
                            </div>
                            <div class="avatar" :style="{ backgroundImage: `url(${deliverAvatar})` }"></div>
                        </template>
                    </div>
                </div>
                <div class="entry-bar flex flex-col">
                    <div class="flex entry-bar_container justify-between items-center">
                        <div class="entry-bar_container_icon">
                            <span class="iconfont icon-yuyin"></span>
                        </div>
                        <input class="entry-bar_container_input flex-1 rounded-lg"
                            @keydown.enter="useCreateRecords('deliver')" v-model="deliverRecords" />
                        <div class="entry-bar_container_icon">
                            <span class="iconfont icon-biaoqing"></span>

                        </div>
                        <div class="entry-bar_container_icon">
                            <span class="iconfont icon-add"></span>

                        </div>
                    </div>
                    <div class="entry-bar_line mx-auto"></div>
                </div>
            </div>
        </div>
        <div class="control py-3 fixed pt-20 right-0   top-0 h-full bg-white w-full animate__animated animate__faster "
            :class="[controlClass]" v-if="controlVisiable">
            <div class="text-center flex flex-col gap-4 mb-10">
                <div>头像</div>
                <div> <input type="file" @change="(e) => useChooseAvatar(e, 'reply')" accept="image/*"></div>
                <div>昵称</div>
                <div> <input type="text" class="border px-3 py-2" v-model="replyName"></div>
                <div>时间</div>
                <div>
                    <input type="time" class="border px-3 py-2" v-model="time">
                </div>
                <div>输入</div>
                <div>
                    <input type="text" v-model="replyRecords" class="border px-3 py-2">
                </div>
                <div><button @click="useCreateRecords('reply')" class="border px-3 py-2">发送</button></div>
            </div>
            <div class=" text-center flex flex-col gap-4">
                <div>头像</div>
                <div> <input type="file" @change="(e) => useChooseAvatar(e, 'deliver')" accept="image/*"></div>
            </div>

            <button class="border p-3 absolute bottom-4 left-1/2 -translate-x-1/2"
                @click="useSwitchControl(false)">关闭</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
// import { useDBStore } from '@/store/modules/database'
// const db = useDBStore()
// 
const width = ref(355)
const historyStyle = computed(() => {
    return {
        '--w': `${width.value}px`
    }
})
type RecordsType = 'reply' | 'deliver'
interface RecordsItems {
    type: RecordsType,
    message: string
}
// 
const controlVisiable = ref(false)
const controlClass = ref('animate__slideInRight')
const useSwitchControl = (status: boolean) => {
    if (status) {
        controlVisiable.value = status
        controlClass.value = 'animate__slideInRight'
    } else {
        controlClass.value = 'animate__slideOutRight'
        setTimeout(() => {
            controlVisiable.value = status
        }, 500);
    }
}
const replyName = ref('三文鱼')
const replyAvatar = ref('https://e282fa74745a7e0c24069d7d4708fc49a8ba23e1.mdnplay.dev/zh-CN/docs/Web/HTML/Element/img/favicon144.png')
const deliverAvatar = ref('https://e282fa74745a7e0c24069d7d4708fc49a8ba23e1.mdnplay.dev/zh-CN/docs/Web/HTML/Element/img/favicon144.png')
const useChooseAvatar = (event: Event, type: RecordsType) => {
    const reader = new FileReader()
    const file = (event.target as HTMLInputElement).files
    file && reader.readAsDataURL(file[0])
    reader.onload = (e) => {
        if (type === 'reply') {
            replyAvatar.value = e.target?.result as string
        }
        if (type === 'deliver') {
            deliverAvatar.value = e.target?.result as string
        }
    }
}
const replyRecords = ref('')
const deliverRecords = ref('')
const recordsList = ref<RecordsItems[]>([
    {
        type: 'deliver',
        message: '讲个笑话'
    }
])
const useCreateRecords = (type: RecordsType) => {
    let message = ''
    if (type === 'reply') {
        message = replyRecords.value
        if(!message.trim()) return
        replyRecords.value = ''
        // useSwitchControl(false)
    } else {
        message = deliverRecords.value
        if(!message.trim()) return
        deliverRecords.value = ''
        if (message.trim() === '讲个笑话')fetchJoke()
    }
    recordsList.value.push({ type, message })
    nextTick(() => {
        const doms = document.querySelector('.chatting-records')
        doms?.children[doms?.children.length - 1].scrollIntoView({ behavior: 'smooth' }); // 或者 document.documentElement.scrollIntoView({ behavior: 'smooth' });
    })
}
const time = ref(`${new Date().getHours()}:${new Date().getMinutes()}`)
const fetchJoke = async () => {
    // const _principal = await db.principal.keys()
    // const intervalCreate = setInterval(() => {
    //     replyRecords.value = _principal.shift() as string
    //     useCreateRecords('reply')
    //     if (!_principal.length) clearInterval(intervalCreate)
    // }, 1000)
    fetch('https://api.vvhan.com/api/text/joke?type=json').then(async response => {
        const result = await response.json()
        if (result.success) {
            replyRecords.value = result.data.content
            useCreateRecords('reply')
        }
    })
}
fetchJoke()

</script>

<style scoped lang="scss">
@import '../styles/history.css';

.container-phone {
    width: var(--w);
    height: calc(var(--w) * 2532 / 1170);
    background-color: #ededed
}

.status-bar {
    padding: calc(var(--w)* 56 / 1170) calc(var(--w)* 50 / 1170) 0px;
    font-size: calc(var(--w) *52 / 1170);
    font-weight: bold;
}

.status-bar_time {
    padding-left: calc(var(--w) *52 / 1170);
}

.status-bar_status {
    gap: calc(var(--w) *20 / 1170);

    .iconfont {
        font-size: calc(var(--w) *55/1170);
    }

    .iconfont:nth-child(2n) {
        font-size: calc(var(--w) *46/1170);
    }

}

.status-bar_icon {
    height: calc(var(--w) *52/1170);
}

.title-bar {
    font-size: calc(var(--w) *65/1170);
    padding: calc(var(--w) *20/1170) calc(var(--w) *40/1170) calc(var(--w) *20/1170) calc(var(--w) *40/1170);
    border-bottom: calc(var(--w) *2/1170) solid #d5d5d5;
    font-weight: 560;

    .iconfont {
        font-size: calc(var(--w) *80/1170);
    }
}

.chatting-records {
    padding: calc(var(--w) *36/1170);
    overflow-y: scroll;
    overflow-x: hidden;
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
    background: url(https://e282fa74745a7e0c24069d7d4708fc49a8ba23e1.mdnplay.dev/zh-CN/docs/Web/HTML/Element/img/favicon144.png);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    width: calc(var(--w) *120/1170);
    height: calc(var(--w) *120/1170);
    border-radius: calc(var(--w) *14/1170);
    line-break: anywhere;
}

.reply {
    display: inline-block;
    min-height: calc(var(--w) *120/1170);
    background-color: #ffffff;
    padding: calc(var(--w) *15/1170) calc(var(--w) *40/1170);
    border-radius: calc(var(--w) *14/1170);
    font-size: calc(var(--w) *50/1170);
    line-break: anywhere;
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

.entry-bar_container {
    gap: calc(var(--w) *30/1170);
    margin-top: calc(var(--w) *10/1170);
}

.entry-bar_container_icon {
    width: calc(var(--w) *80/1170);

    .iconfont {
        font-size: calc(var(--w) *80/1170);
    }
}

.entry-bar_container_input {
    height: calc(var(--w) *115/1170);
    outline: none;
    padding: 0 calc(var(--w) *30/1170);
    font-size: calc(var(--w) *50/1170);

}
</style>