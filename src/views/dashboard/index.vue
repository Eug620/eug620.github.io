<script setup lang="ts">
import { ref } from 'vue';

const content = ref('')
fetch('https://api.vvhan.com/api/text/love?type=json').then(async res => {
  let result = await res.json()
  content.value = result.data.content
})

</script>

<template>
  <div class="text-center w-screen	h-screen	leading-10  py-10 bg-zinc-300">
    <RouterLink to="/about" class="text-sky-500 underline fixed bottom-10 right-10">去关于</RouterLink>
    <h2>{{ content }}</h2>
  </div>
</template>

<style scoped></style>
