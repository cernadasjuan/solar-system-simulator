import {FlyControls} from 'three/examples/jsm/controls/FlyControls.js';
import {type Renderer, type Camera} from 'three';

export function createControls(camera: Camera, renderer: Renderer): FlyControls {
	const controls = new FlyControls(camera, renderer.domElement);
	controls.movementSpeed = 2_000_000;
	controls.rollSpeed = Math.PI / 3;
	controls.dragToLook = true;
	return controls;
}
