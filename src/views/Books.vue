<template>
    <div class="books pt-5 flex flex-col h-full relative">
        <div class="w-full text-center py-4 text-xl">
            <div v-for="book in books" @click="getChapter(book.path)" class="cursor-pointer" :key="book.path">{{ book.name }}</div>
        </div>
        <div class=" flex-1 overflow-y-auto w-full max-w-screen-lg mx-auto">
            <div class="px-4 overflow-y-auto" v-show="!isShowContent">
                <div v-for="item in compChapter" class="w-full py-1 cursor-pointer" :class="[ item.catalogue === activeCatalogue && 'text-rose-400']" :key="item.catalogue"
                    @click="getCatalogue(item.catalogue)">
                    {{ item.chapter }}
                </div>
            </div>
            <div class="px-4 h-full relative  flex flex-col" v-show="isShowContent">
                <div class="w-full py-1 text-center text-base">
                    <span class="absolute left-4 top-0 py-1 px-2 rounded-lg bg-slate-200 cursor-pointer"
                        @click="isShowContent = false">返回目录</span>
                    {{ content.name }}
                </div>
                <div class="flex-1 overflow-y-auto whitespace-pre-wrap pb-6">
                    {{ content.text && content.name && content.text.replace(content.name, '') }}
                </div>
            </div>
        </div>
        <div v-if="isShowLoading" style="line-height: 50vh;" class="absolute top-0 left-0 bg-slate-500 opacity-50 w-full text-black h-full text-center">加载中</div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
interface Books {
    name: string
    path: string
}
const books = ref<Books[]>([])
const active = ref('')
const activeCatalogue = ref('')
const bookChapter = new Map()
interface Content {
    index?: number
    name?: string
    text?: string
}
const content = ref<Content>({})

const isShowContent = ref(false)
const isShowLoading = ref(false)
fetch('https://unpkg.com/e-bookstore@1.0.0/index.json').then(async res => {
    books.value = await res.json()
})

const compChapter = computed(() => {
    return bookChapter.get(active.value)
})

const getChapter = (path:any) => {
    if (bookChapter.get(path)) return
    isShowLoading.value = true
    fetch(`https://unpkg.com/e-bookstore@1.0.0/${path}/index.json`).then(async res => {
        const result = await res.json()
        bookChapter.set(path, result)
        active.value = path
    }).finally(() => {
        isShowLoading.value = false
    })
}

const getCatalogue = (catalogue:any) => {
    if (catalogue === activeCatalogue.value) {
        isShowContent.value = true
        return
    }
    isShowLoading.value = true
    fetch(`https://unpkg.com/e-bookstore@1.0.0/${active.value}/${catalogue}.json`).then(async res => {
        const result = await res.json()
        activeCatalogue.value = catalogue
        isShowContent.value = true
        content.value = result[0]
    }).finally(() => {
        isShowLoading.value = false
    })
}
</script>

<style></style>