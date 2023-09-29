import {Clock, type Mesh, Scene, Vector3} from 'three';
import {createSkybox} from './components/skybox';
import {createCamera} from './config/camera';
import {createRenderer} from './config/renderer';
import {createControls} from './config/controls';
import {CelestialBody} from './components/CelestialBody';
import {getAmbientLight} from './components/lights';
import {Sun} from './components/Sun';
import {scaleKilometers} from './utils';
import {AsteroidBelt} from './components/AsteroidBelt';

(async function () {
	const celestialBodyRadiusScaleFactor = 20;
	const celestialBodyDistanceScaleFactor = 0.1;

	const scene = new Scene();
	const renderer = createRenderer();
	document.body.appendChild(renderer.domElement);

	const camera = createCamera();
	const controls = createControls(camera, renderer);
	const clock = new Clock();

	// Resize canvas on window resize
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});

	const skybox = createSkybox();
	scene.add(skybox);

	const sun = new Sun();
	const celestialBodies: CelestialBody[] = [];

	const mercury = new CelestialBody({
		radius: scaleKilometers(2439.7) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/mercury.jpeg',
		axialTiltDegrees: 0.027,
		selfRotationSpeed: 0.01,
		initialPosition: new Vector3(scaleKilometers(57_900_000) / 10, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(mercury);

	const venus = new CelestialBody({
		radius: scaleKilometers(6051.8) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/venus.jpeg',
		axialTiltDegrees: 177.3,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(108_200_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(venus);

	const earth = new CelestialBody({
		radius: scaleKilometers(6371) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/earth.jpeg',
		axialTiltDegrees: 23.44,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(149_600_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(earth);

	const moon = new CelestialBody({
		radius: scaleKilometers(1737) * celestialBodyRadiusScaleFactor,
		texturePath: 'moons/moon.jpeg',
		axialTiltDegrees: 0,
		selfRotationSpeed: 0.1,
		rotationSpeed: 0.7,
		initialPosition: new Vector3(scaleKilometers(384400), 0, 0),
		parent: earth.mesh,
		showOrbit: false,
	});

	const mars = new CelestialBody({
		radius: scaleKilometers(3389.5) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/mars.jpeg',
		axialTiltDegrees: 25.19,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(227_900_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(mars);

	const jupiter = new CelestialBody({
		radius: scaleKilometers(58232) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/jupiter.jpeg',
		axialTiltDegrees: 3,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(778_300_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(jupiter);

	const saturn = new CelestialBody({
		radius: scaleKilometers(69911) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/saturn.jpeg',
		axialTiltDegrees: 26.74,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(1427_000_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(saturn);

	const saturnRings = new CelestialBody({
		radius: scaleKilometers(147_000) * celestialBodyRadiusScaleFactor,
		texturePath: 'moons/saturn_rings.png',
		axialTiltDegrees: 26.74,
		selfRotationSpeed: 0,
		initialPosition: saturn.getPosition(),
		rotationSpeed: 0.01,
		parent: saturn.mesh,
		showOrbit: false,
		isRing: true,
		ringWidth: scaleKilometers(57600) * celestialBodyRadiusScaleFactor,
	});
	celestialBodies.push(saturnRings);

	const uranus = new CelestialBody({
		radius: scaleKilometers(25362) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/uranus.jpeg',
		axialTiltDegrees: 97.7,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(2871_000_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(uranus);

	const neptune = new CelestialBody({
		radius: scaleKilometers(24622) * celestialBodyRadiusScaleFactor,
		texturePath: 'planets/neptune.jpeg',
		axialTiltDegrees: 28,
		selfRotationSpeed: 0.1,
		initialPosition: new Vector3(scaleKilometers(4498_000_000) * celestialBodyDistanceScaleFactor, 0, 0),
		rotationSpeed: 0.01,
		parent: sun.mesh,
	});
	celestialBodies.push(neptune);

	earth.addMoon(moon);

	scene.add(getAmbientLight());
	scene.add(sun.mesh);

	celestialBodies.forEach(celestialBody => {
		scene.add(celestialBody.mesh);
		if (celestialBody.orbit) {
			scene.add(celestialBody.orbit);
		}
	});

	// Asteroid belt
	const asteroidBelt = new AsteroidBelt({
		minRadius: scaleKilometers(300_000_000) * celestialBodyDistanceScaleFactor,
		maxRadius: scaleKilometers(500_000_000) * celestialBodyDistanceScaleFactor,
		minAsteroidScale: 1,
		maxAsteroidScale: 10,
		rotationSpeed: 0.01,
	});

	await asteroidBelt.initialize();

	for (let i = 0; i < 10; i++) {
		asteroidBelt.addAsteroid();
	}

	scene.add(asteroidBelt.asteroids);

	// Render loop
	function animate() {
		const delta = clock.getDelta();
		controls.update(delta);

		// Skybox is always centered on camera
		skybox.position.set(camera.position.x, camera.position.y, camera.position.z);

		sun.rotate(delta);

		// Celestial bodies movement
		celestialBodies.forEach(celestialBody => {
			celestialBody.rotate(delta);
		});

		asteroidBelt.rotate(delta);

		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}

	animate();
})();

