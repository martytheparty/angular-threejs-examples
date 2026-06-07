import * as THREE from 'three';

export class VizAnimation {

    private rotationXSpeed = 0.01;
    private rotationYSpeed = 0.01;
    private rotationZSpeed = 0.01;

    constructor(
        private readonly element: THREE.Object3D
    ) {}

    animate() {
        this.element.rotation.x += this.rotationXSpeed;
        this.element.rotation.y += this.rotationYSpeed;
        this.element.rotation.z += this.rotationZSpeed;
    }

    setRotationXSpeed(rotationXSpeed: number): void {
        this.rotationXSpeed = rotationXSpeed/100;
    }

    setRotationYSpeed(rotationYSpeed: number): void {
        this.rotationYSpeed = rotationYSpeed/100;
    }

    setRotationZSpeed(rotationZSpeed: number): void {
        this.rotationZSpeed = rotationZSpeed/100;
    }

}