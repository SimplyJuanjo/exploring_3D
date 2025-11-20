import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import DebugClient from './debug-client.js';
import { DEBUG_SERVER_URL } from './config.js';

// Inicializar Debug Client
const debug = new DebugClient(DEBUG_SERVER_URL);

console.log('Iniciando Juego 3D WebVR...');

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x505050);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Botón VR
document.body.appendChild(VRButton.createButton(renderer));

// Luz
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Suelo (Grid)
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Objetos Interactuables
const interactables = [];

// Cubo de prueba
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1.6, -2);
scene.add(cube);
interactables.push(cube);

// Variables globales
window.scene = scene;
window.cube = cube;

// --- VR CONTROLLERS & TELEKINESIS ---

const controller1 = renderer.xr.getController(0);
controller1.addEventListener('selectstart', onSelectStart);
controller1.addEventListener('selectend', onSelectEnd);
scene.add(controller1);

const controller2 = renderer.xr.getController(1);
controller2.addEventListener('selectstart', onSelectStart);
controller2.addEventListener('selectend', onSelectEnd);
scene.add(controller2);

const controllerModelFactory = new XRControllerModelFactory();

const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);

const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
scene.add(controllerGrip2);

// Rayo visual (Línea)
const geometryLine = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
const line = new THREE.Line(geometryLine);
line.name = 'line';
line.scale.z = 5;

controller1.add(line.clone());
controller2.add(line.clone());

const raycaster = new THREE.Raycaster();
const tempMatrix = new THREE.Matrix4();

function onSelectStart(event) {
  const controller = event.target;

  // Configurar raycaster desde la posición del mando
  tempMatrix.identity().extractRotation(controller.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  const intersections = raycaster.intersectObjects(interactables);

  if (intersections.length > 0) {
    const intersection = intersections[0];
    const object = intersection.object;

    // Feedback visual
    object.material.emissive.b = 1;

    // Attach: El objeto se vuelve hijo del mando
    controller.attach(object);
    controller.userData.selected = object;

    debug.log('info', `Objeto agarrado con ${event.data.handedness}`);
  }
}

function onSelectEnd(event) {
  const controller = event.target;

  if (controller.userData.selected !== undefined) {
    const object = controller.userData.selected;

    // Feedback visual off
    object.material.emissive.b = 0;

    // Detach: El objeto vuelve a la escena
    scene.attach(object);

    controller.userData.selected = undefined;

    debug.log('info', `Objeto soltado con ${event.data.handedness}`);
  }
}

// Loop de animación
renderer.setAnimationLoop(() => {
  // Rotación ociosa si no está agarrado
  if (!cube.parent || cube.parent.type === 'Scene') {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
});

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
