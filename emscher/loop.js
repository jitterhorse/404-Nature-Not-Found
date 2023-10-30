import { Clock } from 'three';
import Stats from 'stats.js'
import * as TWEEN from '@tweenjs/tween.js'

class Loop {

  constructor(camera, scene, renderer, effects) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.effects = effects;
    this.controls = null;
    this.updatables = [];
    this.showPanel = false;
    this.clock = new Clock();
    this.stats = new Stats()

    document.addEventListener("keydown",(event) => this.logKey(event),false);
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    //document.body.appendChild(this.stats.dom);
  }

  logKey(e) {
    if (e.code === "KeyF") {
      if(!this.showPanel){
        this.showPanel = true;
        document.body.appendChild(this.stats.dom);
      } 
      else{
        this.showPanel = false;
        document.body.removeChild(this.stats.dom)
      }
    }
  }
  
  start() {
    this.renderer.setAnimationLoop(() => {
      if (!appState.isChatOpen && appState.currentPage404 === undefined) {
        this.tick();
        //render a frame
        this.renderer.render(this.scene, this.camera);
      }
    });
  }
  
  stop() {
    this.renderer.setAnimationLoop(null);
  }

  quit(){
    this.renderer.dispose();
    this.removeElementsFromScene();
    window.removeEventListener("keydown",this.logKey);
  }

  removeElementsFromScene(){
    for (let object of this.updatables) {
      if(object.type === "Mesh"){ 
        this.scene.remove(object);
        object.material.displacementMap.dispose();
        object.material.dispose();
        object.geometry.dispose();
        
        object = null;
      }
      else if(object.type === "River" || object.type === "Map") object.dispose();
      else if(object.type === "Group"){
        object.traverse(function(child){
          if(child.type === "Light"){
            object.remove(child);
          }
        });
      }
      else object.dispose();
    }
    this.updatables = [];
  }
  
  tick() {
    this.stats.begin();
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();
    for (const object of this.updatables) {
        object.tick(delta,time);
    }
    this.controls.tick(delta);
    this.effects.tick();
    this.camera.tick();
    TWEEN.update();
    this.stats.end();
    this.stats.update();
  }
}
 
export { Loop }