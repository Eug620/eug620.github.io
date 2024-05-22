<script setup lang="ts">
import { reactive } from 'vue';

const ipInfo = reactive({
  ip: undefined,
  info: {}
})
fetch('https://api.vvhan.com/api/ipInfo').then(async res => {
  let result = await res.json()
  ipInfo.info = result.info
  ipInfo.ip = result.ip
})

</script>

<template>
  <div class="text-center w-screen	h-screen leading-10 py-10 bg-zinc-300">
    <RouterLink to="/dashboard" class="text-sky-500 underline fixed bottom-10 right-10">去首页</RouterLink>
        <div v-for="(v, k) in ipInfo.info ">
          {{ k }}: {{ v }}
        </div>

        <div v-if="ipInfo.ip">ip: {{ ipInfo.ip }}</div>
  </div>
</template>

<style scoped></style>
