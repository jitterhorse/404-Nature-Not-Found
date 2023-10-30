import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
		antialias: true,
		stencil: true,
		depth: true,
		logarithmicDepthBuffer: true
	});

  return renderer;
}


export { createRenderer };