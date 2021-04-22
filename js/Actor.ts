import { Scene } from 'three';

export default class Actor extends Scene {
	bShouldTick: boolean;

	constructor() {
		super();

		this.bShouldTick = false;
	}

	tick(deltaTime: number): Actor {

		return this;
	}
}