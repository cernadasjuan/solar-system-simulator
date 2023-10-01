import {Vector3} from 'three';

// Earth radius 6371 km => 600 radio units
export function scaleKilometers(km: number): number {
	return km * 600 / 6371;
}

export function getRandomVectorWithMagnitude(magnitude: number): Vector3 {
	// Generate random angles for x and z components
	const angle = Math.random() * 2 * Math.PI;

	// Calculate x and z components
	const x = Math.cos(angle) * magnitude;
	const z = Math.sin(angle) * magnitude;

	return new Vector3(x, 0, z);
}

export function getRandomVectorWithMagnitudeInRange(minMagnitude: number, maxMagnitude: number): Vector3 {
	const magnitude = (Math.random() * (maxMagnitude - minMagnitude)) + minMagnitude;
	return getRandomVectorWithMagnitude(magnitude);
}

