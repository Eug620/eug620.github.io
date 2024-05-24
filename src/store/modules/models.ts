/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-05-23 23:55:32
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-05-24 01:36:27
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
}
export const useModelsStore = defineStore({
  id: "app",
  state: () => ({
    renderer: null as null | THREE.WebGLRenderer,
    scene: null as null | THREE.Scene,
    camera: null as null | THREE.PerspectiveCamera,
    models: [
      {
        progress: 0,
        key: "character",
        url: "//cdn.jsdelivr.net/gh/eug620/Pics@master/micro-vue/character.fbx",
        model: null,
      },
    ] as Model[],
  }),
  getters: {
  },
  actions: {
    init(Doms: HTMLElement) {
      const { offsetWidth, offsetHeight } = Doms;
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.pixelRatio = window.devicePixelRatio;
      this.renderer.setSize(offsetWidth, offsetHeight);
      Doms.append(this.renderer.domElement);

      // 2. 创建场景
      this.scene = new THREE.Scene();

      // scene.fog = new THREE.Fog(0xffffff, 600, 3000); //雾化场景
      this.scene.background = new THREE.Color(0xf2f5f9);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 0, 10);
      this.scene.add(directionalLight);

      // 3. 创建相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        offsetWidth / offsetHeight,
        0.1,
        1000
      );

      this.camera.position.set(20, 20, 20); //设置相机位置

      // 地板
      const helper = new THREE.GridHelper(100, 100);
      this.scene.add(helper);

      // 设置光照
      // 半球光
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
      hemisphereLight.position.set(30, 30, 30);
      this.scene.add(hemisphereLight);

      // 交互
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.update();

      this.initModels();
      //   const fbxLoaderWorker = new Worker(new URL('../../worker/FBXLoaderWorker.ts', import.meta.url));
      //   console.log(fbxLoaderWorker,'fbxLoaderWorker');

      //   fbxLoaderWorker.postMessage({
      //     // loader: new FBXLoader(),
      //     url: this.models[0].url
      //   });
      //   fbxLoaderWorker.onmessage = (e) => {
      //     console.log(e, 'get');
      //   }
    },
    async initModels() {
      const models = await Promise.all(this.models.map(this.loadModels));
      console.log(models);
      models.forEach((Mesh) => {
        (this.scene as THREE.Scene).add(Mesh);
        const mixer = new THREE.AnimationMixer(Mesh);
        mixer.clipAction(Mesh.animations[0]).play();

        setTimeout(() => {
          this.renderer?.render(
            toRaw(this.scene as THREE.Scene),
            toRaw(this.camera as THREE.PerspectiveCamera)
          );
          mixer.clipAction(Mesh.animations[0]).play();
        }, 200);
      });
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
        resolve(model.model);
      });
    },
  },
});
