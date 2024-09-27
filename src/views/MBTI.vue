<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-09-27 22:07:52
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-09-28 01:04:50
 * @FilePath     : /eug620.github.io/src/views/MBTI.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="mbti p-4  md:w-1/2 w-full m-auto text-sm h-full leading-6">
        <div class="flex text-center px-10 font-black gap-10 text-4xl h-full items-center content-around" v-if="Type === PageType.index">
            <div class="flex-1 mimesis md:py-40 py-10" @click="useAnswer(0)">28题</div>
            <div class="flex-1 mimesis md:py-40 py-10" @click="useAnswer(1)">93题</div>
        </div>
        <div v-if="Type === PageType.answer">
            <div class="mb-6 font-black text-xl">({{ AnswerClickIdx + 1 }}/{{ MBTI_RESULT.Answer[AnswerIdx]?.length }}) {{
            currentAnswer?.title }}</div>

            <div class="mimesis mb-4 p-4 !text-left text-xl" @click="useSetAnswer(solution)"
                v-for="solution in currentAnswer?.solution" :key="solution.id">{{ solution.msg }}</div>
        </div>
        <div v-if="Type === PageType.result" class=" animate__animated animate__fadeIn">

            <div class=" items-center mb-6">
                <img class="md:h-60 h-40 float-right"
                    :src="`https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/${currentResult?.type?.img}`"
                    alt="">
                <div class="flex-1">
                    <div class="text-4xl my-4 font-black animate__animated animate__bounce"> {{ ResultKey }}</div>
                    <div class="text-xl my-4 font-black"> {{ currentResult?.type?.txt }}</div>
                    <div class=" my-2 indent-6"> {{ currentResult?.type?.desc }}</div>
                    <div class="indent-6"> {{ currentResult?.type?.nature }}</div>
                </div>
                
            </div>
            <div class="my-2 indent-6">男性占比:{{ (currentResult?.charts?.man * 100).toFixed(2) }}%</div>
            <div class="my-2 indent-6">女性占比:{{ (currentResult?.charts?.woman * 100).toFixed(2) }}%</div>
            <div class="my-2 indent-6">总占比:{{ (currentResult?.charts?.total * 100).toFixed(2) }}%</div>
            <div class="my-3 indent-6" v-for="preference in currentResult?.preference" :key="preference">{{
            preference }}</div>
            <div class="font-black text-xl my-4 text-center">代表人物</div>
            <div class="border rounded-md p-4">
                <div class="py-2  " v-for="person in currentResult?.person" :key="person.name">
                    <div class="my-2 font-black">{{ person.name }}</div>
                    <div class=" indent-6">
                        {{ person?.msg }}

                    </div>
                </div>
            </div>
            <div class="font-black text-xl my-4 text-center">优点</div>
            <div class="border rounded-md p-4">
                <div class="py-2  " v-for="youdian in currentResult?.youdian" :key="youdian.name">
                    <div class="my-2 font-black">{{ youdian.name }}</div>
                    <div class=" indent-6">
                        {{ youdian?.msg }}

                    </div>
                </div>
            </div>
            <div class="font-black text-xl my-4 text-center">弱点</div>
            <div class="border rounded-md p-4">
                <div class="py-2 " v-for="ruodian in currentResult?.ruodian" :key="ruodian.name">
                    <div class="my-2 font-black">{{ ruodian.name }}</div>
                    <div class=" indent-6">
                        {{ ruodian?.msg }}

                    </div>
                </div>
            </div>

            <div v-for="fee in feeling" :key="fee.value">
                <div class="font-black text-xl my-4 text-center">{{ fee.label }}</div>
                <div class="border rounded-md p-4">
                    <div class="indent-6" v-for="love in currentResult?.feeling?.[fee.value]?.love" :key="love">{{ love
                        }}</div>
                    <div class="py-2 " v-for="(items, idx) in currentResult?.feeling?.lianai?.items" :key="idx">
                        <div class="my-2 font-black">{{ items.title }}</div>
                        <div class="indent-6" v-for="content in items?.content" :key="content">{{ content }}</div>
                    </div>
                </div>
            </div>

            <div v-for="plan in planning" :key="plan.value">

                <div class="font-black text-xl my-4 text-center">{{ plan.label }}</div>
                <div class="border rounded-md p-4">
                    <div class="indent-6">{{ currentResult?.planning?.[plan.value]?.desc
                        }}</div>


                    <div class="py-2 " v-for="(items, idx) in currentResult?.planning?.[plan.value]?.items" :key="idx">
                        <div class="my-2 font-black">{{ items.title }}</div>
                        <div class="indent-6" v-for="content in items?.content" :key="content">{{ content }}</div>
                    </div>
                </div>
            </div>

            <!-- {{ currentResult }} -->
        </div>

        <div v-if="Type !== PageType.index" @click="Type = PageType.index"
            class="mimesis px-4 py-2 fixed bottom-4 right-4">返回</div>

    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
const MBTI_RESULT = reactive<any>({
    Answer: [],
    AnswerResult: {}
})

fetch('https://cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/MBTI.json').then(async (responses) => {
    const res = await responses.json()
    MBTI_RESULT.Answer = res.Answer
    MBTI_RESULT.AnswerResult = res.AnswerResult
})

enum PageType {
    answer = "answer",
    result = "result",
    index = "index",
}
const feeling = [
    {
        label: '恋爱',
        value: 'lianai'
    },
    {
        label: '亲子',
        value: 'qinzi'
    },
    {
        label: '友谊',
        value: 'youyi'
    }
]
const planning = [
    {
        label: '职业道路',
        value: 'daolu'
    },
    {
        label: '工作习惯',
        value: 'xiguan'
    },
]
const Type = ref<PageType>(PageType.index)
const AnswerIdx = ref<number>(0)
const AnswerClickIdx = ref<number>(0)
const Result = ref<string[]>([])
const ResultKey = ref<string>('')
const currentAnswer = computed(() => {
    return MBTI_RESULT.Answer[AnswerIdx.value][AnswerClickIdx.value]
})
const currentResult = computed(() => {
    return MBTI_RESULT.AnswerResult[ResultKey.value]
})
const useAnswer = (idx: number) => {
    Type.value = PageType.answer
    AnswerIdx.value = idx
    AnswerClickIdx.value = 0
    Result.value = []
    ResultKey.value = ''
}

const useSetAnswer = (solution: { id: string, msg: string }) => {
    Result.value[AnswerClickIdx.value] = solution.id
    if (AnswerClickIdx.value === MBTI_RESULT.Answer[AnswerIdx.value]?.length - 1) {
        getKeys(Result.value)
        Type.value = PageType.result
        return
    }
    AnswerClickIdx.value++
}

function getProgress(score: any) {
    try {
        function func(k: string, n: string) {
            return score[k] > score[n] ? ((score[k] - score[n]) / (score[k] + score[n]) * 100) : 0
        }
        return {
            e: func('e', 'i'),
            i: func('i', 'e'),
            n: func('n', 's'),
            s: func('s', 'n'),
            f: func('f', 't'),
            t: func('t', 'f'),
            j: func('j', 'p'),
            p: func('p', 'j'),
        }
    } catch (_) {
        return {
            e: 0,
            i: 0,
            n: 0,
            s: 0,
            f: 0,
            t: 0,
            j: 0,
            p: 0,
        }
    }
}
function getKeys(answer: string[]) {
    let score: any = {
        e: 0,
        i: 0,
        n: 0,
        s: 0,
        f: 0,
        t: 0,
        j: 0,
        p: 0,
    }
    answer.forEach((ans: string) => {
        score[ans]++
    });
    console.log(getProgress(score))
    ResultKey.value = `${score.e > score.i ? 'E' : 'I'}${score.n > score.s ? 'N' : 'S'}${score.f > score.t ? 'F' : 'T'}${score.j > score.p ? 'J' : 'P'}`
}
</script>

<style lang="scss"></style>