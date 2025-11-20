import * as THREE from 'three';

/**
 * AllomanticLines - Gestiona las líneas azules que apuntan a metales
 * Sistema de "visión alomántica" inspirado en Mistborn
 */
export class AllomanticLines {
    constructor(scene) {
        this.scene = scene;
        this.lines = [];
        this.lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4488ff, // Azul alomántico
            opacity: 0.5,
            transparent: true,
            linewidth: 2
        });
    }

    /**
     * Actualiza las líneas apuntando a objetos metálicos
     * Solo muestra en centro del campo de visión con gradiente
     * @param {THREE.Camera} camera - Cámara del jugador
     * @param {Array} metalObjects - Array de objetos metálicos (monedas)
     */
    update(camera, metalObjects) {
        // Limpiar líneas anteriores
        this.clearLines();

        // Vector forward de la cámara (dirección donde miras)
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        // Posición de la cámara en coordenadas del mundo
        const cameraPosition = new THREE.Vector3();
        camera.getWorldPosition(cameraPosition);

        metalObjects.forEach(metal => {
            // Vector desde cámara hacia el metal
            const toMetal = new THREE.Vector3().subVectors(metal.position, cameraPosition);
            const distance = toMetal.length();

            // Normalizar para calcular ángulo
            toMetal.normalize();

            // Calcular ángulo entre donde miras y donde está el metal (en radianes)
            const angle = cameraDirection.angleTo(toMetal);

            // Campo de visión muy estrecho (10 grados = ~0.174 radianes)
            const maxAngle = 0.174; // 10 grados
            const fadeStartAngle = 0.087; // 5 grados - empieza a difuminarse

            // Solo mostrar si está en rango de distancia
            if (distance < 20) {
                // Calcular opacidad basada en cercanía al centro
                let centerOpacity = 1.0;

                if (angle > fadeStartAngle) {
                    // Gradiente de opacidad desde 5° a 10°
                    const fadeFactor = (maxAngle - angle) / (maxAngle - fadeStartAngle);
                    centerOpacity = Math.max(0, fadeFactor);
                }

                // Solo dibujar si hay opacidad visible
                if (angle < maxAngle && centerOpacity > 0.01) {
                    this.createLine(cameraPosition, metal.position, distance, centerOpacity);
                }
            }
        });
    }

    /**
     * Crea una línea desde el jugador hasta un metal
     * Offset hacia adelante para evitar que converjan en la nariz
     * @param {THREE.Vector3} from - Posición inicial (cámara)
     * @param {THREE.Vector3} to - Posición final (metal)
     * @param {number} distance - Distancia para calcular opacidad
     * @param {number} centerOpacity - Opacidad basada en cercanía al centro (0-1)
     */
    createLine(from, to, distance, centerOpacity) {
        // Calcular dirección desde cámara hacia metal
        const direction = new THREE.Vector3().subVectors(to, from).normalize();

        // Offset el punto de inicio 0.5m adelante de la cámara
        // Esto evita que las líneas converjan en la nariz
        const lineStart = from.clone().add(direction.multiplyScalar(0.5));

        const points = [lineStart, to.clone()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Opacidad basada en distancia (más cerca = más opaco)
        const distanceOpacity = Math.max(0.2, 1 - (distance / 20));

        // Combinar opacidades: distancia * cercanía al centro
        const finalOpacity = distanceOpacity * centerOpacity * 0.6; // 0.6 para hacerlas ligeras

        const material = this.lineMaterial.clone();
        material.opacity = finalOpacity;

        const line = new THREE.Line(geometry, material);

        // NOTA: En VR estereoscópico, las líneas se ven duplicadas (una por ojo)
        // No hay forma perfecta de evitarlo en WebXR sin acceso a XR layers
        // Solución parcial: opacidad baja (0.6) minimiza el efecto

        this.scene.add(line);
        this.lines.push(line);
    }

    /**
     * Limpia todas las líneas de la escena
     */
    clearLines() {
        this.lines.forEach(line => {
            this.scene.remove(line);
            line.geometry.dispose();
            line.material.dispose();
        });
        this.lines = [];
    }
}
