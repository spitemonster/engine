import Component from '../Component';
import Actor from '../Actor';
import { Group } from 'three';

export default class MeshComponent extends Component {
	mesh: Group;

	constructor(owner: Actor) {
		super(owner);

		this.mesh = <Group>{};
	}

	addMesh(inMesh: Group): void {
		this.mesh = inMesh;

		this.owner.add(this.mesh);
	}
}