import { PerspectiveCamera, Scene, Vector2 } from 'three';

const globals = {
	deltaTime: 0,
	mousePos: new Vector2(),
	camera: new PerspectiveCamera(),
	rootScene: new Scene()
};

export default globals;
