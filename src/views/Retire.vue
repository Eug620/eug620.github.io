<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-09-27 20:34:33
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-09-27 22:00:45
 * @FilePath     : /eug620.github.io/src/views/Retire.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="Retire py-10 text-center flex flex-col  items-center">
        <select @change="useCompute" v-model="search.sex" class="pl-4 min-h-14  rounded-lg mb-6 md:w-1/3 w-10/12">
            <option :value="sex" :key="sex" v-for="sex in SEX"> {{ SEXS[sex] }}</option>
        </select>


        <input @change="useCompute" type="month" v-model="search.date"
            class="pl-4 min-h-14 rounded-lg md:w-1/3 w-10/12  mb-6">

        <select v-if="search.sex === SEX.girl" v-model="search.grilType" @change="useCompute"
            class="pl-4 min-h-14 rounded-lg mb-6 md:w-1/3 w-10/12">
            <option :value="types.value" :key="types.value" v-for="types in girlTypeOptions"> {{ types.label }}</option>
        </select>

        <div class="md:w-1/3 w-10/12 text-left gap-4 flex flex-col text-inherit ">
            <div>退休年龄: <span class="font-medium pl-4 text-rose-400	">{{ result.retireYear }} 岁 {{ result.retireMonth }}
                    月</span></div>
            <div>退休日期: <span class="font-medium pl-4 text-rose-400	">{{ result.retireDate }}</span></div>
            <div>延迟月份: <span class="font-medium pl-4 text-rose-400	">{{ result.delayMonth }}</span></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
enum SEX {
    boy = 'boy',
    girl = 'girl',
}
enum SEXS {
    boy = '男',
    girl = '女'
}
type Search = {
    sex: SEX,
    date: string,
    grilType: number,
}
const girlTypeOptions = ref<any[]>([
    {
        value: 50,
        label: '女职工（原50岁退休）'
    },
    {
        value: 55,
        label: '女职工（原55岁退休）'
    }
])
const search = reactive<Search>({
    sex: SEX.boy,
    date: '1990-01',
    grilType: 50,
})

type Result = {
    retireYear?: string,
    retireMonth?: string,
    retireDate?: string,
    delayMonth?: string,
}
const result = reactive<Result>({})

const useCompute = () => {
    const year = +search.date.split('-')[0] // 出生年份
    const month = +search.date.split('-')[1] // 出生月份

    let retireYear = '0'// 退休年
    let retireMonth = '0'// 退休月

    let retireDate = ''// 退休日期
    let delayMonth = '' // 延迟月
    switch (search.sex) {
        case SEX.boy:
            if (year < 1965) {
                retireYear = '60'
                retireMonth = '0'
                retireDate = `${year + 60}年${month}月`
                delayMonth = '0个月'

            } else if (year >= 1965 && (year < 1976 || year == 1976 && month < 9)) {
                const m = Math.ceil(((year - 1965) * 3 + month / 4) % 12)
                retireYear = `${Math.floor(60 + ((year - 1965) * 3 + month / 4) / 12)}`
                retireMonth = `${m >= 10 ? m : (m ? `0${m}` : 0)}`

                const dateMonth = Math.ceil((+month + (+retireMonth) - 1) % 12) + 1
                retireDate = `${year + (+retireYear) + (+month + (+retireMonth) > 12 ? 1 : 0)}年${dateMonth >= 10 ? dateMonth : `0${dateMonth}`}月`
                delayMonth = `${Math.ceil((year - 1965) * 3 + month / 4)}个月`

            } else {
                retireYear = '63'
                retireMonth = '0'
                retireDate = `${year + 63}年${month}月`
                delayMonth = '36个月'
            }
            break;
        case SEX.girl:
            if (search.grilType == 50) {
                if (year < 1975) {
                    retireYear = '50'
                    retireMonth = '0'
                    retireDate = `${year + 50}年${month}月`
                    delayMonth = '0个月'
                } else if (year >= 1975 && (year < 1984 || year == 1984 && month < 11)) {
                    const m = Math.ceil(((year - 1975) * 6 + month / 2) % 12)
                    retireYear = `${Math.floor(50 + ((year - 1975) * 6 + month / 2) / 12)}`
                    retireMonth = `${m >= 10 ? m : (m ? `0${m}` : 0)}`

                    const dateMonth = Math.ceil((+month + (+retireMonth) - 1) % 12) + 1
                    retireDate = `${year + (+retireYear) + (+month + (+retireMonth) > 12 ? 1 : 0)}年${dateMonth >= 10 ? dateMonth : `0${dateMonth}`}月`
                    delayMonth = `${Math.ceil((year - 1975) * 6 + month / 2)}个月`

                } else {
                    retireYear = '55'
                    retireMonth = '0'
                    retireDate = `${year + 55}年${month}月`
                    delayMonth = '60个月'
                }
            } else if (search.grilType == 55) {
                if (year < 1970) {
                    retireYear = '55'
                    retireMonth = '0'
                    retireDate = `${year + 55}年${month}月`
                    delayMonth = '0个月'
                } else if (year >= 1970 && (year < 1981 || year == 1981 && month < 9)) {
                    const m = Math.ceil(((year - 1970) * 3 + month / 4) % 12)
                    retireYear = `${Math.floor(55 + ((year - 1970) * 3 + month / 4) / 12)}`
                    retireMonth = `${m >= 10 ? m : (m ? `0${m}` : 0)}`

                    const dateMonth = Math.ceil((+month + (+retireMonth) - 1) % 12) + 1
                    retireDate = `${year + (+retireYear) + (+month + (+retireMonth) > 12 ? 1 : 0)}年${dateMonth >= 10 ? dateMonth : `0${dateMonth}`}月`
                    delayMonth = `${Math.ceil((year - 1970) * 3 + month / 4)}个月`
                } else {
                    retireYear = '58'
                    retireMonth = '0'
                    retireDate = `${year + 58}年${month}月`
                    delayMonth = '36个月'
                }
            }
            break;
        default:
            break;
    }

    if (+retireMonth == 12) {
        retireMonth = '0'
        retireYear = `${+retireYear + 1}`
    }
    result.retireYear = retireYear
    result.retireMonth = retireMonth
    result.retireDate = retireDate
    result.delayMonth = delayMonth
}
useCompute()
</script>

<style lang="scss">
.Retire {}
</style>