import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	DirectionalLight,
	// PointLight,
	Mesh,
	// CylinderBufferGeometry,
	// MeshBasicMaterial,
	// SphereBufferGeometry,
	PlaneBufferGeometry,
	// Sphere,
	// MeshPhongMaterial,
	MeshStandardMaterial,
	// Color,
	// Object3D,
	// AxesHelper,
	// GridHelper,
	// BoxGeometry,
	// CylinderGeometry,
	Vector3,
	// SplineCurve,
	// SphereGeometry,
	// BufferGeometry,
	// LineBasicMaterial,
	// Line,
	// ShaderMaterial,
	LoadingManager
} from 'three';

import globals from './globals';

import Actor from './Actor';
import Character from './Character';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const models = {
	knight: {
		url: '/KnightCharacter.gltf'
	}
};

const uniforms = {
	iTime: { value: 0 },
	iResolution: { value: new Vector3() }
};

class Engine {
	canvas: HTMLCanvasElement;
	renderer: WebGLRenderer;
	rootScene: Scene;
	camera: PerspectiveCamera;
	loadingManager: LoadingManager;
	controls: OrbitControls;
	actors: Array<Actor>;

	/**
	 * constructor
	 * @param  {string} selector css selector used to grab the canvas to which we bind three
	 */
	constructor(selector: string) {
		this.canvas = this.getCanvas(selector);
		// canvas vars
		const dpr: number = window.devicePixelRatio || 1;
		const rect: DOMRect = this.canvas.getBoundingClientRect();

		// camera vars
		const fov = 75;
		const aspectRatio: number = this.canvas.width / this.canvas.height;
		const nearPlane = 0.1;
		const farPlane = 1000;

		this.canvas.width = rect.width * dpr;
		this.canvas.height = rect.height * dpr;

		this.rootScene = new Scene();
		globals.rootScene = this.rootScene;

		this.renderer = new WebGLRenderer({ canvas: this.canvas });
		this.renderer.setClearColor(0x000000);
		this.renderer.shadowMap.enabled = true;

		this.camera = new PerspectiveCamera(
			fov,
			aspectRatio,
			nearPlane,
			farPlane
		);
		this.camera.position.set(8, 4, 10).multiplyScalar(3);
		this.camera.lookAt(0, 0, 0);

		globals.camera = this.camera;

		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.target.set(0, 0, 0);
		this.controls.update();

		this.actors = [];

		this.addLights();

		// setup loading manager and call init when loading is finished
		this.loadingManager = new LoadingManager();
		this.loadingManager.onLoad = this.init.bind(this);

		const gltfLoader = new GLTFLoader(this.loadingManager);

		for (const model of Object.values(models)) {
			gltfLoader.load(model.url, (gltf: GLTF) => {
				const c = new Character();
				c.meshComponent.addMesh(gltf.scene);
				this.actors.push(c);
				this.rootScene.add(c);
			});
		}
	}

	/**
	 * tests if a target canvas exists. if not, creates one with 'selector' id. returns selected canvas.
	 * @param  {string} selector CSS selector for queryselector
	 * @returns HTMLCanvasElement
	 */
	getCanvas(selector: string): HTMLCanvasElement {
		let canvas: HTMLCanvasElement;
		const t = <HTMLCanvasElement>document.querySelector(selector);

		if (t && t.tagName == 'CANVAS') {
			canvas = t;
		} else {
			canvas = document.createElement('canvas');
			canvas.id = 'app';
			document.appendChild(canvas);
		}

		return canvas;
	}

	init(): void {
		this.sceneSetup();

		requestAnimationFrame(this.tick.bind(this));
	}

	addLights(): void {
		{
			const light = new DirectionalLight(0xffffff, 1);
			light.position.set(0, 20, 0);
			this.rootScene.add(light);
			light.castShadow = true;
			light.shadow.mapSize.width = 2048;
			light.shadow.mapSize.height = 2048;

			const d = 50;
			light.shadow.camera.left = -d;
			light.shadow.camera.right = d;
			light.shadow.camera.top = d;
			light.shadow.camera.bottom - d;
			light.shadow.camera.near = 1;
			light.shadow.camera.far = 50;
			light.shadow.bias = 0.001;
		}

		{
			const light = new DirectionalLight(0xffffff, 1);
			light.position.set(1, 2, 4);
			this.rootScene.add(light);
		}
	}

	sceneSetup(): void {
		const groundGeometry = new PlaneBufferGeometry(50, 50);
		const groundMaterial = new MeshStandardMaterial({
			color: 0x3c3c3c,
			metalness: 0,
			roughness: 1
		});
		const groundMesh = new Mesh(groundGeometry, groundMaterial);
		groundMesh.rotation.x = Math.PI * -0.5;
		groundMesh.receiveShadow = true;
		groundMesh.name = 'test';
		this.rootScene.add(groundMesh);
	}

	tick(deltaTime: number): void {
		uniforms.iResolution.value.set(
			this.canvas.width,
			this.canvas.height,
			1
		);
		uniforms.iTime.value = deltaTime;

		globals.deltaTime = deltaTime;

		this.actors = this.actors.map((a) => a.tick(deltaTime));

		this.renderer.render(this.rootScene, globals.camera);
		requestAnimationFrame(this.tick.bind(this));
	}
}

new Engine('#app');
