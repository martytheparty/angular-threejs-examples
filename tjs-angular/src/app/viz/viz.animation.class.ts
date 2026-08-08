import * as THREE from 'three';
import { ControlsService } from './controls-service';
import { MeshClass } from './mesh/mesh';

export class VizAnimation {
    private startTime = 0;
    private previousTime = 0;
    private currentTime = 0;
    private elapsedSeconds = 0;
    private previousSeconds = 0;

    private rotationXSpeed = 0;
    private rotationYSpeed = 0;
    private rotationZSpeed = 0;

    private positionX = 0;
    private positionY = 0;
    private positionZ = 0;

    private previousMesh = "";

    private meshClass: MeshClass = new MeshClass();

    constructor(
        private readonly group: THREE.Object3D,
        private readonly meshes: THREE.Mesh[],
        private readonly controlsService: ControlsService
    ) {}

    animate(time: number) {
        let updateMesh = false;
        let meshFunction;
        if (this.controlsService.selectedMesh != this.previousMesh) {
            updateMesh = true;
            this.previousMesh = this.controlsService.selectedMesh;
            meshFunction = this.meshClass.getMeshFunction(this.previousMesh);
            const mesh = meshFunction();
            this.group.remove(this.group.children[0]);
            this.group.add(mesh);
        }

        if (this.startTime === 0) {
            this.startTime = Math.floor(time / 1000);
        }

        this.currentTime = Math.floor(time / 1000);
        this.elapsedSeconds = this.currentTime - this.startTime;

        // if (this.elapsedSeconds !== this.previousSeconds ) { // toggle back and forth
        //     this.previousSeconds = this.elapsedSeconds;
        //     this.group.remove(this.group.children[0]);

        //     const remainder = this.elapsedSeconds%this.meshes.length; // results in 0 for even numbers and 1 for odd numbers
        //     this.group.add(this.meshes[remainder]);
        // }

        // milliseconds -> seconds
        const deltaSeconds = (time - this.previousTime) / 1000;

        this.previousTime = time;


        this.group.rotation.x += this.rotationXSpeed * Math.PI * 2 * deltaSeconds*.1;
        this.group.rotation.y += this.rotationYSpeed * Math.PI * 2 * deltaSeconds*.1;
        this.group.rotation.z += this.rotationZSpeed * Math.PI * 2 * deltaSeconds*.1;

        this.group.position.x = this.positionX;
        this.group.position.y = this.positionY;
        this.group.position.z = this.positionZ;
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

    setXPosition(positionX: number): void {
        this.positionX = positionX;
    }

    setYPosition(positionY: number): void {
        this.positionY = positionY;
    }

    setZPosition(positionZ: number): void {
        this.positionZ = positionZ;
    }



}