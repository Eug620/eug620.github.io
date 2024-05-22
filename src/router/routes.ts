export default [
  {
    path: "/",
    redirect: "dashboard",
    children: [
      // 首页
      {
        path: "dashboard",
        name: "dashboard",
        meta: {
          keepAlive: false,
          title: "首页",
          auth: true,
          affix: true,
          icon: "",
        },
        component: () => import("../views/dashboard/index.vue"),
      },
      {
        path: "about",
        name: "about",
        meta: {
          keepAlive: false,
          title: "关于",
          auth: true,
          affix: true,
          icon: "",
        },
        component: () => import("@/views/about/index.vue"),
      },
    ],
  },
];
