<template>
    <div>
        <!-- 方式1 -->
        <div class="bodys" v-if="type == 1">
            <section class="g-img1">IMG1</section>
            <section class="g-img2">IMG2</section>
            <section class="g-img3">IMG3</section>
        </div>


        <!-- 方式2 -->
        <div class="bodys" v-if="type == 2">
            <div class="section1">
                <div class="text">PARALLAX</div>
            </div>

            <div class="section2">
                <div class="text">NORMAL</div>
            </div>
        </div>

        <!-- 方式3 -->
        <div class="parallax" v-if="type == 3">
            <img class="parallax__bg"
                src="https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/a44ef1e6-6696-4ff9-acdd-45b771fd3fec.png"
                alt="" />
            <img class="parallax__dust" src="../assets/Scroll/img1.png" alt="" />
            <img class="parallax__luna" src="../assets/Scroll/img2.png" alt="" />
            <img class="parallax__rays" src="../assets/Scroll/img3.png" alt="" />
        </div>


        <!-- tab -->
        <div class="fixed left-1/2 bottom-10 z-10 bg-white flex -translate-x-1/2 px-6 py-3 rounded-full gap-4">
            <div @click="type = 1" :class="type == 1 && 'text-orange-500'">方式1</div>
            <div @click="type = 2" :class="type == 2 && 'text-orange-500'">方式2</div>
            <div @click="type = 3" :class="type == 3 && 'text-orange-500'">方式3</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const type = ref(1)
</script>
<style lang="scss" scoped>
.tabs {}

// 方式1
section {
    height: 100vh;
    background: rgba(0, 0, 0, .7);
    color: #fff;
    line-height: 100vh;
    text-align: center;
    font-size: 20vh;
}

.g-img1 {
    background-image: url("https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/a44ef1e6-6696-4ff9-acdd-45b771fd3fec.png");

    //🚀🔥重点看这里
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
}

.g-img2 {
    background-image: url("https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/f2e3091a-6ae5-4e64-96e0-47dfc56ac63c.jpg");

    //🚀🔥重点看这里
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
}

.g-img3 {
    background-image: url("https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/a44ef1e6-6696-4ff9-acdd-45b771fd3fec.png");

    //🚀🔥重点看这里
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
}

// 方式2
.bodys {
    width: 100vw;
    height: 100vh;
    margin: 0;
    background: #222;

    /* 设置景深，并且开启3D效果 */
    perspective: 1px;
    transform-style: preserve-3d;

    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    left: 0;
}

.bodys::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.section1::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/a44ef1e6-6696-4ff9-acdd-45b771fd3fec.png") top center;
    background-size: cover;

    /* 将图片图层换到-1图层，并放大图片 */
    transform: translateZ(-1px) scale(2.2);
}

.section1,
.section2 {
    width: 100%;
    min-height: 100vh;
    position: relative;

    //保留字类的3D属性
    transform-style: preserve-3d;

}

.section2 {
    background: rgb(68, 35, 19);
}

//给文字添加样式以及定位
.text {
    top: 30%;
    left: 50%;
    position: absolute;
    font-size: 15vw;
    font-family: 'Franklin Gothic Heavy';
    font-size: 15vw;
    color: white;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), 5px 5px 70px rgba(255, 255, 255, 0.5);
    transform: scale(1, 1.1) translate(-50%, 10%);
}



// 方式3
.parallax {
    contain: paint;
    position: relative;
    z-index: 0;
    min-height: 75vh;
    display: grid;
    grid-template-areas: "stack";
}


.parallax>* {
    grid-area: stack;
    animation: parallax linear;
    animation-timeline: scroll();
}

@keyframes parallax {
    to {
        transform:
            translateY(calc(var(--parallax-speed) * 200px));
    }
}

.parallax__bg {
    height: 100%;
}

.parallax__dust {
    --parallax-speed: -20;
    z-index: 2;
}

.parallax__luna {
    --parallax-speed: 50;
    z-index: 3;
}

.parallax__rays {
    --parallax-speed: 100;
    z-index: 4;
}
</style>
