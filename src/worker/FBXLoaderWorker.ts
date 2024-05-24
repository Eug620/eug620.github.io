// import { FBXLoader } from "three/examples/jsm/Addons.js";
// import * as THREE from "three";
// interface Model {
//     progress: number
//     key: string
//     url: string
//     model: null | any
// }

self.addEventListener('message',async (e) => {
    console.log(self);
    
    // const models = await Promise.all(e.data.models.map(loadModels))
    self.postMessage({
        type: 'finish',
        models: e.data
    })
    // models.forEach(Mesh => {
    //     // console.log(this.renderer,this.scene, this.camera, '!!!');
    //     (this.scene as THREE.Scene).add(Mesh);
    //     const mixer = new THREE.AnimationMixer(Mesh);
    //     mixer.clipAction(Mesh.animations[0]).play();
    //     setTimeout(() => {
    //         (this.renderer as THREE.WebGLRenderer).render(this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera);
    //         mixer.clipAction(Mesh.animations[0]).play();
    //     }, 2000);
    // })
})

// function loadModels(model: Model): Promise<THREE.Object3D> {
//     return new Promise(async (resolve) => {
//         const loader = new FBXLoader()
//         model.model = await loader.loadAsync(
//             model.url,
//             (event: ProgressEvent) => {
//                 const progress = Math.round((event.loaded / event.total * 100) * 100) / 100;
//                 self.postMessage({
//                     type: 'progress',
//                     key: model.key,
//                     progress
//                 })
//             }
//         );
//         self.postMessage({
//             type: 'model',
//             key: model.key,
//             // model: model.model
//         })
//         resolve(model.model)
//     })
// }

