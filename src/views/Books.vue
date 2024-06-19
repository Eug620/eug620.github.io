<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-06-12 19:43:59
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-19 01:11:40
 * @FilePath     : /eug620.github.io/src/views/Books.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="books pt-2 flex flex-col h-full relative">
        <div class="w-full  py-4 flex flex-wrap  w-full max-w-screen-lg gap-2 px-2 mx-auto animate__animated animate__fadeIn"
            v-if="isShowCatalogue">
            <div v-for="book in books" @click="getChapter(book.path)"
                class="cursor-pointer rounded-lg p-4 float-left bg-slate-200" :key="book.path">{{
                    book.name }}</div>
        </div>
        <div class="flex-1 animate__animated animate__fadeIn" v-else>
            <div class="px-4 w-full max-w-screen-lg mx-auto animate__animated animate__fadeIn" v-if="!isShowContent">
                <div class="w-full py-2 relative text-center text-xl w-full  max-w-screen-lg mx-auto">
                    <span class="absolute left-0 top-2 text-base py-1 px-2 rounded-lg  bg-slate-200 cursor-pointer"
                        @click="useBack(true)">返回书架</span>
                    {{ books.find(v => v.path === active)?.name }}
                </div>
                <div v-for="item in compChapter" class="w-full py-2 cursor-pointer" :id="`catalogue${item.catalogue}`"
                    :class="[item.catalogue === activeCatalogue && 'text-rose-400']" :key="item.catalogue"
                    @click="getCatalogue(item.catalogue)">
                    {{ item.chapter }}
                </div>
            </div>
            <div class="px-4 h-full relative  flex flex-col w-full max-w-screen-lg mx-auto animate__animated animate__fadeIn"
                v-if="isShowContent">
                <div class="w-full py-1 text-center  text-xl mb-6" id="backCatalogue">

                    {{ content.name }}
                </div>
                <div class="flex-1 overflow-y-auto whitespace-pre-wrap pb-6">
                    {{ content.text && content.name && content.text.replace(content.name, '') }}
                    <div class="relative h-10 mt-4">
                        <span v-if="activeCatalogue !== compChapter[0].catalogue"
                            @click="getCatalogue(activeCatalogue - 1, true)"
                            class="absolute left-0  top-1/2 -translate-y-1/2 text-base py-1 px-2 rounded-lg  bg-slate-200 cursor-pointer">上一章</span>
                        <span
                            class="absolute -translate-x-1/2 -translate-y-1/2 	 left-1/2 top-1/2 py-1 text-base px-2 rounded-lg bg-slate-200 cursor-pointer"
                            @click="useBack()">返回目录</span>
                        <span v-if="activeCatalogue !== compChapter[compChapter.length - 1].catalogue"
                            @click="getCatalogue(activeCatalogue + 1, true)"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-base py-1 px-2 rounded-lg  bg-slate-200 cursor-pointer">下一章</span>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="isShowLoading" style="line-height: 50vh;"
            class="fixed top-0 left-0 bg-slate-100 w-full text-black h-full text-center animate__animated animate__fadeIn  opacity-50">
            加载中</div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, nextTick } from 'vue'
import { useDBStore } from '@/store/modules/database'
const db = useDBStore()
interface Books {
    name: string
    path: string
}
const books = ref<Books[]>([])
const active = ref('')
const activeCatalogue = ref(-1)
const bookChapter = new Map()
interface Content {
    index?: number
    name?: string
    text?: string
}
const content = ref<Content>({})
const isShowContent = ref(false)
const isShowLoading = ref(false)
const isShowCatalogue = ref(true)
const BaseURL = 'https://unpkg.com/e-bookstore@1.0.3'
onMounted(() => {
    watchEffect(() => {
        if (!isShowCatalogue.value) {
            if (!isShowContent.value) {
                nextTick(() => {
                    const doms = document.querySelector(`#catalogue${activeCatalogue.value}`)
                    doms && doms.scrollIntoView()
                })
            } else {
                nextTick(() => {
                    const doms = document.querySelector(`#backCatalogue`)
                    doms && doms.scrollIntoView()
                })
            }
        }
    })

})
fetch(`${BaseURL}/index.json`).then(async res => {
    books.value = await res.json()
})

const compChapter = computed(() => {
    return bookChapter.get(active.value)
})

const getChapter = async (path: any) => {
    if (bookChapter.get(path)) {
        activeCatalogue.value = db.get({ path: `Books.${path}` })
        active.value = path
        isShowCatalogue.value = false
        return
    }

    const dbDatas = await db.books.getItem(path)
    if (dbDatas) {
        bookChapter.set(path, dbDatas)
        activeCatalogue.value = db.get({ path: `Books.${path}` })
        active.value = path
        isShowCatalogue.value = false
        return
    }

    isShowLoading.value = true
    fetch(`${BaseURL}/${path}/index.json`).then(async res => {
        const result = await res.json()
        bookChapter.set(path, result)
        // db.set({ path, value: result })
        // indexDB.add(path, result)
        await db.books.setItem(path, result)
        db.set({ path: `Books.${path}`, value: 0 })
        active.value = path
    }).finally(() => {
        isShowCatalogue.value = false
        isShowLoading.value = false
    })
}

const getCatalogue = (catalogue: any, flag?: boolean) => {
    isShowCatalogue.value = false
    // if (catalogue === activeCatalogue.value) {
    //     isShowContent.value = true
    //     return
    // }
    isShowLoading.value = true
    fetch(`${BaseURL}/${active.value}/${catalogue}.json`).then(async res => {
        const result = await res.json()
        activeCatalogue.value = catalogue
        isShowContent.value = true
        content.value = result[0]
        db.set({ path: `Books.${active.value}`, value: catalogue })
        if (flag) {
            nextTick(() => {
                const doms = document.querySelector(`#backCatalogue`)
                doms && doms.scrollIntoView()
            })
        }
    }).finally(() => {
        isShowLoading.value = false
    })
}

const useBack = (falg?: boolean) => {
    isShowContent.value = false
    if (falg) {
        isShowCatalogue.value = true
        activeCatalogue.value = -1
        content.value = {}
    }
}
</script>

<style></style>