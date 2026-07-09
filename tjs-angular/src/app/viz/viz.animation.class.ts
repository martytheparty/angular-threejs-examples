import * as THREE from 'three';

export class VizAnimation {

    private rotationXSpeed = 0.01;
    private rotationYSpeed = 0.01;
    private rotationZSpeed = 0.01;
    createDateTime = Date.now();
    lastTime = 0;
    lastGroup = 0;

    constructor(
        private readonly group: THREE.Object3D,
        private readonly meshes: THREE.Object3D[]
    ) {}

    animate() {
        const secondsElapsed = Math.floor((Date.now() - this.createDateTime) / 1000);

        if (secondsElapsed !== this.lastTime) {
            this.lastTime = secondsElapsed;

            if (secondsElapsed%2 === 0) { // even number get the 0th object
                // first remove the 1st object from the scene
                this.group.remove(this.meshes[1]);
                this.group.add(this.meshes[0]);
            } else { // odd number get the first object
                this.group.remove(this.meshes[0]);
                this.group.add(this.meshes[1]);
            }

        } 

        this.group.rotation.x += this.rotationXSpeed;
        this.group.rotation.y += this.rotationYSpeed;
        this.group.rotation.z += this.rotationZSpeed;
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