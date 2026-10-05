import * as THREE from 'three';

export class LightClass {
    getAmbientLight(color: string, intensity: number): THREE.AmbientLight {
        return new THREE.AmbientLight(color, intensity);
    }

    static getPointLight(): THREE.PointLight {
        const light = new THREE.PointLight(0xffffff, 10, 10);
        return light;
    }
}
