<template>
    <div
        class="secrecy w-full  py-4 flex-wrap  w-full max-w-screen-lg gap-2 px-2 mx-auto animate__animated animate__fadeIn">
        <div class="flex flex-col gap-3">
            <input type="text" v-model="dbTitle" placeholder="请输入标题" :disabled="status">
            <input type="text" v-model="dbPassworld" placeholder="请输入访问密码">
            <textarea v-model="dbContent" rows="6" :placeholder="status ? '解析可查看存储内容' : '请输入存储内容'" :disabled="status" />
            <div class="text-center ">
                <button @click="useSubmit" class="px-6 py-2  rounded-lg  bg-slate-200 "
                    :class="[(!dbTitle || !dbPassworld || !dbContent) && !status ? 'cursor-not-allowed' : 'cursor-pointer']"
                    :disabled="(!dbTitle || !dbPassworld || !dbContent) && !status">{{ status ? '解析' : '存储' }}</button>
                <button @click="useNewSave" class="px-6 py-2 ml-4 rounded-lg  bg-slate-200 cursor-pointer"
                    v-if="dbID && !status">另存</button>
                <button @click="useCancel" class="px-6 py-2 ml-4 rounded-lg  bg-slate-200 cursor-pointer">{{ status ?
                    '取消' : '清空'}}</button>
                <button @click="useDelete" class="px-6 py-2 ml-4 rounded-lg  bg-slate-200 text-rose-500 cursor-pointer"
                    v-if="dbID && !status">删除</button>
            </div>

        </div>

        <div class="gap-2 flex flex-col my-2 cursor-pointer">
            <div @click="useGetContent(s)" class="bg-slate-200 rounded-lg p-2" v-for="s in secrecy" :key="s">
                {{ s?.key }}
                <span class=" float-right">{{ dayjs(s?.timeStamp).format('YYYY-MM-DD HH:mm:ss') }} </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { useCryptoStore } from '@/store/modules/crypto';
import { useDBStore } from '@/store/modules/database'
import { ref } from 'vue';
const Crypto = useCryptoStore()
const db = useDBStore()
const dbTitle = ref('')
const dbID = ref('')
const dbPassworld = ref('')
const dbContent = ref('')
const status = ref(false)
const secrecy = ref<any[]>([])
const newData = ref(false)
const useGetSecrecy = async () => {
    try {
        const keys = await db.secrecy.keys()
        secrecy.value = await Promise.all(keys.map((id: string) => {
            return db.secrecy.getItem(id)
        }))
    } catch (_) {
        db.secrecy.clear()
    }
}
useGetSecrecy()
const useNewSave = () => {
    newData.value = true
    useSubmit()
}
const useSubmit = async () => {
    console.log('submit');
    if (status.value) {
        try {
            const content: any = await db.secrecy.getItem(dbID.value)
            dbContent.value = Crypto.decrypt(content?.value, dbPassworld.value)
            if (dbContent.value ){
                status.value = false
            } else {
                throw new Error()
            }
        } catch (_) {
            alert('密码错误，解析失败！')
        }
    } else {
        if (dbID.value && !newData.value) {
            await db.secrecy.setItem(dbID.value, {
                id: dbID.value,
                key: dbTitle.value,
                value: Crypto.encrypt(dbContent.value, dbPassworld.value),
                timeStamp: Date.now()
            })
        } else {
            const id = uuidv4()
            await db.secrecy.setItem(id, {
                id,
                key: dbTitle.value,
                value: Crypto.encrypt(dbContent.value, dbPassworld.value),
                timeStamp: Date.now()
            })
        }
        useCancel()
        useGetSecrecy()
    }
}

const useGetContent = (s: any) => {
    dbID.value = s?.id
    dbTitle.value = s?.key
    dbPassworld.value = ''
    dbContent.value = ''
    status.value = true
}
const useDelete = async () => {
    if (dbID.value) {
        await db.secrecy.removeItem(dbID.value)
        useCancel()
        useGetSecrecy()
    }
}
const useCancel = () => {
    dbID.value = ''
    status.value = false
    newData.value = false
    dbTitle.value = ''
    dbPassworld.value = ''
    dbContent.value = ''
}
</script>
<style>
.secrecy input,
textarea {
    padding: .5rem;
    border-radius: .5rem;
}
</style>