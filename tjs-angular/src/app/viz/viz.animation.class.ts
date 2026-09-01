import * as THREE from 'three';
import { ControlsService } from './controls-service';
import { MeshClass } from './mesh/mesh';
import { ClockService } from './clock-service';

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
        private readonly controlsService: ControlsService,
        private readonly clockService: ClockService
    ) {}

    animate(time: number) {
       // console.log("animate function", this.animationCount);
        let updateMesh = false;
        let meshFunction;
        if (this.controlsService.selectedMesh != this.previousMesh) {
            // updateMesh = true;
            // this.previousMesh = this.controlsService.selectedMesh;
            // meshFunction = this.meshClass.getMeshFunction(this.previousMesh);
            // const mesh = meshFunction();
            // this.group.remove(this.group.children[0]);
            // this.group.add(mesh);
        }

        if (this.startTime === 0) {
            this.startTime = Math.floor(time / 1000);
        }

        this.currentTime = Math.floor(time / 1000);
        this.elapsedSeconds = this.currentTime - this.startTime;


        // milliseconds -> seconds
        const deltaSeconds = (time - this.previousTime) / 1000;

        this.previousTime = time;

        const currentTime = this.clockService.getElapsedMilliseconds()/1000;
        const currentPeriod = this.clockService.getPeriod();

        this.group.rotation.x = this.getRotationRadians(currentTime, currentPeriod, this.rotationXSpeed);
        this.group.rotation.y = this.getRotationRadians(currentTime, currentPeriod, this.rotationYSpeed);
        this.group.rotation.z = this.getRotationRadians(currentTime, currentPeriod, this.rotationZSpeed);

        this.group.position.x = this.group.userData['positionX'];
        this.group.position.y = this.group.userData['positionY'];
        this.group.position.z = this.group.userData['positionZ'];
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

    getRotationRadians(
        time: number,
        period: number,
        rotationCount: number
    ): number {
        let radians = 0
        if (time > 0 && period > 0) {
           radians =  (time / period) * rotationCount * Math.PI * 2;
        }
        return radians;
    }



}