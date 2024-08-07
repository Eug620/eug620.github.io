<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-26 23:57:43
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-27 23:19:33
 * @FilePath     : /eug620.github.io/src/views/Map.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div id="map-container"></div>
    <div id="map-panel" class="fixed w-80 left-0 top-1/2 -translate-y-1/2" v-show="searchVal"></div>
    <div id="map-search" class="top-16  w-full fixed ">
        <input @change="useSearchChange" v-model="searchVal"
            class="w-80 outline-none px-4 py-2 placeholder:italic placeholder:text-slate-400" placeholder="请输入检索信息">
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from "@amap/amap-jsapi-loader";

const searchVal = ref('')
let map: any = null;

const placeSearch = ref<any>(null)

onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: "e7f4cee517704978e3b8cd430e62ae9e",
    };

    AMapLoader.load({
        key: "580aafcdb441138e3cb582d4252ddbf3", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
        .then((AMap: any) => {
            map = new AMap.Map("map-container", {
                pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D', //地图模式
                rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
                pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
                zoom: 17, //初始化地图层级
                rotation: -15, //初始地图顺时针旋转的角度
                zooms: [2, 20], //地图显示的缩放级别范围
                // position: 'RB', //定位按钮的停靠位置
                // offset: [100, 200], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
                // zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
                // center: [116.333926, 39.997245] //初始地图中心经纬度
            });
            AMap.plugin(["AMap.PlaceSearch"], function () {
                //构造地点查询类
                placeSearch.value = new AMap.PlaceSearch({
                    pageSize: 6, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    city: "010", // 兴趣点城市
                    citylimit: false,  //是否强制限制在设置的城市内搜索
                    map: map, // 展现结果的地图实例
                    panel: "map-panel", // 结果列表将在此容器中进行展示。
                    autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });
                //关键字查询
                // placeSearch.value.search('北京大学');
            });
            //异步加载控件
            AMap.plugin('AMap.ToolBar', function () {
                var toolbar = new AMap.ToolBar({position: 'RT'}); //缩放工具条实例化
                map.addControl(toolbar); //添加控件
            });
            AMap.plugin('AMap.Scale', function () {
                var scale = new AMap.Scale(); //缩放工具条实例化
                map.addControl(scale); //添加控件
            });
            // AMap.plugin('AMap.HawkEye', function () {
            //     var HawkEye = new AMap.HawkEye(); //缩放工具条实例化
            //     map.addControl(HawkEye); //添加控件
            // });
            AMap.plugin('AMap.ControlBar', function () {
                var ControlBar = new AMap.ControlBar({position:'RB'}); //缩放工具条实例化
                map.addControl(ControlBar); //添加控件
            });
            AMap.plugin('AMap.CitySearch', function () {
                const CitySearch = new AMap.CitySearch()
                CitySearch.getLocalCity((type:string, info:any) => {
                    if (type === "complete") {
                        // map.setCenter([116.333926, 39.997245])
                        console.log('当前城市：',info);
                    }
                })
            });
        })
        .catch((e: Error) => {
            console.log(e);
        });
});
const useSearchChange = () => {
    placeSearch.value.search(searchVal.value);
}
onUnmounted(() => {
    map?.destroy();
});
</script>

<style>
#map-container {
    width: 100%;
    height: 100%;
}

#map-panel {}

#map-search {}
</style>