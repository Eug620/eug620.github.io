/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 22:05:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-09-27 22:07:55
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
      keepAlive: true,
      title: "首页",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Principal.vue"),
  },
  {
    path: "Music",
    name: "Music",
    meta: {
      keepAlive: true,
      title: "音乐",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Music.vue"),
  },
  {
    path: "Books",
    name: "Books",
    meta: {
      keepAlive: true,
      title: "书籍",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Books.vue"),
  },
  {
    path: "Map",
    name: "Map",
    meta: {
      keepAlive: true,
      title: "地图",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Map.vue"),
  },
]
export const information = [
  {
    path: "Repl",
    name: "Repl",
    meta: {
      keepAlive: true,
      title: "Repl",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Repl.vue"),
  },
  {
    path: "LOL",
    name: "lol",
    meta: {
      keepAlive: true,
      title: "lol",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/LOL.vue"),
  },
  // {
  //   path: "Movie",
  //   name: "Movie",
  //   meta: {
  //     keepAlive: true,
  //     title: "影视",
  //     auth: true,
  //     affix: true,
  //     icon: "",
  //   },
  //   component: () => import("@/views/Movie.vue"),
  // },
  // {
  //   path: "Animal",
  //   name: "Animal",
  //   meta: {
  //     keepAlive: true,
  //     title: "生肖",
  //     auth: true,
  //     affix: true,
  //     icon: "",
  //   },
  //   component: () => import("@/views/Animal.vue"),
  // },
  // {
  //   path: "Touch",
  //   name: "Touch",
  //   meta: {
  //     keepAlive: true,
  //     title: "Touch",
  //     auth: true,
  //     affix: true,
  //     icon: "",
  //   },
  //   component: () => import("@/views/Touch.vue"),
  // },
  {
    path: "Three",
    name: "Three",
    meta: {
      keepAlive: true,
      title: "绘制",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Three.vue"),
  },
  {
    path: "Secrecy",
    name: "Secrecy",
    meta: {
      keepAlive: true,
      title: "加密",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Secrecy.vue"),
  },
  {
    path: "MBTI",
    name: "MBTI",
    meta: {
      keepAlive: true,
      title: "MBTI",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/MBTI.vue"),
  },
  {
    path: "Retire",
    name: "Retire",
    meta: {
      keepAlive: true,
      title: "退休计算器",
      auth: true,
      affix: true,
      icon: "",
    },
    component: () => import("@/views/Retire.vue"),
  },
  {
    path: "About",
    name: "About",
    meta: {
      keepAlive: true,
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
    redirect: "About",
    component: () => import("@/layout/index.vue"),
    children: [...menus, ...information],
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
