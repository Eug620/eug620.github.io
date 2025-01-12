<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-07-19 01:58:17
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-01-12 16:47:30
 * @FilePath     : /eug620.github.io/src/components/Hero.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="bg-slate-200 p-3 flex rounded-lg  cursor-pointer relative hero" :style="{
        'backgroundImage': `url(//game.gtimg.cn/images/lol/act/img/skinloading/${hero.instance_id}.jpg)`
    }">
        <!-- <img loading="lazy" :src="`//game.gtimg.cn/images/lol/act/img/skinloading/${hero.instance_id}.jpg`" class="h-24 mr-2"
            alt=""> -->

        <div class="flex-1">
            <span>{{ hero.name }}</span>
            <span class="text-xs pl-3">{{ hero.title }}</span>
            <span class="text-xs pl-3">{{ hero.alias }}</span>
            <div class="text-xs mt-2">
                定位：<span v-for=" roles in hero.roles " class="mr-2" :key="roles">{{ rolesType[roles]
                    }}</span>
            </div>
            <div class="text-xs mt-1">
                价格：{{ hero.goldPrice }} / {{ hero.couponPrice }}
            </div>
            <div class="text-xs mt-1">
                <span class="text-red-500">攻击：{{ getRate(hero.attack) }}</span><br/>
                <span class="text-amber-500">防御：{{ getRate(hero.defense) }}</span><br/>
                <span class="text-sky-500">魔法：{{ getRate(hero.magic) }}</span><br/>
                <span class="text-indigo-500">难度：{{ getRate(hero.difficulty) }}</span><br/>
            </div>
            <div v-if="hero.isWeekFree === '1'">周免</div>
        </div>

        <span :class="[hero.changeLabel === '改动英雄' && 'text-red-500', 'absolute text-xs top-1 right-1']">{{
            hero.changeLabel }}</span>
    </div>
</template>

<script setup lang="ts">
import { Hero, rolesType } from '@/types/LOL';


const { hero } = defineProps<{
    hero: Hero
}>()
const getRate = (rate: any) => "★★★★★★★★★★".slice(10 - rate, 20 - rate);

</script>

<style>
.hero{
    background-size: 48% auto;
    background-repeat: no-repeat;
    padding-left: 52%;
    background-position: left top;
}
</style>