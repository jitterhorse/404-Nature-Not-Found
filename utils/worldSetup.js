import * as THREE from 'three';

import { createCamera } from "~/emscher/camera.js";
import { createLights } from "~/emscher/lights.js";
import { createScene } from "~/emscher/scene.js";
import { createRenderer } from "~/emscher/renderer.js";
import { createControls } from "~/emscher/controls.js";
import { createEffects } from "~/emscher/effects.js";
import { Loop } from "~/emscher/loop.js"
import { Resizer } from "~/emscher/Resizer.js";
import { Emscher } from '~/emscher/emscher';

let camera;
let renderer;
let scene;
let effects;
let loop;
let controls;
 
export class worldSetup {
   constructor(container) {
        // Instances of camera, scene, and renderer
        camera = createCamera();
        scene = createScene("black");
        renderer = createRenderer();
        container.append(renderer.domElement);

        this.sceneElements = [];

        // add Effects
        effects = createEffects(camera,scene,renderer);

        // Initialize Loop
        loop = new Loop(camera, scene, renderer, effects);

        // add Controls
        controls = createControls(camera,renderer,scene);
        loop.controls = controls;

        // add Resizer
        const resizer = new Resizer(container, camera, renderer, effects);
        resizer.onResize = () => {
            this.render();
        };

        // load Emscher and set camera to middle
        const emscher = new Emscher(scene);
        emscher.init().then(function(){      
          camera.goToScene(4);
          controls.setTarget(4);
          }
        )

        // add Buttons Navigation
        window.addEventListener('change-scene', (event) => {
          this.changeScene(event.detail.targetNumber);
        })
    }

    changeScene(scene){
      camera.goToScene(scene);
      controls.setTarget(scene);
    }

    load(){
      // Light Instance, with optional light helper
      const light = createLights("pink");
      loop.updatables.push(light);
      scene.add(light);
      effects.switchOff();
    }

    setCamera(position,fov){
      camera.position.set(position.x,position.y,position.z);
      //camera.camDist = position.z;
      camera.fov = fov;
      controls.update();
    }

    render() {
     renderer.render(scene, camera);
    }

    removeScene(){
      loop.removeElementsFromScene();
    }

    start(_scene) {
      this.removeScene();
      this.load(_scene);
      loop.start();
    }
    stop() {
      loop.stop();
    }
    quit() {
      loop.quit();
    }
 }