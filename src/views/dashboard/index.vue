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
  <div>
    <RouterLink  to="/about">关于</RouterLink >
      <div v-for="(v,k) in ipInfo.info ">
        {{ k}}: {{ v }}
      </div>
       
      <div v-if="ipInfo.ip">ip: {{ ipInfo.ip }}</div>
  </div>
</template>

<style scoped>

</style>
