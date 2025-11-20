import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import DebugClient from './debug-client.js';
import { DEBUG_SERVER_URL } from './config.js';
import { WorldManager } from './world-manager.js';
import { NetworkManager } from './network-manager.js';
import { CoinManager } from './coin-manager.js';
import { AllomanticLines } from './allomantic-lines.js';

// Inicializar Debug Client
const debug = new DebugClient(DEBUG_SERVER_URL);

console.log('Iniciando Juego 3D WebVR...');

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue simple por ahora
scene.fog = new THREE.Fog(0x87CEEB, 10, 50); // Niebla para ocultar el borde del mundo

// --- DOLLY SYSTEM (Player Body) ---
const dolly = new THREE.Group();
dolly.position.set(0, 0, 0);
scene.add(dolly);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3); // Offset inicial para desktop
dolly.add(camera); // La cámara ahora es hija del Dolly

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

// Gestor de Mundo
const worldManager = new WorldManager(scene, '/grass.png');

// --- MULTIPLAYER ---
const networkManager = new NetworkManager(scene, DEBUG_SERVER_URL, dolly, camera);

// --- COIN MANAGER (Monedas Alománticas) ---
const coinManager = new CoinManager(scene);
coinManager.spawnCoins(30); // Spawn 30 monedas metálicas

// --- ALLOMANTIC LINES (Líneas azules a metales) ---
const allomanticLines = new AllomanticLines(scene);

// Objetos Interactuables
const interactables = [];

// Cubo de prueba
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1.6, -2);
cube.name = 'cube1'; // ID importante para red
scene.add(cube);
interactables.push(cube);

// Variables globales
window.scene = scene;
window.cube = cube;
window.dolly = dolly; // Para debug

// Throttling para object-move
let lastObjectSendTime = 0;
const objectSendInterval = 50; // ms

// --- VR CONTROLLERS & TELEKINESIS ---

const controller1 = renderer.xr.getController(0);
controller1.addEventListener('selectstart', onSelectStart);
controller1.addEventListener('selectend', onSelectEnd);
dolly.add(controller1); // Añadir al dolly

const controller2 = renderer.xr.getController(1);
controller2.addEventListener('selectstart', onSelectStart);
controller2.addEventListener('selectend', onSelectEnd);
dolly.add(controller2); // Añadir al dolly

const controllerModelFactory = new XRControllerModelFactory();

const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
dolly.add(controllerGrip1); // Añadir al dolly

const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
dolly.add(controllerGrip2); // Añadir al dolly

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

    // NETWORK: Avisar que lo he agarrado
    networkManager.sendObjectGrab(object.name);

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
    scene.attach(object); // Devolver a la escena (mundo)

    // NETWORK: Avisar que lo he soltado (con posición final)
    networkManager.sendObjectRelease(object.name, object.position, object.rotation);

    controller.userData.selected = undefined;

    debug.log('info', `Objeto soltado con ${event.data.handedness}`);
  }
}

// Loop de animación
const clock = new THREE.Clock();
const speed = 3; // Metros por segundo (VR suele ser más lento para evitar mareo)
const keys = {};

window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// Vector reutilizable para movimiento
const moveVector = new THREE.Vector3();

function handleVRMovement(delta) {
  const session = renderer.xr.getSession();
  if (!session) return;

  let inputSources = session.inputSources;

  // Debug log cada 60 frames para no saturar
  if (renderer.info.render.frame % 60 === 0) {
    // debug.log('info', `Input Sources: ${inputSources.length}`);
  }

  for (const source of inputSources) {
    // Solo permitir movimiento con el mando IZQUIERDO
    if (source.gamepad && source.handedness === 'left') {
      const gamepad = source.gamepad;

      const x = gamepad.axes[2] || 0;
      const y = gamepad.axes[3] || 0;

      if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
        // Debug log throttled (cada 60 frames)
        if (renderer.info.render.frame % 60 === 0) {
          debug.log('info', `Moving with LEFT stick: X:${x.toFixed(2)} Y:${y.toFixed(2)}`);
        }

        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        const sideDirection = new THREE.Vector3();
        sideDirection.crossVectors(camera.up, direction).normalize();

        moveVector.set(0, 0, 0);
        moveVector.addScaledVector(direction, -y * speed * delta);
        // Invertir X: antes era +x, ahora -x (o viceversa según lo que sintió el usuario)
        // El usuario dijo "izquierda y derecha estan invertidas".
        // Si antes x positivo iba a la derecha y el usuario sentía que iba al revés, 
        // entonces x positivo debería ir a la izquierda.
        moveVector.addScaledVector(sideDirection, -x * speed * delta);

        dolly.position.add(moveVector);
      }
    }
  }
}

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  const time = clock.getElapsedTime() * 1000; // ms

  // 1. Controles VR (Joystick)
  if (renderer.xr.isPresenting) {
    handleVRMovement(delta);
  }
  // 2. Controles Desktop (WASD)
  else {
    if (keys['KeyW']) dolly.translateZ(-speed * delta);
    if (keys['KeyS']) dolly.translateZ(speed * delta);
    if (keys['KeyA']) dolly.translateX(-speed * delta);
    if (keys['KeyD']) dolly.translateX(speed * delta);
  }

  // Actualizar mundo basado en posición del DOLLY (jugador)
  worldManager.update(dolly.position);

  // Actualizar monedas (física + gravedad)
  coinManager.update(delta);

  // Actualizar líneas alománticas (mostrar metales en campo de visión)
  allomanticLines.update(camera, coinManager.getMetalObjects());

  // Actualizar Red (Enviar posición)
  networkManager.update(time);

  // Actualizar Red (Objetos agarrados)
  // Si tengo un objeto agarrado, enviar su posición
  [controller1, controller2].forEach(controller => {
    if (controller.userData.selected) {
      const obj = controller.userData.selected;
      // Enviar posición global del objeto
      const worldPos = new THREE.Vector3();
      obj.getWorldPosition(worldPos);

      // Obtener rotación mundial como Euler
      const worldQuat = new THREE.Quaternion();
      obj.getWorldQuaternion(worldQuat);
      const worldRot = new THREE.Euler().setFromQuaternion(worldQuat);

      // Throttling: enviar cada ~50ms usando timestamps
      if (time - lastObjectSendTime > objectSendInterval) {
        networkManager.sendObjectMove(obj.name, worldPos, worldRot);
        lastObjectSendTime = time;
      }
    }
  });

  // Rotación ociosa (Solo si nadie lo tiene agarrado)
  // Comprobamos userData.owner en el objeto (que seteamos al recibir evento de red)
  // O si lo tengo yo (controller.userData.selected)
  const isGrabbedByMe = (controller1.userData.selected === cube || controller2.userData.selected === cube);
  const isGrabbedByOther = (cube.userData.owner && cube.userData.owner !== networkManager.socket.id);

  if (!isGrabbedByMe && !isGrabbedByOther) {
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
