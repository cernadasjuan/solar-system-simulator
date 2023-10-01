import {
	SphereGeometry,
	Mesh,
	TextureLoader,
	MathUtils,
	type Vector3,
	MeshStandardMaterial,
	Matrix4,
	TorusGeometry,
	MeshBasicMaterial,
	DoubleSide,
	RingGeometry,
	FrontSide,
} from 'three';

type CelestialBodyOptions = {
	radius: number;
	texturePath: string;
	axialTiltDegrees: number;
	selfRotationSpeed: number;
	initialPosition: Vector3;
	parent: Mesh;
	rotationSpeed: number;
	showOrbit?: boolean;
	isRing?: boolean;
	ringWidth?: number;
};

export class CelestialBody {
	selfRotationSpeed: number;
	rotationSpeed: number;
	mesh: Mesh;
	parent: Mesh;
	orbit?: Mesh;
	moons: CelestialBody[] = [];

	constructor({
		radius,
		axialTiltDegrees,
		initialPosition,
		parent,
		rotationSpeed,
		selfRotationSpeed,
		texturePath,
		showOrbit = true,
		isRing = false,
		ringWidth = 0,
	}: CelestialBodyOptions) {
		this.selfRotationSpeed = selfRotationSpeed;
		this.rotationSpeed = rotationSpeed;
		this.parent = parent;

		// Create mesh
		const geometry = isRing ? new RingGeometry(radius, radius + ringWidth, 128, 128) : new SphereGeometry(radius, 128, 128);
		const material = new MeshStandardMaterial({
			map: new TextureLoader().load(`assets/${texturePath}`),
			side: isRing ? DoubleSide : FrontSide,
		});
		this.mesh = new Mesh(geometry, material);

		// Apply axial tilt rotation
		this.mesh.rotateX(MathUtils.degToRad(axialTiltDegrees));

		// Set inicial position
		this.mesh.position.copy(initialPosition);

		if (isRing) {
			this.mesh.rotateX(MathUtils.degToRad(90));
		}

		// Configure shadows
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		// Draw orbit (only planets)
		if (showOrbit) {
			const orbitGeometry = new TorusGeometry(initialPosition.length(), 250, 128, 128);
			const orbitMaterial = new MeshBasicMaterial({color: 0xffffff});
			this.orbit = new Mesh(orbitGeometry, orbitMaterial);
			this.orbit.rotateX(MathUtils.degToRad(90));
		}
	}

	rotate(delta: number): void {
		// Self rotation
		this.mesh.rotateY(this.selfRotationSpeed * delta);

		// Move around the parent
		const rotationMatrix = new Matrix4().makeRotationY(this.rotationSpeed * delta);
		this.mesh.position.applyMatrix4(rotationMatrix);

		// Rotate moons
		this.moons.forEach(moon => {
			moon.rotate(delta);
		});
	}

	getPosition(): Vector3 {
		return this.mesh.position;
	}

	addMoon(moon: CelestialBody): void {
		this.moons.push(moon);
		this.mesh.add(moon.mesh);
	}
}
