export type Roles = 'mage' | 'support' | 'fighter' | 'tank' | 'assassin' | 'marksman'
export interface Hero {
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
export interface Items {
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

export interface HeroTypes {
    fileName: string
    fileTime: string
    hero: Hero[]
    version: string
}
export interface EquipTypes {
    fileName: string
    fileTime: string
    items: Items[]
    tree: any[],
    version: string
}
export interface Skin {
    chromas?: string
    mainImg: string
    iconImg: string
    name: string
    description: string
}
export interface HeroDetails extends HeroTypes {
    skins: Skin[],
    hero: Hero[] | any,
    spells: any,
}
export enum rolesType {
    mage = '法师',
    support = '辅助',
    fighter = '战士',
    tank = '坦克',
    assassin = '刺客',
    marksman = '射手',
}
export enum tabs {
    hero = 'hero',
    equip = 'equip',
    regions = 'regions'
}