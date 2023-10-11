import * as THREE from 'three';

const SCENE_COLORS: {[sceneName: string]: number} = {
    Intro: 0x00ff00,
    Begriffe: 0x00ffff,
    Pferde: 0x0000ff,
    Rezepte: 0xff00ff,
    Emscher: 0xff0000,
    Autos: 0xffff00,
    Beschwerde: 0xff8888,
    Strahlwirkung: 0xff88ff,
    Fiktion: 0x88ffff,
    Cholera: 0x00ff88,
}

let currentScene = 'Intro';
let shouldRender = true;

export function worldSetup(container: HTMLElement) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    window.addEventListener('renderer-status', (event) => {
        shouldRender = event.detail.targetStatus;
    })
    window.addEventListener('change-scene', (event) => {
        currentScene = event.detail.targetScene;
    })

    function animate() {
        requestAnimationFrame(animate);

        if (!shouldRender) {
            return;
        }

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.material.color.setHex(SCENE_COLORS[currentScene]);
        renderer.render(scene, camera);
    }

    animate();
}