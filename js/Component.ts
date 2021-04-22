import { Scene } from 'three';
import Actor from './Actor';

export default class Component extends Scene {
	owner: Actor;

	constructor(owner: Actor) {
		super();

		this.owner = owner;
	}
}