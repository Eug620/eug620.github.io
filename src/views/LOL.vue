<template>
    <div class="pt-2 flex flex-col h-full relative">
        <div class="w-full  py-4  w-full max-w-screen-lg gap-2 px-2 mx-auto animate__animated animate__fadeIn">
            <div v-if="heroList.version" class="text-center pb-2">{{ heroList.fileTime }} - Version{{ heroList.version
                }}
            </div>
            <div class="flex my-2 gap-4 justify-center">
                <div class="px-4 py-2 bg-slate-200 rounded-lg cursor-pointer mimesis"
                    :class="{ 'font-semibold underline underline-offset-4': activeTab === tabs.hero }" @click="activeTab = tabs.hero">英雄</div>
                <div class="px-4 py-2 bg-slate-200 rounded-lg cursor-pointer mimesis"
                    :class="{ 'font-semibold underline underline-offset-4': activeTab === tabs.equip }" @click="activeTab = tabs.equip">装备</div>
                <div class="px-4 py-2 bg-slate-200 rounded-lg cursor-pointer mimesis"
                    :class="{ 'font-semibold underline underline-offset-4': activeTab === tabs.regions }" @click="activeTab = tabs.regions">地区</div>
            </div>

            <div v-if="activeTab === tabs.hero">
                <input v-if="!isShowDetails" v-model="searchHero"
                    class="outline-none my-4 px-4 py-2 placeholder:italic rounded-lg w-full placeholder:text-slate-400 mimesis_in"
                    placeholder="请输入英雄名称">
                <div v-if="!isShowDetails" class="grid gap-4 md:grid-cols-3 grid-cols-1">
                    <Heros class="mimesis" v-for="hero in renderHeroList" :hero="hero" :key="hero.heroId" @click="useHeroDetails(hero)"/>
                </div>
                <div v-else>
                    <div>
                        <div class="text-center my-8 mb-4 text-4xl font-bold">{{ heroDetails?.hero?.name }}</div>
                        <div class="text-center mb-3 ">{{ heroDetails?.hero?.title  }}</div>
                        <div class="text-center mb-3 text-xl">{{ champions.champion?.biography?.quote }}</div>
                        <Titles title="来自"/>
                        <div class="indent-4 text-sm px-4">{{ useFindRegion(champions.champion?.['associated-faction-slug']) }}</div>
                        <Titles title="简介"/>
                        <div class="indent-4  text-sm px-4" v-html="champions.champion?.biography?.short"></div>
                        <Titles title="传记"/>
                        <div class="indent-4 text-sm px-4" v-html="champions.champion?.biography?.full"></div>
                    </div>
                    <div>
                        <Titles title="技能"/>
                        <Spells :spells="heroDetails.spells?.passive"/>
                        <Spells :spells="heroDetails.spells?.q" pre="Q"/>
                        <Spells :spells="heroDetails.spells?.w" pre="W"/>
                        <Spells :spells="heroDetails.spells?.e" pre="E"/>
                        <Spells :spells="heroDetails.spells?.r" pre="R"/>
                    </div>
                    <Titles title="皮肤"/>
                    <div @click="useSkinClick"
                        class="my-3 overflow-hidden rounded-lg cursor-pointer text-white relative" >
                        <img :src="skin.mainImg" alt="" class="w-full" />
                        <div class="absolute w-1/2 h-full top-4 left-4">
                            <img :src="skin.iconImg" class="w-12 mb-1 rounded-full" alt="">
                            <div>{{ skin.name }} </div>
                            <div class="text-xs my-1  indent-4">{{ skin.description }}</div>
                        </div>
                        <div class="absolute bottom-4 right-4">
                            {{ currentIdx + 1 }} / {{ comSkins.length }}
                        </div>
                    </div>
                    <span @click="isShowDetails = false"
                        class="fixed bottom-10 right-10 px-10 py-3 cursor-pointer bg-slate-200 hover:font-semibold rounded-lg mx-auto mimesis">返回</span>
                </div>

            </div>
            <div v-if="activeTab === tabs.equip">
                    <div v-if="activeEquip">
                        <Equip :equip="activeEquip"/>
                        <Titles title="模式"/>
                        <div class="indent-4  text-sm px-4" >{{ activeEquip.maps.join(' ') }}</div>
                        <Titles title="装备效果"/>
                        <div class="indent-4  text-sm px-4" >{{ activeEquip.description.replace(/<br>/g, "\n        ").split('\n        ').filter(v => v).join('\n        ').replace(/<[^>]+>/g, "") }}</div>
                        <Titles v-if="activeEquip.from.length"  title="合成路线"/>
                        <div v-if="activeEquip.from.length" class="pl-4  text-sm px-4" >
                            <Equip v-for="equip in filterEquipList(activeEquip.from)" :key="equip.itemId" class="mb-2" :equip="equip"/>
                        </div>
                        <Titles v-if="activeEquip.into.length"  title="可以合成"/>
                        <div v-if="activeEquip.into.length" class="pl-4 text-sm px-4" >
                            <Equip  v-for="equip in filterEquipList(activeEquip.into)" :key="equip.itemId" class="mb-2" :equip="equip"/>
                        </div>
                        <span @click="activeEquip = null"
                        class="fixed bottom-10 right-10 px-10 py-3 cursor-pointer bg-slate-200 hover:font-semibold rounded-lg mx-auto mimesis">返回</span>
                    </div>
                    <template  v-else >
                        <input v-model="searchEquip"
                            class="outline-none my-4 px-4 py-2 placeholder:italic rounded-lg w-full placeholder:text-slate-400 mimesis_in"
                            placeholder="请输入装备名称">
                        <div class="grid gap-4 md:grid-cols-4 grid-cols-2">
                            <Equip v-for="equip in renderEquipList" :key="equip.itemId"  @click="useEquipClick(equip)" :equip="equip"/>
                        </div>
                    </template>
            </div>
            <div v-if="activeTab === tabs.regions">
                <div :style="{
                    backgroundImage: `url(${region?.background?.uri})`,
                }" v-for="region in regions.factions" :key="region.slug"
                    class="h-96  overflow-hidden object-center bg-cover object-cover text-slate-300 hover:text-slate-100  rounded-lg  cursor-pointer relative mb-2">
                    <div class="p-3 h-full" style="background-color: rgba(0, 0, 0, .3);">
                        <Titles  :title="region?.name"/>
                        <div class="indent-4 text-sm px-4" v-html="region?.factions?.faction?.overview?.short">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import Titles from '@/components/Titles.vue'
import Equip from '@/components/Equip.vue'
import Spells from '@/components/Spells.vue'
import Heros from '@/components/Hero.vue'
import {HeroTypes,EquipTypes, Items, Hero, HeroDetails, tabs} from '@/types/LOL'


const heroList = reactive<HeroTypes>({
    fileName: '',
    fileTime: '',
    hero: [],
    version: ''
})
const equipList = reactive<EquipTypes>({
    fileName: '',
    fileTime: '',
    items: [],
    tree: [],
    version: ''
})
const equipMaps = new Map<string, Items>()

const isShowDetails = ref(false)
const searchHero = ref('')
const searchEquip = ref('')
const renderHeroList = computed(() => {
    return (heroList.hero as Hero[]).filter(({ name, alias, title }) => {
        return name.includes(searchHero.value) || alias.includes(searchHero.value) || title.includes(searchHero.value)
    })
})
const renderEquipList = computed(() => {
    return (equipList.items as Items[]).filter(({ name }) => {
        return name.includes(searchEquip.value)
    })
})
const filterEquipList = (ary: string[]) => {
    return (equipList.items as Items[]).filter(({ itemId }) => {
        return ary.includes(itemId)
    })
}
const heroDetails = reactive<HeroDetails>({
    fileName: '',
    fileTime: '',
    hero: {},
    skins: [],
    spells: {},
    version: ''
})
const champions = reactive<any>({
    champion: {},
    ['explore-champions']: [],
    id: '',
    locale: '',
    modules: [],
    name: '',
    ['related-champions']: [],
    title: ''
})

const activeTab = ref<tabs>(tabs.hero)
const comSkins = computed(() => {
    return heroDetails.skins.filter(v => v?.chromas == '0')
})
const currentIdx = ref(0)
const skin = computed(() => {
    return comSkins.value[currentIdx.value]
})
const useSkinClick = () => {
    if (currentIdx.value < comSkins.value.length - 1) {
        currentIdx.value++
    } else {
        currentIdx.value = 0
    }
}
const useGetHeroList = () => {
    fetch(`https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js`).then(async res => {
        const { fileName, fileTime, hero, version } = await res.json()
        heroList.fileName = fileName
        heroList.fileTime = fileTime
        heroList.hero = hero
        heroList.version = version
    })
}
useGetHeroList()

const useGetEquipList = () => {
    fetch(`https://game.gtimg.cn/images/lol/act/img/js/items/items.js`).then(async res => {
        const { fileName, fileTime, items, tree, version } = await res.json()
        equipList.fileName = fileName
        equipList.fileTime = fileTime
        equipList.version = version
        equipList.items = items
        equipList.tree = tree
        items.forEach((v: Items) => {
            equipMaps.set(v.itemId, v)
        })
    })
}
useGetEquipList()
const useHeroDetails = (hero: Hero) => {
    champions.champion = {}
    currentIdx.value = 0
    fetch(`https://game.gtimg.cn/images/lol/act/img/js/hero/${hero.heroId}.js`).then(async res => {
        const { fileName, fileTime, hero, version, skins, spells } = await res.json()
        isShowDetails.value = true
        heroDetails.fileName = fileName
        heroDetails.fileTime = fileTime
        heroDetails.version = version
        heroDetails.hero = hero
        heroDetails.skins = skins
        spells.forEach((element: any) => {
            heroDetails.spells[element.spellKey] = element
        });

    })
    fetch(`https://yz.lol.qq.com/v1/zh_cn/champions/${hero.alias.toLowerCase()}/index.json`).then(async res => {
        const data = await res.json()
        champions.champion = data.champion
        // https://yz.lol.qq.com/v1/zh_cn/story/annie-color-story/index.json 传记
    })
}

const activeEquip = ref<Items| null>(null)
const useEquipClick = (equip: Items) => {
    // console.log(equip);
    
    if (activeEquip.value?.itemId === equip.itemId) {
        activeEquip.value = null
    } else {
        activeEquip.value = equip
    }
}


/**
 * 大陆板块
 * https://yz.lol.qq.com/v1/zh_cn/search/index.json
 */
const regions = reactive<any>({
    factions: []
})
const useFindRegion = (region: string) => {
    return regions.factions.find((v: any) => v.slug === region)?.name || region
}
const useGetRegions = () => {
    fetch(`https://yz.lol.qq.com/v1/zh_cn/search/index.json`).then(async res => {
        const { factions } = await res.json()
        // console.log(factions)
        regions.factions = factions
        regions.factions.forEach((item:any) => {
            fetch(`https://yz.lol.qq.com/v1/zh_cn/factions/${item.slug}/index.json`).then(async result => {
                const factions  = await result.json()
                item.factions = factions
            })
        })
        

    })
}
useGetRegions()
</script>

<style></style>