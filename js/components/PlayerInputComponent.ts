import { Vector3, Raycaster } from 'three';
import Actor from '../Actor';
import Component from '../Component';
import globals from '../globals';

type Inputs = {
	[action: string]: Action;
};

type Action = {
	ownerAction: string;
	value: number;
	axis: string;
};

export default class PlayerInputComponent extends Component {
	pressedKeys: Array<string>;
	raycaster: Raycaster;
	actions: Inputs;

	constructor(owner: Actor) {
		super(owner);

		this.setupPlayerInputComponent();
		this.pressedKeys = [];
		this.raycaster = new Raycaster();

		this.actions = <Inputs>{};
	}

	setupPlayerInputComponent(): void {
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
		// document.addEventListener('mousemove', this.handleMouseMove.bind(this));
	}

	/**
	 * Bind a method on the parent actor to a key press
	 * @param  {string} key // key that is pressed to trigger the method
	 * @param  {number} value // optional value
	 * @param  {string} ownerAction
	 * @returns void
	 */
	bindAction(key: string, ownerAction: string, value = 0, axis = 'x'): void {
		this.actions[key] = { ownerAction, value, axis };
	}

	getActions(): Inputs {
		return this.actions;
	}

	handleKeyDown(e: KeyboardEvent): void {
		if (!this.actions[e.key] || e.repeat) {
			return;
		}

		const a = this.actions[e.key];

		// this.actions[e.key].bind(this);

		// console.log(this.actions[e.key]));

		// this.owner[a.ownerAction](a.value);

		if (this.owner && this.owner[a.ownerAction]) {
			this.owner[a.ownerAction](a.value, a.axis);
		}
	}

	handleKeyUp(e: KeyboardEvent): void {
		if (!this.actions[e.key] || e.repeat) {
			return;
		}
	}
}
