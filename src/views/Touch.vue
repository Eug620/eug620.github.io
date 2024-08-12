<template>
    <div class="touch fixed w-full h-full">
        <div class="fixed box" @click="count++" :style="{ transform: `translate(${left}px,${top}px)` }">
            <div class="w-12 h-12 font-bold leading-10 border border-slate-400 text-center rounded-full touch-pointer cursor-pointer hover:bg-red-400"
                >
                {{ isClass ? 'ಥ_ಥ' : '⚆_⚆' }}
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // 保证min是整数
    max = Math.floor(max); // 保证max是整数
    return Math.floor(Math.random() * (max - min + 1)) + min; // 返回介于min和max之间的整数
}
const top = ref(0)
const left = ref(0)
const isClass = ref(false)
let count = ref(0)
let interval: any
onMounted(() => {
    const { clientWidth, clientHeight } = document.body || {}
    document.addEventListener('mousemove', ({ clientX, clientY }) => {
        if (Math.abs(clientX - left.value) <= 100 && Math.abs(clientY - top.value) <= 100) {
            if (interval) clearInterval(interval)
            isClass.value = true
            left.value = getRandomInt(0 + 30, clientWidth - 30)
            top.value = getRandomInt(0 + 30, clientHeight - 30)
            interval = setInterval(() => {
                isClass.value = false
                left.value = getRandomInt(0, clientWidth)
                top.value = getRandomInt(0, clientHeight)
            }, 3000)
        }
    })
    interval = setInterval(() => {
        left.value = getRandomInt(0, clientWidth)
        top.value = getRandomInt(0, clientHeight)
    }, 3000)
})
</script>

<style lang="scss" scoped>
@keyframes Scales {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.touch {
    .box {
        transition: all .4s;
    }

    &-pointer {
        animation: Scales .8s linear infinite;
    }
}
</style>