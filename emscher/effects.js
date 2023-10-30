
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { Vector2 } from "three";


function createEffects(_camera, _scene, _renderer){
    const scene = _scene;
    const camera = _camera;
    const renderer = _renderer;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const renderScene = new RenderPass(scene, camera); 
    const bloomPass = new UnrealBloomPass(new Vector2(w, h), 0.5, 2, 0.1); // resolution, strength, radius, threshold

    const afterImagePass = new AfterimagePass();
    afterImagePass.uniforms["damp"].value = 0.86;

    const composer = new EffectComposer(_renderer);
    composer.addPass(renderScene);
    //composer.addPass(bloomPass);
    //composer.addPass(afterImagePass);

    function switchOn(){
        if(composer.passes.includes(afterImagePass) == false) composer.addPass(afterImagePass);
    }

    function switchOff(){
        if(composer.passes.includes(afterImagePass) == true) composer.removePass(afterImagePass);
    }

    composer.tick = () => composer.render(scene, camera);
    composer.resize = () => composer.setSize(renderer.getSize());
    composer.switchOn = () => switchOn();
    composer.switchOff = () => switchOff();


    return composer;
}

export {createEffects};