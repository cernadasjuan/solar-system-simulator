import {Group, MathUtils, Matrix4} from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {getRandomVectorWithMagnitudeInRange} from '../utils';

type Options = {
	minRadius: number;
	maxRadius: number;
	minAsteroidScale: number;
	maxAsteroidScale: number;
	rotationSpeed: number;
	numberOfAsteroids: number;
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
		asteroid.position.copy(getRandomVectorWithMagnitudeInRange(this.options.minRadius, this.options.maxRadius));
		asteroid.scale.addScalar(this.generateRandomScale());
		this.asteroids.add(asteroid);

		for (let i = 0; i < this.options.numberOfAsteroids; i++) {
			this.addAsteroid();
		}
	}

	rotate(delta: number): void {
		// Move around the sun
		const rotationMatrix = new Matrix4().makeRotationY(this.options.rotationSpeed * delta);

		for (const asteroid of this.asteroids.children) {
			asteroid.position.applyMatrix4(rotationMatrix);
		}
	}

	private addAsteroid(): void {
		const asteroid = this.asteroids.children[0].clone();
		asteroid.position.copy(getRandomVectorWithMagnitudeInRange(this.options.minRadius, this.options.maxRadius));
		asteroid.scale.addScalar(this.generateRandomScale());
		this.asteroids.add(asteroid);
	}

	private generateRandomScale(): number {
		return MathUtils.randFloat(this.options.minAsteroidScale, this.options.maxAsteroidScale);
	}
}
