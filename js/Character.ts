// <reference path="app.ts" />

import { Vector3 } from 'three';
import Actor from './Actor';
import MeshComponent from './components/MeshComponent';
import PlayerInputComponent from './components/PlayerInputComponent';
import CameraComponent from './components/CameraComponent';

import globals from './globals';

export default class Character extends Actor {
	playerInputComponent: PlayerInputComponent;
	meshComponent: MeshComponent;
	cameraComponent: CameraComponent;
	movementInput: Vector3;

	constructor() {
		super();

		this.playerInputComponent = new PlayerInputComponent(this);
		this.meshComponent = new MeshComponent(this);
		this.cameraComponent = new CameraComponent(this);

		this.cameraComponent.camera.position.set(0, 3, -3).multiplyScalar(3);
		this.cameraComponent.camera.lookAt(0, 2, 0);

		globals.camera = this.cameraComponent.camera;

		// this.playerInputComponent.bindAction('keyDown', 'move');
		// this.playerInputComponent.bindAction('mouseMove', 'trackMouse');

		this.playerInputComponent.bindAction('w', 'addMovementInput', 1, 'z');

		this.bShouldTick = true;

		this.movementInput = new Vector3(0);
	}

	move(): void {
		// console.log('test');
		// const v = new Vector3();
		// const k = this.playerInputComponent.pressedKeys;
		// k.includes('w') ? (v.z += 1) : (v.z += 0);
		// k.includes('s') ? (v.z -= 1) : (v.z -= 0);
		// k.includes('a') ? (v.x += 1) : (v.x += 0);
		// k.includes('d') ? (v.x -= 1) : (v.x -= 0);
		// this.position.z += v.z;
		// this.position.x += v.x;
		// this.position.y += v.y;

		this.position.add(this.movementInput);
	}

	addMovementInput(value: number, axis: string): void {
		this.movementInput[axis] = value;
	}

	trackMouse(e: CustomEvent): void {
		console.log(this.position);
	}

	tick(deltaTime: number): Actor {
		super.tick(deltaTime);

		this.move();

		return this;
	}
}
