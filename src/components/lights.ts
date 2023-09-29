import {AmbientLight, PointLight} from 'three';

export function getSunlight(): PointLight {
	const sunlight = new PointLight(0xffffff, 10, 0, 0);
	sunlight.castShadow = true;
	return sunlight;
}

export function getAmbientLight(): AmbientLight {
	return new AmbientLight(0xffffff, 0.025);
}
