import { PerspectiveCamera } from 'three';
import * as TWEEN from '@tweenjs/tween.js';

function createCamera() {
  const camera = new PerspectiveCamera(
    55, // FOV = Field Of View
    1, // Aspect ratio (dummy value)
    0.1, // Near clipping plane
    10000, // Far clipping plane
  );
  camera.near = 0.01;
  
  camera.tick = (delta) => {
    
  };

  camera.goToScene = (nr) => {
    var camPosTween = new TWEEN.Tween(camera)
      .to({position: appState.scenes[nr].cam_pos, fov: appState.scenes[nr].cam_fov}, appState.tween_time)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(function(){
        camera.updateProjectionMatrix()})
      .start();
  };


 return camera;
}
 
export { createCamera };