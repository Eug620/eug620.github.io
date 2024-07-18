<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-07-19 01:58:17
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-07-19 02:07:15
 * @FilePath     : /eug620.github.io/src/components/Hero.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="bg-slate-200 p-3 flex rounded-lg  cursor-pointer relative">
        <img :src="`//game.gtimg.cn/images/lol/act/img/skinloading/${hero.instance_id}.jpg`" class="h-24     mr-2"
            alt="">

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
                <span class="mr-4">攻击：{{ hero.attack }}</span>
                <span class="mr-4">防御：{{ hero.defense }}</span>
                <span class="mr-4">魔法：{{ hero.magic }}</span>
                <span class="mr-4">难度：{{ hero.difficulty }}</span>
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
</script>

<style></style>