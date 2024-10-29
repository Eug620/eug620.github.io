<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-27 00:39:28
 * @FilePath     : /eug620.github.io/src/views/Principal.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Footers from '@/components/Footers.vue'
import { useDBStore } from '@/store/modules/database'
import Typed from "typed.js"

// import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1';
// console.log(pipeline);
const db = useDBStore()
const principal = ref<any[]>([])
const content = ref('')
let typedInstances: any = ref(null)



const useGetPrincipal = async () => {
  const _principal = await db.principal.keys()
  principal.value.push(..._principal)
  fetch('https://api.vvhan.com/api/text/love?type=json').then(async res => {
    let result = await res.json()
    content.value = result.data.content
    principal.value.push(content.value)
    db.principal.setItem(result.data.content, Date.now())
    initTyped()
  })
}
const initTyped = () => {
  typedInstances.value = new Typed('.base-typed-container', {
    strings: principal.value.reverse(),
    typeSpeed: 80,
    loop: true,
    cursorChar: '',
    fadeOut: true,
    shuffle: true,
    backDelay: 3000,
    startDelay: 1000,
    onStringTyped: function () {

    }
  });
}
onMounted(() => {
  useGetPrincipal()

})

// console.log(pipeline);
// const demo = async () => {
//   const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/cmu-arctic-xvectors-extracted/resolve/main/speaker_embeddings.bin'
//   const synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false })
//   console.log(synthesizer);

//   const out = await synthesizer('The software will automatically detect similar blocks ', { speaker_embeddings })
//   console.log(pipeline, 'pipeline');
// }


</script>
<template>
  <div class="text-center h-full items-center flex flex-col py-4">
    <div class="text-center max-w-screen-lg mx-auto flex-1 h-full px-10 content-center base-typed-container"></div>
    <Footers class=" max-w-screen-lg mx-auto my-4 animate__animated animate__slow animate__fadeInUp" />
  </div>
</template>

<style scoped>

</style>
