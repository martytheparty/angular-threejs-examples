import * as THREE from 'three';
import { ControlsService } from '../services/controls-service';
import { ClockService } from '../services/clock-service';

export class VizAnimation {

    private rotationXSpeed = 0;
    private rotationYSpeed = 0;
    private rotationZSpeed = 0;

    private positionX = 0;
    private positionY = 0;
    private positionZ = 0;


    constructor(
        private readonly group: THREE.Object3D,
        private readonly clockService: ClockService
    ) {}

    animate(time: number) {
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