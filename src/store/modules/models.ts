/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-23 23:55:32
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-26 22:53:21
 * @FilePath     : /eug620.github.io/src/store/modules/models.ts
 * @Description  : filename
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { toRaw } from "vue";
interface Model {
    progress: number;
    key: string;
    url: string;
    model: null | any;
    mixer: null | THREE.AnimationMixer,
    position: number[],
    actions: THREE.AnimationAction[]
}
export const useModelsStore = defineStore({
    id: "app",
    state: () => ({
        renderer: new THREE.WebGLRenderer({ antialias: true }),
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(),
        clock: new THREE.Clock(),
        mixer: {},
        isLoad: false,
        models: [
            {
                progress: 0,
                key: "Cheering",
                // url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/character.fbx",
                // url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Punching Bag.fbx",
                // url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Cheering.fbx",
                // url: "/Dancing Twerk.fbx",
                // url: "/Cheering.fbx",
                // url:'/Dancing Twerk.fbx',
                url: "https://unpkg.com/e-cdn@1.0.0/micro-vue/Cheering.fbx",
                position: [0, -50, 0],
                model: null,
                mixer: null,
                actions: []
            },
            // {
            //     progress: 0,
            //     key: "Dancing Twerk",
            //     // url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/character.fbx",
            //     // url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Punching Bag.fbx",
            //     // url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/Cheering.fbx",
            //     // url: "/Dancing Twerk.fbx",
            //     // url: "/Cheering.fbx",
            //     url:'/Dancing Twerk.fbx',
            //     // url:"https://unpkg.com/e-cdn@1.0.0/micro-vue/Cheering.fbx",
            //     position:[0,50,0],
            //     model: null,
            //     mixer: null,
            //     actions: []
            // },
        ] as Model[],
    }),
    getters: {
    },
    actions: {
        init(Doms: HTMLElement) {
            Doms.append(this.renderer.domElement);

            if (!this.isLoad) {
                this.isLoad = true;
                const { offsetWidth, offsetHeight } = Doms;
                this.renderer.setClearColor('#000000')
                this.renderer.setSize(offsetWidth, offsetHeight)
                this.renderer.setAnimationLoop(this.renderModels)
                this.renderer.shadowMap.enabled = true

                this.camera = new THREE.PerspectiveCamera(75, offsetWidth / offsetHeight, 0.1, 1000)
                // this.camera.fov = 75
                // this.camera.aspect = offsetWidth / offsetHeight,
                // this.camera.near = 0.1
                // this.camera.far =1000
                this.camera.position.set(30, 30, 30); //设置相机位置



                this.renderer.pixelRatio = window.devicePixelRatio;
                this.renderer.setSize(offsetWidth, offsetHeight);


                // this.scene.fog = new THREE.Fog('#ccc', 60, 60); //雾化场景
                this.scene.background = new THREE.Color(0xf2f5f9);

                // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                // directionalLight.position.set(10, 0, 10);
                // this.scene.add(directionalLight);

                // const light = new THREE.PointLight('#ffffff', 1, 100);
                // light.position.set(50, 50, 50);
                // this.scene.add(light);

                // 地板 - 网格
                const helper = new THREE.GridHelper(100, 100, '#fff', '#ccc');
                this.scene.add(helper);

                // 地板 - 可以反光的地板
                const PlaneGeometry = new THREE.PlaneGeometry(80, 80)
                const MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: '#f2f5f9' })
                const plan = new THREE.Mesh(PlaneGeometry, MeshLambertMaterial)
                plan.rotation.x = -0.5 * Math.PI
                plan.receiveShadow = true
                this.scene.add(plan)
                const AmbientLight = new THREE.AmbientLight('#f2f5f9')
                this.scene.add(AmbientLight)

                // 设置光照
                // 半球光
                const hemisphereLight = new THREE.HemisphereLight('#ffffff', '#000000', 4);
                hemisphereLight.position.set(100, 100, 100);
                this.scene.add(hemisphereLight);


                // 聚光灯
                const spotLight = new THREE.SpotLight('#ffffff')
                spotLight.position.set(100, 40, 100)
                spotLight.castShadow = true;
                spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
                spotLight.shadow.camera.far = 130
                spotLight.shadow.camera.near = 40
                this.scene.add(spotLight);

                // 交互
                const controls = new OrbitControls(this.camera, this.renderer.domElement);
                controls.update();


                this.initModels();
            }


        },
        async renderModels() {
            this.models.forEach(mod => {
                mod.mixer?.update(this.clock.getDelta())
            })
            this.renderer?.render(
                toRaw(this.scene),
                toRaw(this.camera)
            );
        },
        async initModels() {
            await Promise.all(this.models.map(this.loadModels));
        },
        loadModels(model: Model): Promise<THREE.Object3D> {
            return new Promise(async (resolve) => {
                const loader = new FBXLoader();
                model.model = await loader.loadAsync(
                    model.url,
                    (event: ProgressEvent) => {
                        model.progress =
                            Math.round((event.loaded / event.total) * 100 * 100) / 100;
                    }
                );
                model.model.castShadow = true;

                this.scene.add(model.model);
                console.log(model.model.scale.set);
                model.model.scale.set(.15, .15, .15)


                model.mixer = new THREE.AnimationMixer(model.model)
                model.model.animations.forEach((item: THREE.AnimationClip, idx: number) => {
                    model.actions[idx] = (model.mixer as THREE.AnimationMixer).clipAction(item)
                })

                model.actions.forEach(item => item.play())

                resolve(model.model);
            });
        },
    },
});
