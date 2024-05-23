<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 23:03:24
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-23 01:55:03
 * @FilePath     : /eug620.github.io/src/views/Three.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div ref="refsThree" class="h-full"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
// import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";


import { onMounted, ref } from "vue";
console.log(THREE);
console.log(FBXLoader);

const refsThree = ref()

// 1. 创建渲染器,指定渲染的分辨率和尺寸,然后添加到body中
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.pixelRatio = window.devicePixelRatio;


onMounted(() => {

    renderer.setSize((refsThree.value as HTMLElement).offsetWidth, (refsThree.value as HTMLElement).offsetHeight);

    (refsThree.value as HTMLElement).append(renderer.domElement);

    // 2. 创建场景
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 600, 3000); //雾化场景
    scene.background = new THREE.Color(0xf2f5f9);


    // 3. 创建相机
    const camera = new THREE.PerspectiveCamera(
        75,
        (refsThree.value as HTMLElement).offsetWidth / (refsThree.value as HTMLElement).offsetHeight,
        0.1,
        1000
    );

    camera.position.set(10, 10, 30); //设置相机位置



    const helper = new THREE.GridHelper(1000, 1000)
    scene.add(helper)


    // 设置光照
    // 半球光
    const hemisphereLight = new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        1
    );
    hemisphereLight.position.set(0, 200, 0);
    scene.add(hemisphereLight);
    // 点光源
    const light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(0, 0, 100);
    scene.add(light);


    // 模型地址
    const loader = new FBXLoader()
    loader.load(
        'models/character.fbx',
        function (loadedModel: any) {
            console.log(loadedModel, scene);
            // let mesh = loadedModel.children[0].clone();
            scene.add(loadedModel);
            renderer.render(scene, camera);
            // const controls = new OrbitControls(camera, renderer.domElement);
            // controls.update();

        }
    );
    // const _loader = new GLTFLoader();
    // // 初始化模型解压器
    // const dracoLoader = new DRACOLoader()
    // // 设置解压器使用位置（本地开发路径）
    // // dracoLoader.setDecoderPath('../public/static/draco/')
    // // 设置解压器使用位置（打包路径）
    // dracoLoader.setDecoderPath('./static/draco/')
    // // 设置模型载入解压器
    // _loader.setDRACOLoader(dracoLoader);

    // // 加载模型
    // _loader.load('models/664e2d9c05800ac00b5d0038.glb', (gltf: GLTF) => {
    //     // 初始化环境光，环境光不能用来投射阴影，因为它没有方向。
    //     const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 白光，强度为1
    //     // 环境光添加至场景中
    //     scene.add(ambientLight);

    //     // 添加平行光，使物体看起来更加有效果
    //     const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    //     // 根据需要自行调整位置
    //     dirLight.position.set(0, 1, 0);
    //     // 场景中添加平行光
    //     scene.add(dirLight);

    //     gltf.scene.traverse((child: any) => {
    //         if (child.isMesh) {
    //             // 模型双面渲染
    //             child.material.side = THREE.DoubleSide;
    //             // 光照是否有阴影
    //             child.castShadow = true;
    //             // 是否接收阴影
    //             child.receiveShadow = true;
    //             child.frustumCulled = false;
    //         }
    //     });
    //     scene.add(gltf.scene)

    // })



    // 5. 渲染
    // renderer.render(scene, camera);


    // 交互
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

})



</script>

<style></style>