<template>
    <div
        class="secrecy w-full  py-4 flex-wrap  w-full max-w-screen-lg gap-2 px-2 mx-auto animate__animated animate__fadeIn">
        <div class="flex flex-col gap-3">
            <input type="text" v-model="dbTitle" placeholder="请输入标题" :disabled="status">
            <input type="text" v-model="dbPassworld" placeholder="请输入访问密码">
            <textarea v-model="dbContent" rows="6" placeholder="请输入存储内容" :disabled="status" />
            <button @click="useSubmit" class="px-6 py-2 mx-auto rounded-lg  bg-slate-200 "
                :class="[(!dbTitle || !dbPassworld || !dbContent) && !status ? 'cursor-not-allowed' : 'cursor-pointer']"
                :disabled="(!dbTitle || !dbPassworld || !dbContent) && !status">{{ status ? '解析' : '存储' }}</button>
        </div>

        <div class="gap-2 flex flex-col my-2 cursor-pointer">
            <div @click="useGetContent(s)" class="bg-slate-200 rounded-lg p-2" v-for="s in secrecy" :key="s">
                {{ s }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCryptoStore } from '@/store/modules/crypto';
import { useDBStore } from '@/store/modules/database'
import { ref } from 'vue';
const Crypto = useCryptoStore()
const db = useDBStore()
const dbTitle = ref('')
const dbPassworld = ref('')
const dbContent = ref('')
const status = ref(false)
const secrecy = ref<any[]>([])
const useGetSecrecy = () => {
    db.secrecy.keys().then(RES => {
        if (RES) secrecy.value = RES
    })
}
useGetSecrecy()
const useSubmit = async () => {
    console.log('submit');
    if (status.value) {
        try {
            const content: string = await db.secrecy.getItem(dbTitle.value) || ''
            dbContent.value = Crypto.decrypt(content, dbPassworld.value)
            status.value = false
        } catch (_) {
            alert('密码错误，解析失败！')
        }
    } else {
        await db.secrecy.setItem(dbTitle.value, Crypto.encrypt(dbContent.value, dbPassworld.value))
        dbTitle.value = ''
        dbPassworld.value = ''
        dbContent.value = ''
        useGetSecrecy()
    }
}

const useGetContent = (s: string) => {
    dbTitle.value = s
    dbPassworld.value = ''
    dbContent.value = ''
    status.value = true
}
</script>
<style>
.secrecy input,
textarea {
    padding: .5rem;
    border-radius: .5rem;
}
</style>