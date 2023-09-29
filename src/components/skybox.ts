import {BackSide, BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader} from 'three';

const skyboxSize = 199_000_000;

export function createSkybox(): Mesh {
	const geometry = new BoxGeometry(skyboxSize, skyboxSize, skyboxSize);
	const textureLoader = new TextureLoader();
	const material = [
		textureLoader.load('assets/skybox/space_ft.png'),
		textureLoader.load('assets/skybox/space_bk.png'),
		textureLoader.load('assets/skybox/space_up.png'),
		textureLoader.load('assets/skybox/space_dn.png'),
		textureLoader.load('assets/skybox/space_rt.png'),
		textureLoader.load('assets/skybox/space_lf.png'),
	].map(texture => new MeshBasicMaterial({map: texture, side: BackSide}));

	return new Mesh(geometry, material);
}
