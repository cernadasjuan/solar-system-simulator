import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {type Vector3, type Group} from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';

let material: MTLLoader.MaterialCreator;

type AsteroidOptions = {
	position: Vector3;
	scale: number;
};

export async function createAsteroid({
	position,
	scale,
}: AsteroidOptions): Promise<Group> {
	if (!material) {
		material = await new MTLLoader().loadAsync('assets/moons/asteroid.mtl');
		material.preload();
	}

	const asteroid = await new OBJLoader().setMaterials(material).loadAsync('assets/moons/asteroid.obj');
	asteroid.position.copy(position);
	asteroid.scale.addScalar(scale);

	return asteroid;
}

