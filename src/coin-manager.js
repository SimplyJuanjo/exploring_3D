import * as THREE from 'three';

/**
 * CoinManager - Gestiona monedas metálicas en el mundo
 * Inspirado en las monedas de Mistborn (boxing coins)
 */
export class CoinManager {
    constructor(scene) {
        this.scene = scene;
        this.coins = [];
        this.coinGeometry = null;
        this.coinMaterial = null;
        this.coinMaterialSide = null;

        // Física
        this.gravity = -9.8; // m/s²
        this.groundLevel = 0.05; // Altura del suelo (justo sobre el plano)

        this.loadTexture();
    }

    loadTexture() {
        const textureLoader = new THREE.TextureLoader();
        const coinTexture = textureLoader.load('/coin.png');

        // Configurar textura para pixel art
        coinTexture.magFilter = THREE.NearestFilter;
        coinTexture.minFilter = THREE.NearestFilter;

        // Geometría: cilindro 3D (moneda con grosor)
        this.coinGeometry = new THREE.CylinderGeometry(
            0.12, // radio superior
            0.12, // radio inferior
            0.03, // altura/grosor
            16    // segmentos radiales
        );

        // Material para las caras (con textura)
        this.coinMaterial = new THREE.MeshStandardMaterial({
            map: coinTexture,
            metalness: 0.8,
            roughness: 0.2
        });

        // Material para el borde (dorado)
        this.coinMaterialSide = new THREE.MeshStandardMaterial({
            color: 0xFFD700, // Oro
            metalness: 0.9,
            roughness: 0.1
        });
    }

    /**
     * Spawn monedas en posiciones aleatorias
     * @param {number} count - Número de monedas a crear
     */
    spawnCoins(count = 30) {
        for (let i = 0; i < count; i++) {
            // Crear coin con materiales múltiples
            const coin = new THREE.Mesh(this.coinGeometry, [
                this.coinMaterialSide, // Lado del cilindro
                this.coinMaterial,     // Tapa superior
                this.coinMaterial      // Tapa inferior
            ]);

            // Tamaño aleatorio (70% a 130% del tamaño base)
            const randomScale = 0.7 + Math.random() * 0.6;
            coin.scale.set(randomScale, randomScale, randomScale);

            // Posición aleatoria (spawn en el aire)
            coin.position.set(
                Math.random() * 40 - 20, // -20 a +20 en X
                Math.random() * 3 + 2,   // 2 a 5 en Y (altura inicial)
                Math.random() * 40 - 20  // -20 a +20 en Z
            );

            // Metadata para física
            coin.userData.type = 'metal';
            coin.userData.metal = 'steel';
            coin.userData.id = `coin_${i}`;
            coin.userData.velocity = new THREE.Vector3(0, 0, 0); // Velocidad inicial
            coin.userData.angularVelocity = new THREE.Vector3(
                Math.random() * 2 - 1, // Rotación aleatoria
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            );

            // Rotación inicial aleatoria
            coin.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            this.scene.add(coin);
            this.coins.push(coin);
        }

        console.log(`Spawned ${count} metal coins with physics and random sizes`);
    }

    /**
     * Update loop - física y gravedad
     * @param {number} delta - Delta time en segundos
     */
    update(delta) {
        this.coins.forEach(coin => {
            const velocity = coin.userData.velocity;
            const angularVel = coin.userData.angularVelocity;

            // Aplicar gravedad
            velocity.y += this.gravity * delta;

            // Actualizar posición
            coin.position.add(velocity.clone().multiplyScalar(delta));

            // Colisión con el suelo
            if (coin.position.y < this.groundLevel) {
                coin.position.y = this.groundLevel;

                // Rebote con pérdida de energía
                velocity.y = -velocity.y * 0.4; // Rebota al 40%
                velocity.x *= 0.8; // Fricción
                velocity.z *= 0.8;

                // Reducir rotación al tocar el suelo
                angularVel.multiplyScalar(0.9);

                // Si ya casi no se mueve, detener
                if (Math.abs(velocity.y) < 0.1) {
                    velocity.y = 0;
                    velocity.x *= 0.95;
                    velocity.z *= 0.95;
                }
            }

            // Aplicar rotación
            coin.rotation.x += angularVel.x * delta;
            coin.rotation.y += angularVel.y * delta;
            coin.rotation.z += angularVel.z * delta;
        });
    }

    /**
     * Obtener todas las monedas metálicas
     */
    getMetalObjects() {
        return this.coins;
    }

    /**
     * Remover una moneda (por ejemplo, al recogerla)
     * @param {THREE.Mesh} coin 
     */
    removeCoin(coin) {
        const index = this.coins.indexOf(coin);
        if (index > -1) {
            this.scene.remove(coin);
            this.coins.splice(index, 1);
        }
    }

    /**
     * Aplicar fuerza a una moneda (para Push/Pull alomántico)
     * @param {THREE.Mesh} coin 
     * @param {THREE.Vector3} force 
     */
    applyForce(coin, force) {
        if (coin.userData.velocity) {
            coin.userData.velocity.add(force);
        }
    }
}
