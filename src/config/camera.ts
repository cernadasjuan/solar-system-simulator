import {PerspectiveCamera} from 'three';

export function createCamera(): PerspectiveCamera {
	const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200_000_000);
	camera.position.set(0, 50_000, 400_000);
	return camera;
}
