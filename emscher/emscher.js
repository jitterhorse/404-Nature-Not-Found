import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { addScene } from '~/utils/appState';

export class Emscher{
    constructor(_scene){
        this.loader = new GLTFLoader();
        this.scene = _scene;  
    }

    async init(){
    
        const gltf = await this.loader.loadAsync( './scene/emscher_small_5.glb' );
        this.scene.add( gltf.scene );

        //store cam positions and foci as well as objects
        gltf.scene.children.forEach(child => {
                if(child.name.includes("rock")){
                    appState.rocks.push(child.children);
                }
                else{
                    addScene(child.children);
                }
            }
        )
    }

    tick(){
        
    }
}

