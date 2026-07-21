import * as THREE from 'three';

export class VizAnimation {

    private g = 1;

    private startTime = 0;
    private previousTime = 0;
    private currentTime = 0;
    private elapsedSeconds = 0;
    private previousSeconds = 0;

    private rotationXSpeed = 0;
    private rotationYSpeed = 0;
    private rotationZSpeed = 0;

    constructor(
        private readonly group: THREE.Object3D,
        private readonly meshFunction: Function,
        private readonly camera: THREE.PerspectiveCamera
    ) {}

    animate(time: number) {
        if (this.startTime === 0) {
            this.startTime = Math.floor(time / 1000);
        }

        this.currentTime = Math.floor(time / 1000);

        this.elapsedSeconds = this.currentTime - this.startTime;

        if (this.elapsedSeconds > (this.previousSeconds + 15) ) {
            this.previousSeconds = this.elapsedSeconds;
            console.log("remove current elements and add new element", time);
            this.group.remove(this.group.children[0]);
            this.g = this.g + 1;
            const mesh = this.meshFunction(this.g);
            this.group.add(mesh);
            this.camera.position.z = 16;
            this.camera.lookAt(0,0,0);
        } else if (this.elapsedSeconds !== this.previousSeconds) {
            this.camera.position.z = this.camera.position.z - .06;
            this.camera.lookAt(0,0,0);
        } 

        // first frame
        if (this.previousTime === 0) {
            this.previousTime = time;
        }

                // milliseconds -> seconds
        const deltaSeconds = (time - this.previousTime) / 1000;

        this.previousTime = time;


        this.group.rotation.x += this.rotationXSpeed * Math.PI * 2 * deltaSeconds*.1;
        this.group.rotation.y += this.rotationYSpeed * Math.PI * 2 * deltaSeconds*.1;
        this.group.rotation.z += this.rotationZSpeed * Math.PI * 2 * deltaSeconds*.1;
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