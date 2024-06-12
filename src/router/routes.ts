/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-09 00:43:30
 * @FilePath     : /eug620.github.io/src/router/routes.ts
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export const menus = [
  // 首页
  {
    path: "Principal",
    name: "Principal",
    meta: {
      keepAlive: false,
      title: "首页",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Principal.vue"),
  },
  {
    path: "Movie",
    name: "Movie",
    meta: {
      keepAlive: false,
      title: "影视",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Movie.vue"),
  },
  {
    path: "Books",
    name: "Books",
    meta: {
      keepAlive: false,
      title: "书籍",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Books.vue"),
  },
  {
    path: "Three",
    name: "Three",
    meta: {
      keepAlive: false,
      title: "绘制",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Three.vue"),
  },
  {
    path: "Map",
    name: "Map",
    meta: {
      keepAlive: false,
      title: "地图",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Map.vue"),
  },
  {
    path: "Animal",
    name: "Animal",
    meta: {
      keepAlive: false,
      title: "生肖",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Animal.vue"),
  },
  {
    path: "About",
    name: "About",
    meta: {
      keepAlive: false,
      title: "关于",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/About.vue"),
  },

]
export default [
  {
    path: "/",
    redirect: "Principal",
    component: () => import("@/layout/index.vue"),
    children: menus,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: {
      keepAlive: false,
      title: "错误",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Error.vue"),
  },
];
