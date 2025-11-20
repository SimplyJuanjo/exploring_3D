import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
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
camera.position.set(0, 1.6, 3); // Altura promedio de ojos ~1.6m

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // IMPORTANTE: Habilitar WebXR
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

// Cubo de prueba (Interactuable visualmente)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1.6, -2); // Frente al usuario
scene.add(cube);

// Variables globales para acceso desde debug console
window.scene = scene;
window.cube = cube;

// Loop de animación
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
});

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
