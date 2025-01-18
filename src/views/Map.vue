<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-26 23:57:43
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-01-18 17:01:21
 * @FilePath     : /eug620.github.io/src/views/Map.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div id="map-container"></div>
    <div id="map-panel" class="fixed w-80 left-2 top-16" v-show="searchVal"></div>
    <input  @change="useSearchChange" v-model="searchVal"
        class="w-80 top-16 left-1/2 rounded-full -translate-x-1/2 fixed outline-none px-4 py-2 placeholder:italic placeholder:text-slate-400" placeholder="请输入检索信息">
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
                    pageSize: 8, // 单页显示结果条数
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
                var toolbar = new AMap.ToolBar({position: 'RB',offset: [30,100]}); //缩放工具条实例化
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
                    console.log('getLocalCity:',type, info)
                    // localStorage.setItem('getLocalCity-type', type)
                    // localStorage.setItem('getLocalCity-info', JSON.stringify(type))
                    if (type === "complete") {
                        // map.setCenter([116.333926, 39.997245])
                        console.log('当前城市：',info);
                    }
                })
            });
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                    timeout: 10000, // 设置定位超时时间，默认：无穷大
                    offset: [10, 20],  // 定位按钮的停靠位置的偏移量
                    zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    position: 'LT' //  定位按钮的排放位置,  RB表示右下
                })

                geolocation.getCurrentPosition(function(status:string,result:any){
                        console.log('getCurrentPosition:',status, result)
                        // localStorage.setItem('getCurrentPosition-status', status)
                        // localStorage.setItem('getCurrentPosition-result', JSON.stringify(result))
                        if(status=='complete'){
                            onComplete(result)
                        }else{
                            onError(result)
                        }
                });

                function onComplete (data:any) {
                    // data是具体的定位信息
                    console.log('onComplete:',data)
                    map.setCenter([data.position.lng,data.position.lat])
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(data.position.lng,data.position.lat),
                        icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                        anchor: 'center',
                    });
                    map.add(marker);
                }

                function onError (data:any) {
                    // 定位出错
                    console.log('err',data)

                }
            })
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

document.addEventListener('keydown',(e)=>{
    if(e.altKey&&e.keyCode===70){
        console.log('alt+f');
    }
})
</script>

<style>
#map-container {
    width: 100%;
    height: 100%;
}

#map-panel {}

#map-search {}
</style>