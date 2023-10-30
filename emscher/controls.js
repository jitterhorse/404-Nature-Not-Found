import { Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';
 
function createControls(camera,renderer,scene) {
    const controls = new OrbitControls( camera, renderer.domElement, scene );
    controls.enableRotate = true;
    controls.autoMover = true;
    controls.enableZoom = false;

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 1;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI;

    controls.tick = (delta) => {
        controls.update();
    };

    controls.addEventListener( 'change', () => {
        let distanceToZero = new Vector3(0,0,0).distanceTo(camera.position);
        sessionStorage.setItem('gameValueA',String(camera.position.x / distanceToZero) );
        sessionStorage.setItem('gameValueB',String(camera.position.y / distanceToZero) );
    });

    controls.setTarget = (nr) =>{      

        var targetTween = new TWEEN.Tween(controls.target)
        .to(appState.scenes[nr].cam_pov, appState.tween_time)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

    }
    
    return controls;
}
 
export { createControls };