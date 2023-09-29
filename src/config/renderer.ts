import {type Renderer, WebGLRenderer} from 'three';

export function createRenderer(): Renderer {
	const renderer = new WebGLRenderer({
		antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	return renderer;
}
