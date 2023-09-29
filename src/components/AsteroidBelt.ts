import {Group, MathUtils, Matrix4, Vector3} from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';

type Options = {
	minRadius: number;
	maxRadius: number;
	minAsteroidScale: number;
	maxAsteroidScale: number;
	rotationSpeed: number;
};

export class AsteroidBelt {
	asteroids: Group;
	options: Options;

	constructor(options: Options) {
		this.asteroids = new Group();
		this.options = options;
	}

	async initialize(): Promise<void> {
		const material = await new MTLLoader().loadAsync('assets/moons/asteroid.mtl');
		material.preload();
		const asteroid = await new OBJLoader().setMaterials(material).loadAsync('assets/moons/asteroid.obj');
		asteroid.position.copy(this.generateRandomPosition());
		asteroid.scale.addScalar(this.generateRandomScale());
		this.asteroids.add(asteroid);
	}

	addAsteroid(): void {
		const asteroid = this.asteroids.children[0].clone();
		asteroid.position.copy(this.generateRandomPosition());
		asteroid.scale.addScalar(this.generateRandomScale());
		this.asteroids.add(asteroid);
	}

	rotate(delta: number): void {
		// Move around the sun
		const rotationMatrix = new Matrix4().makeRotationY(this.options.rotationSpeed * delta);

		for (const asteroid of this.asteroids.children) {
			asteroid.position.applyMatrix4(rotationMatrix);
		}
	}

	private generateRandomPosition(): Vector3 {
		const randomX = MathUtils.randFloat(this.options.minRadius, this.options.maxRadius);
		return new Vector3(randomX, 0, 0);
	}

	private generateRandomScale(): number {
		return MathUtils.randFloat(this.options.minAsteroidScale, this.options.maxAsteroidScale);
	}
}
