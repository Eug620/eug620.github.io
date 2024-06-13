<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-06-08 11:21:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-08 13:03:56
 * @FilePath     : /eug620.github.io/src/views/Animal.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="Animal">
        
        <div class="Animal_img">
            <div v-for="(img, i) in imgAry" :key="i" :style="{ transform: `rotateZ(${30 * (idx- i)- 135}deg)` }">
                <img :src="img.src" alt=""
                    :style="{ transform: `rotateZ(${360 - 30 * (idx- i) + 135}deg)` }">
            </div>
        </div>
        <div class="Animal_act">
            <div class="Animal_act-name">{{ imgAry[idx%12].name}}</div>
            <!-- <div>{{ imgAry[idx%12]?.people || '暂无' }}</div> -->
        </div>
        <img src="" alt="">
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const imgAry = ref([
    {
        name: '子鼠',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_1.png'
    },
    {
        name: '丑牛',
        src :'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_2.png'
    },
    {
        name: '寅虎',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_3.png'
    },
    {
        name: '卯兔',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_4.png'
    },
    {
        name: '辰龙',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_5.png'
    },
    {
        name: '巳蛇',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_6.png'
    },
    {
        name: '午马',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_7.png'
    },
    {
        name: '未羊',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_8.png',
        people: '老马'
    },
    {
        name: '申猴',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_9.png'
    },
    {
        name: '酉鸡',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_10.png'
    },
    {
        name: '戌狗',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_11.png',
        people: '潘宏'
    },
    {
        name: '亥猪',
        src: 'https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Animal_12.png'
    },
])
let idx = ref(0)

onMounted(() => {
    setInterval(() => {
        idx.value ++ 
    },2000)
})

</script>

<style>
.Animal {
    height: 100%;
}

.Animal_img {
}

.Animal_img div {
    width: 4rem;
    position: fixed;
    left: calc(50% + 8rem);
    top: calc(50% + 8rem);
    transform-origin: -8rem -8rem;
    transition: all linear .5s;
    transform: translateX(-50%, -50%);
}
@media screen and (max-width:915px) {
    .Animal_img div {
    width: 2rem;
    position: fixed;
    left: calc(50% + 4rem);
    top: calc(50% + 4rem);
    transform-origin: -4rem -4rem;
    transition: all linear .5s;
    transform: translateX(-50%, -50%);
}
}
.Animal_img img{
    transition: all linear .5s;
    
} 
.Animal_act{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.Animal_act-name{
    text-align: center;
}
</style>