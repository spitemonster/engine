import Actor from '../Actor';
import Component from '../Component';
import { PerspectiveCamera, Vector3 } from 'three';
import globals from '../globals';

export default class CameraComponent extends Component {
	camera: PerspectiveCamera;

	constructor(owner: Actor) {
		super(owner);

		// camera vars
		const fov = 75;
		const aspectRatio: number = window.innerWidth / window.innerHeight;
		const nearPlane = 0.1;
		const farPlane = 1000;

		this.camera = new PerspectiveCamera(
			fov,
			aspectRatio,
			nearPlane,
			farPlane
		);

		this.owner.add(this.camera);
	}

	setFOV(inFov: number): void {
		this.camera.fov = inFov;
	}

	setAspectRatio(inAspectRatio: number): void {
		this.camera.aspect = inAspectRatio;
	}

	setNearPlane(inNearPlane: number): void {
		this.camera.near = inNearPlane;
	}

	setFarPlane(inFarPlane: number): void {
		this.camera.far = inFarPlane;
	}
}
