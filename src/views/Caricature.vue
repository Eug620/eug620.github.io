<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2025-01-18 21:56:42
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-01-18 23:14:40
 * @FilePath     : /eug620.github.io/src/views/Caricature.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="caricature flex flex-col h-full pt-2 gap-2">
        <input class="caricature-search border w-full  max-w-screen-lg outline-none mx-auto rounded-xl p-2 px-4"
            @keydown.enter="useSearch('name')" type="text" v-model.trim="searchOptions.name">
        <div class="caricature-container max-w-screen-lg w-full  mx-auto overflow-scroll flex flex-col flex-1"
            :class="{ 'px-2': !searchShow.item_id }">
            <div v-if="!searchShow.name && !searchShow.book_id && !searchShow.item_id" class="text-center">请输入并回车检索
            </div>
            <!-- 目录 -->
            <div v-if="searchShow.name" class=" w-full ">
                <div class="border mb-4 mx-auto p-3 rounded-xl items-center flex gap-4"
                    v-for="name in searchResults.name" :key="name.book_id" @click="useSearch('book_id', name.book_id)">
                    <div class="w-20 ">
                        <img class="w-full rounded" :src="name.cover" alt="">
                    </div>
                    <div class="flex-1">
                        <div class="text-lg	font-bold	">{{ name.title }}</div>
                        <div class="text-sm	my-1">
                            <span class="font-medium">{{ name.author }}</span>
                            <span class="ml-2 ">{{ name.type }}</span>
                        </div>
                        <div class="text-xs		">{{ name.intro }}</div>
                    </div>
                </div>
            </div>
            <!-- 章节 -->
            <div v-if="searchShow.book_id" class=" max-w-screen-lg w-full flex-1">
                <div class="border max-w-screen-lg w-full   mb-4 px-4 py-3 rounded-xl"
                    v-for="book_id in searchResults.book_id" :key="book_id.item_id"
                    @click="useSearch('item_id', book_id.item_id)">
                    {{ book_id.title }}
                </div>
            </div>
            <!-- 内容 -->
            <div v-if="searchShow.item_id">
                <div v-for="item_id in searchResults.item_id" :key="item_id">
                    <img class="w-full" :src="item_id" alt="">
                </div>
            </div>
            <div @click="useBack" v-if="!searchShow.name && (searchShow.book_id || searchShow.item_id)"
                class="bg-white rounded-xl fixed bottom-10 right-10 px-4 py-2">返回</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const searchOptions = reactive({
    name: '',
    book_id: '',
    item_id: '',
})
interface NameType {
    author: string
    intro: string
    title: string
    type: string
    book_id: string
    cover: string

}
interface BookType {
    item_id: string
    title: string
    url_content: string
}
interface Result {
    name: NameType[]
    book_id: BookType[]
    item_id: string[]
}
const searchResults = reactive<Result>({
    name: [],
    book_id: [],
    item_id: [],
})
const searchShow = reactive({
    name: false,
    book_id: false,
    item_id: false,
})
type SearchType = 'name' | 'book_id' | 'item_id'
const useSearch = (type: SearchType, id?: string) => {
    if (type !== 'name') {
        searchOptions[type] = id as string
    }
    if (!searchOptions[type]) return
    fetch(` https://www.hhlqilongzhu.cn/api/manhua_fanqie.php?${type}=${searchOptions[type]}`).then(async (response) => {
        const result = await response.json()
        if (result.code == 200) {
            searchResults[type] = result.data?.images || result.data
            searchShow.name = false
            searchShow.book_id = false
            searchShow.item_id = false
            searchShow[type] = true
        }
    })
}

const useBack = () => {
    if (searchShow.item_id) {
        searchShow.item_id = false
        searchShow.book_id = true
    } else if (searchShow.book_id) {
        searchShow.book_id = false
        searchShow.name = true
    }
}
</script>

<style></style>