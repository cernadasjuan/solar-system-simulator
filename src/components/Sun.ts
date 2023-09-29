import {SphereGeometry, Mesh, type Vector3, TextureLoader, MeshBasicMaterial} from 'three';
import {getSunlight} from './lights';
import {scaleKilometers} from '../utils';

export class Sun {
	mesh: Mesh;

	constructor() {
		// Create mesh
		const geometry = new SphereGeometry(scaleKilometers(1_400_000), 128, 128);
		const material = new MeshBasicMaterial({
			map: new TextureLoader().load('assets/stars/sun.jpeg'),
		});
		this.mesh = new Mesh(geometry, material);
		this.mesh.position.set(0, 0, 0);
		this.mesh.add(getSunlight());
	}

	rotate(delta: number): void {
		this.mesh.rotateY(0.1 * delta);
	}

	getPosition(): Vector3 {
		return this.mesh.position;
	}
}
