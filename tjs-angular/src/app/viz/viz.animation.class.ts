import * as THREE from 'three';

export class VizAnimation {

    private previousTime = 0;

    private rotationXSpeed = 0;
    private rotationYSpeed = 0;
    private rotationZSpeed = 0;

    constructor(
        private readonly element: THREE.Object3D
    ) {}

    animate(time: number) {

        // first frame
        if (this.previousTime === 0) {
            this.previousTime = time;
        }

                // milliseconds -> seconds
        const deltaSeconds = (time - this.previousTime) / 1000;

        this.previousTime = time;


        this.element.rotation.x += this.rotationXSpeed * Math.PI * 2 * deltaSeconds;
        this.element.rotation.y += this.rotationYSpeed * Math.PI * 2 * deltaSeconds;
        this.element.rotation.z += this.rotationZSpeed * Math.PI * 2 * deltaSeconds;
    }

    setRotationXSpeed(rotationXSpeed: number): void {
        this.rotationXSpeed = rotationXSpeed;
    }

    setRotationYSpeed(rotationYSpeed: number): void {
        this.rotationYSpeed = rotationYSpeed;
    }

    setRotationZSpeed(rotationZSpeed: number): void {
        this.rotationZSpeed = rotationZSpeed;
    }

}