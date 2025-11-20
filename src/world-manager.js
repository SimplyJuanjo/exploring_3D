import * as THREE from 'three';

export class WorldManager {
    constructor(scene, texturePath) {
        this.scene = scene;
        this.chunks = new Map(); // Key: "x,z", Value: Mesh
        this.chunkSize = 20; // Metros
        this.renderDistance = 2; // Radio de chunks (2 = 5x5 grid)

        // Cargar textura una sola vez
        const textureLoader = new THREE.TextureLoader();
        this.grassTexture = textureLoader.load(texturePath);
        this.grassTexture.wrapS = THREE.RepeatWrapping;
        this.grassTexture.wrapT = THREE.RepeatWrapping;
        this.grassTexture.repeat.set(10, 10);
        this.grassTexture.magFilter = THREE.NearestFilter;

        // Geometría y Material compartidos para optimización
        this.chunkGeometry = new THREE.PlaneGeometry(this.chunkSize, this.chunkSize);
        this.chunkMaterial = new THREE.MeshStandardMaterial({
            map: this.grassTexture,
            roughness: 0.8
        });

        // Rotar geometría para que esté plana en el suelo (XZ)
        this.chunkGeometry.rotateX(-Math.PI / 2);
    }

    update(playerPosition) {
        // Calcular coordenada de chunk del jugador
        const playerChunkX = Math.floor(playerPosition.x / this.chunkSize);
        const playerChunkZ = Math.floor(playerPosition.z / this.chunkSize);

        // Identificar chunks que deberían existir
        const activeKeys = new Set();

        for (let x = -this.renderDistance; x <= this.renderDistance; x++) {
            for (let z = -this.renderDistance; z <= this.renderDistance; z++) {
                const chunkX = playerChunkX + x;
                const chunkZ = playerChunkZ + z;
                const key = `${chunkX},${chunkZ}`;

                activeKeys.add(key);

                if (!this.chunks.has(key)) {
                    this.createChunk(chunkX, chunkZ, key);
                }
            }
        }

        // Eliminar chunks viejos
        for (const [key, mesh] of this.chunks) {
            if (!activeKeys.has(key)) {
                this.scene.remove(mesh);
                this.chunks.delete(key);
                // No hacemos dispose de geometría/material porque son compartidos
            }
        }
    }

    createChunk(x, z, key) {
        const chunk = new THREE.Mesh(this.chunkGeometry, this.chunkMaterial);
        chunk.position.set(
            x * this.chunkSize + this.chunkSize / 2,
            0,
            z * this.chunkSize + this.chunkSize / 2
        );
        chunk.receiveShadow = true;
        chunk.name = `chunk_${key}`;

        this.scene.add(chunk);
        this.chunks.set(key, chunk);
    }
}
