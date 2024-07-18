<template>
    <div class="pt-2 flex flex-col h-full relative">
        <div class="w-full  py-4  w-full max-w-screen-lg gap-2 px-2 mx-auto animate__animated animate__fadeIn">
            <div v-if="heroList.version" class="text-center pb-6">{{ heroList.fileTime }} - Version{{ heroList.version
                }}
            </div>
            <div class="flex my-2 gap-2">
                <div class="px-4 py-2 bg-slate-200 rounded-lg cursor-pointer"
                    :class="{ 'bg-teal-200': activeTab === tabs.hero }" @click="activeTab = tabs.hero">英雄</div>
                <div class="px-4 py-2 bg-slate-200 rounded-lg cursor-pointer"
                    :class="{ 'bg-teal-200': activeTab === tabs.equip }" @click="activeTab = tabs.equip">装备</div>
            </div>

            <div v-if="activeTab === tabs.hero" :class="{ 'grid gap-4 grid-cols-3': !isShowDetails }">
                <template v-if="!isShowDetails">
                    <div v-for="hero in heroList.hero" :key="hero.heroId"
                        class="bg-slate-200 p-3 flex rounded-lg  cursor-pointer relative" @click="useHeroDetails(hero)">
                        <img :src="`//game.gtimg.cn/images/lol/act/img/skinloading/${hero.instance_id}.jpg`"
                            class="h-24     mr-2" alt="">

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

                        <span
                            :class="[hero.changeLabel === '改动英雄' && 'text-red-500', 'absolute text-xs top-1 right-1']">{{
                                hero.changeLabel }}</span>
                    </div>
                </template>
                <div v-else>
                    <div>
                        <div class="flex my-2 items-center">
                            <img :src="heroDetails.spells?.passive?.abilityIconPath" class="mr-4 w-20 h-20 rounded-lg"
                                alt="">
                            <div>
                                <div>{{ heroDetails.spells?.passive?.name }}</div>
                                <div class="text-xs">{{ heroDetails.spells?.passive?.description }}</div>
                            </div>
                        </div>
                        <div class="flex my-2 items-center">
                            <img :src="heroDetails.spells?.q?.abilityIconPath" class="mr-4 w-20 h-20 rounded-lg" alt="">
                            <div>
                                <div>Q：{{ heroDetails.spells?.q?.name }} - <span class="text-xs">{{
                                    heroDetails.spells?.q?.costburn
                                        }}</span></div>
                                <div class="text-xs">{{ heroDetails.spells?.q?.description }}</div>
                            </div>

                        </div>
                        <div class="flex my-2 items-center">
                            <img :src="heroDetails.spells?.w?.abilityIconPath" class="mr-4 w-20 h-20 rounded-lg" alt="">
                            <div>
                                <div>W：{{ heroDetails.spells?.w?.name }} - <span class="text-xs">{{
                                    heroDetails.spells?.w?.costburn
                                        }}</span></div>
                                <div class="text-xs">{{ heroDetails.spells?.w?.description }}</div>
                            </div>

                        </div>
                        <div class="flex my-2 items-center">
                            <img :src="heroDetails.spells?.e?.abilityIconPath" class="mr-4 w-20 h-20 rounded-lg" alt="">
                            <div>
                                <div>E：{{ heroDetails.spells?.e?.name }} - <span class="text-xs">{{
                                    heroDetails.spells?.e?.costburn
                                        }}</span></div>
                                <div class="text-xs">{{ heroDetails.spells?.e?.description }}</div>
                            </div>

                        </div>
                        <div class="flex my-2 items-center">
                            <img :src="heroDetails.spells?.r?.abilityIconPath" class="mr-4 w-20 h-20 rounded-lg" alt="">
                            <div>
                                <div>R：{{ heroDetails.spells?.r?.name }} - <span class="text-xs">{{
                                    heroDetails.spells?.r?.costburn
                                        }}</span></div>
                                <div class="text-xs">{{ heroDetails.spells?.r?.description }}</div>
                            </div>

                        </div>
                    </div>
                    <div @click="useSkinClick"
                        class="my-3  overflow-hidden rounded-lg cursor-pointer text-white relative" :style="{
                            // backgroundImage:   `url(${skin.mainImg})`
                        }">
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
                        class="fixed bottom-10 right-10 px-10 py-3 cursor-pointer bg-slate-200 hover:bg-slate-400 hover:text-white rounded-lg mx-auto">返回</span>
                </div>

            </div>
            <div v-if="activeTab === tabs.equip" class="grid gap-4 grid-cols-5">
                <div v-for="equip in equipList.items" :key="equip.itemId" class="flex bg-slate-200 rounded-lg p-2"
                    @click="useEquipClick(equip)">
                    <img :src="equip.iconPath" class="w-10 h-10" alt="">
                    <div class="ml-2">
                        <div>{{ equip.name }}</div>
                        <div class="text-xs">合成：{{ equip.price }}</div>
                        <div class="text-xs">出售：{{ equip.sell }}</div>
                        <div class="text-xs">总价：{{ equip.total }}</div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
type Roles = 'mage' | 'support' | 'fighter' | 'tank' | 'assassin' | 'marksman'
interface Hero {
    instance_id: string
    heroId: string
    name: string
    title: string
    alias: string
    roles: Roles[]
    goldPrice: string
    couponPrice: string
    attack: string
    defense: string
    magic: string
    difficulty: string
    isWeekFree: string
    changeLabel: string
}
interface Items {
    description: string
    from: string[]
    iconPath: string
    into: string[]//
    itemId: string
    keywords: string
    maps: string[]
    name: string
    plaintext: string
    price: string
    sell: string
    suitHeroId: string
    tag: string
    total: string
    types: string[]

}

interface HeroTypes {
    fileName: string
    fileTime: string
    hero: Hero[]
    version: string
}
interface EquipTypes {
    fileName: string
    fileTime: string
    items: Items[]
    tree: any[],
    version: string
}
interface Skin {
    chromas?: string
    mainImg: string
    iconImg: string
    name: string
    description: string
}
interface HeroDetails extends HeroTypes {
    skins: Skin[],
    hero: Hero | any,
    spells: any,
}
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
const heroDetails = reactive<HeroDetails>({
    fileName: '',
    fileTime: '',
    hero: {},
    skins: [],
    spells: {},
    version: ''
})
enum rolesType {
    mage = '法师',
    support = '辅助',
    fighter = '战士',
    tank = '坦克',
    assassin = '刺客',
    marksman = '射手',
}
enum tabs {
    hero = 'hero',
    equip = 'equip'
}
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
}

const useEquipClick = (equip: Items) => {
    console.log(equip.description);
    let description = equip.description.replace(/<br>/g, "\n            ")

    alert(`
模式：${equip.maps.join(' ')}\n
装备效果：
            ${description.replace(/<[^>]+>/g, "")}\n
合成路线：${equip.from.map(v => equipMaps.get(v)?.name)}\n
可合成：${equip.into.map(v => equipMaps.get(v)?.name)}\n
    `)
}
</script>

<style></style>