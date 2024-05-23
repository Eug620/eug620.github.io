<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-23 22:11:00
 * @FilePath     : /eug620.github.io/src/views/Principal.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->

<script lang="ts" setup>
import { ref } from 'vue';
// import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1';
// console.log(pipeline);



const content = ref('')
fetch('https://api.vvhan.com/api/text/love?type=json').then(async res => {
  let result = await res.json()
  content.value = result.data.content
})
// console.log(pipeline);
// const demo = async () => {
//   const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/cmu-arctic-xvectors-extracted/resolve/main/speaker_embeddings.bin'
//   const synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false })
//   console.log(synthesizer);

//   const out = await synthesizer('The software will automatically detect similar blocks ', { speaker_embeddings })
//   console.log(pipeline, 'pipeline');
// }

// demo()



</script>
<template>
  <div class="text-center h-full items-center flex ">
    <h2 class="text-center w-full">{{ content }}</h2>
  </div>
</template>

<style scoped></style>
