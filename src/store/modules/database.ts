import { defineStore } from 'pinia';
import localforage from 'localforage'
import { dbSet, dbGet, database as getDatabase, DatabaseParsm } from '@/utils/db'
import { useRoute } from 'vue-router'
import { cloneDeep } from 'lodash'

export const useDBStore = defineStore({
    id: 'db',
    state:() => ({
        books: localforage.createInstance({
            driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
            name        : location.hostname,
            version     : 1.0,
            // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'books', // Should be alphanumeric, with underscores.
            description : '书籍信息存储'
        }),
        music: localforage.createInstance({
            driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
            name        : location.hostname,
            version     : 1.0,
            // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'music', // Should be alphanumeric, with underscores.
            description : '音乐信息存储'
        }),
        secrecy: localforage.createInstance({
            driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
            name        : location.hostname,
            version     : 1.0,
            // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'secrecy', // Should be alphanumeric, with underscores.
            description : '保密信息存储'
        }),
        principal: localforage.createInstance({
            driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
            name        : location.hostname,
            version     : 1.0,
            // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'principal', // Should be alphanumeric, with underscores.
            description : '首页信息存储'
        }),
    }),
    actions: {
        /**
         * @description 将数据存储到指定位置 | 路径不存在会自动初始化
         * @description 效果类似于取值 dbName.path = value
         * @param {Object} context
         * @param {Object} payload dbName {String} 数据库名称
         * @param {Object} payload path {String} 存储路径
         * @param {Object} payload value {*} 需要存储的值
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        set({
            dbName = 'database',
            path = '',
            value = '',
            user = false
        }:DatabaseParsm) {
            dbSet({ dbName, path, value, user })
        },
        /**
         * @description 获取数据
         * @description 效果类似于取值 dbName.path || defaultValue
         * @param {Object} context
         * @param {Object} payload dbName {String} 数据库名称
         * @param {Object} payload path {String} 存储路径
         * @param {Object} payload defaultValue {*} 取值失败的默认值
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        get({
            dbName = 'database',
            path = '',
            defaultValue = '',
            user = false
        }:DatabaseParsm) {
            return dbGet({ dbName, path, defaultValue, user })
        },
        /**
         * @description 获取存储数据库对象
         * @param {Object} context
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        database({
            user = false
        } = {}) {
            return getDatabase({
                user,
                defaultValue: {}
            })
        },
        /**
         * @description 清空存储数据库对象
         * @param {Object} context
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        databaseClear({
            user = false
        } = {}) {
            return getDatabase({
                user,
                validator: () => false,
                defaultValue: {}
            })
        },
        /**
         * @description 获取存储数据库对象 [ 区分页面 ]
         * @param {Object} context
         * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        databasePage( {
            basis = 'fullPath',
            user = false
        } = {}) {
            const route:any = useRoute()
            return getDatabase({
                path: `$page.${route[basis]}`,
                user,
                defaultValue: {}
            })
        },
        /**
         * @description 清空存储数据库对象 [ 区分页面 ]
         * @param {Object} context
         * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        databasePageClear({
            basis = 'fullPath',
            user = false
        } = {}) {
            const route:any = useRoute()
            return getDatabase({
                path: `$page.${route[basis]}`,
                user,
                validator: () => false,
                defaultValue: {}
            })
        },
        /**
         * @description 快速将页面当前的数据 ( $data ) 持久化
         * @param {Object} context
         * @param {Object} payload instance {Object} vue 实例
         * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        pageSet( {
            instance,
            basis = 'fullPath',
            user = false
        }:any) {
            const route:any = useRoute()

            return getDatabase({
                path: `$page.${route[basis]}.$data`,
                user,
                validator: () => false,
                defaultValue: cloneDeep(instance.$data)
            })
        },
        /**
         * @description 快速获取页面快速持久化的数据
         * @param {Object} context
         * @param {Object} payload instance {Object} vue 实例
         * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        pageGet({
            instance,
            basis = 'fullPath',
            user = false
        }:any) {
            const route:any = useRoute()

            return dbGet({
                path: `$page.${route[basis]}.$data`,
                user,
                defaultValue: cloneDeep(instance.$data)
            })
        },
        /**
         * @description 清空页面快照
         * @param {Object} context
         * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
         * @param {Object} payload user {Boolean} 是否区分用户
         */
        pageClear( {
            basis = 'fullPath',
            user = false
        }) {
            const route:any = useRoute()

            return getDatabase({
                path: `$page.${route[basis]}.$data`,
                user,
                validator: () => false,
                defaultValue: {}
            })
        }
    }
})

