import { render } from "vue";

class Resizer {
  constructor(container, camera, renderer, effects) {

    this.setSize(container, camera, renderer ,effects);

    window.addEventListener('resize', () => {
      this.setSize(container, camera, renderer , effects);
    });
  }

  setSize (container, camera, renderer, effects) {
    const canvas = container.getBoundingClientRect()
    const width = canvas.width;
    const height = canvas.height;

    renderer.setSize(width, height);
    effects.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  
}
export { Resizer }