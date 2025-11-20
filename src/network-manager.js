import * as THREE from 'three';
import { io } from 'socket.io-client';

export class NetworkManager {
    constructor(scene, serverUrl, dolly, camera) {
        this.scene = scene;
        this.dolly = dolly;
        this.camera = camera;
        this.socket = io(serverUrl);
        this.otherPlayers = {}; // Map socket.id -> Mesh

        // Geometría compartida para avatares (Fantasmas)
        this.avatarGeometry = new THREE.CapsuleGeometry(0.3, 1, 4, 8);
        this.headGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.15); // Visor VR

        this.setupSocketEvents();

        // Throttling de envío
        this.lastSendTime = 0;
        this.sendInterval = 50; // ms (20 updates/sec)
    }

    setupSocketEvents() {
        this.socket.on('connect', () => {
            console.log('Connected to multiplayer server:', this.socket.id);
        });

        // --- PLAYERS ---
        this.socket.on('current-players', (players) => {
            Object.keys(players).forEach((id) => {
                if (id !== this.socket.id) {
                    this.addOtherPlayer(players[id]);
                }
            });
        });

        this.socket.on('player-joined', (player) => {
            this.addOtherPlayer(player);
        });

        this.socket.on('player-moved', (player) => {
            if (this.otherPlayers[player.id]) {
                const avatar = this.otherPlayers[player.id];
                avatar.position.set(player.x, player.y + 0.8, player.z);
                avatar.rotation.set(0, player.ry, 0);
                if (avatar.children.length > 0) {
                    avatar.children[0].rotation.x = player.rx;
                }
            }
        });

        this.socket.on('player-disconnected', (id) => {
            this.removeOtherPlayer(id);
        });

        // --- OBJECTS ---
        this.socket.on('object-grabbed', (data) => {
            const obj = this.scene.getObjectByName(data.id);
            if (obj) {
                obj.userData.owner = data.owner;
            }
        });

        this.socket.on('object-released', (data) => {
            const obj = this.scene.getObjectByName(data.id);
            if (obj) {
                obj.userData.owner = null;
                obj.position.set(data.x, data.y, data.z);
                obj.rotation.set(data.rx, data.ry, data.rz);
            }
        });

        this.socket.on('object-moved', (data) => {
            const obj = this.scene.getObjectByName(data.id);
            if (obj) {
                if (obj.userData.owner !== this.socket.id) {
                    obj.position.set(data.x, data.y, data.z);
                    obj.rotation.set(data.rx, data.ry, data.rz);
                }
            }
        });
    }

    addOtherPlayer(player) {
        if (this.otherPlayers[player.id]) return;

        const material = new THREE.MeshStandardMaterial({ color: player.color, transparent: true, opacity: 0.7 });
        const avatar = new THREE.Mesh(this.avatarGeometry, material);

        // Cabeza/Visor
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const head = new THREE.Mesh(this.headGeometry, headMaterial);
        head.position.set(0, 0.4, -0.2); // Un poco adelante y arriba
        avatar.add(head);

        avatar.position.set(player.x, player.y + 0.8, player.z);

        this.scene.add(avatar);
        this.otherPlayers[player.id] = avatar;
        console.log('Player joined:', player.id);
    }

    removeOtherPlayer(id) {
        if (this.otherPlayers[id]) {
            this.scene.remove(this.otherPlayers[id]);
            delete this.otherPlayers[id];
            console.log('Player left:', id);
        }
    }

    sendObjectGrab(id) {
        this.socket.emit('object-grab', { id });
    }

    sendObjectRelease(id, position, rotation) {
        this.socket.emit('object-release', {
            id,
            x: position.x, y: position.y, z: position.z,
            rx: rotation.x, ry: rotation.y, rz: rotation.z
        });
    }

    sendObjectMove(id, position, rotation) {
        this.socket.emit('object-move', {
            id,
            x: position.x, y: position.y, z: position.z,
            rx: rotation.x, ry: rotation.y, rz: rotation.z
        });
    }

    update(time) {
        if (time - this.lastSendTime > this.sendInterval) {
            this.socket.emit('player-move', {
                x: this.dolly.position.x,
                y: this.dolly.position.y,
                z: this.dolly.position.z,
                rx: this.camera.rotation.x,
                ry: this.camera.rotation.y,
                rz: this.camera.rotation.z
            });
            this.lastSendTime = time;
        }
    }
}
