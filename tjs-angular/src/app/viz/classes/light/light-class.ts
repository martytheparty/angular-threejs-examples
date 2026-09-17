import * as THREE from 'three';

export class LightClass {
    getAmbientLight(color: string, intensity: number): THREE.AmbientLight {
        return new THREE.AmbientLight(color, intensity);
    }
}
