import { DirectionalLight, PointLight, AmbientLight, Group} from "three";

function createLights(color) {
    const ambientLight = new AmbientLight(color,2);

	const lightRed = new DirectionalLight(0xffef00, 5.5);
	lightRed.position.set(-1, 0, 0);
	lightRed.target.position.set(0, 0, 0);

	const lightGreen = new DirectionalLight(0xff06ff, 5.5);
	lightGreen.position.set(1, 0, 0);
	lightGreen.target.position.set(0, 0, 0);

	const lights = new Group();
	lights.add(ambientLight,lightRed,lightGreen);

    lights.tick = (delta) => "";

	return lights;
}

export { createLights };