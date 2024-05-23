<!--
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-22 23:03:24
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-24 01:41:17
 * @FilePath     : /eug620.github.io/src/views/Three.vue
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div ref="refsThree" class="h-full"></div>
    <!-- <div v-if=" modelsStore.models.find(v => v.progress < 100)" class="fixed top-1/2 text-center w-full">
        <div v-for="model in modelsStore.models" :key="model.key">{{ model.progress }}%</div>
    </div> -->
    <div v-if="loadPregress <100" class="fixed top-1/2 text-center w-full">
        {{ loadPregress}}%
    </div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
// import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { onMounted, ref } from "vue";
import { useModelsStore } from '@/store/modules/models'
const modelsStore = useModelsStore()
const refsThree = ref()
const loadPregress = ref(0)

setTimeout(() => {
    console.log(modelsStore.models);
})
// 1. 创建渲染器,指定渲染的分辨率和尺寸,然后添加到body中
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.pixelRatio = window.devicePixelRatio;


onMounted(() => {

    // modelsStore.init(refsThree.value)
    renderer.setSize((refsThree.value as HTMLElement).offsetWidth, (refsThree.value as HTMLElement).offsetHeight);

    (refsThree.value as HTMLElement).append(renderer.domElement);

    // 2. 创建场景
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 600, 3000); //雾化场景
    scene.background = new THREE.Color(0xf2f5f9);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 0, 10);
    scene.add(directionalLight);

    // 3. 创建相机
    const camera = new THREE.PerspectiveCamera(
        75,
        (refsThree.value as HTMLElement).offsetWidth / (refsThree.value as HTMLElement).offsetHeight,
        0.1,
        1000
    );

    camera.position.set(20, 20, 20); //设置相机位置

    // 地板
    const helper = new THREE.GridHelper(100, 100)
    scene.add(helper)


    // 设置光照
    // 半球光
    const hemisphereLight = new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        1
    );
    hemisphereLight.position.set(30, 30, 30);
    scene.add(hemisphereLight);



    // 模型地址
    asyncLoadFbx(scene, camera)

    // 交互
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
})


const asyncLoadFbx = async (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    // 模型地址
    const loader = new FBXLoader()
    const loadedModel = await loader.loadAsync(
        '//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Punching Bag.fbx',
        // '//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/character.fbx',
        (event: ProgressEvent) => {
            loadPregress.value = Math.round((event.loaded / event.total * 100) * 100) / 100;
            // console.log(loadPregress.value);
        }
    );
    console.log(loadedModel);
    // loadedModel.scale.set(.1,.1,.1)
    
    scene.add(loadedModel);

    const mixer = new THREE.AnimationMixer(loadedModel);
    mixer.clipAction(loadedModel.animations[0]).play();
    // const clipAction = mixer.clipAction(loadedModel.animations[0]);
    // const clipAction1 = mixer.clipAction(loadedModel.animations[1]);
    // clipAction.crossFadeTo(clipAction1, 0.25, true)

    setInterval(() => {
        // clipAction.play();
    }, 2000)

    setTimeout(() => {
        renderer.render(scene, camera);
        mixer.clipAction(loadedModel.animations[0]).play();
    }, 200);
}


</script>

<style></style>