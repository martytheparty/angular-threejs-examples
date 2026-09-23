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

        // I rotate the mesh based the rotate value



        if (this.group.children[0]){
            const mesh: THREE.Object3D = this.group.children[0];

            if (mesh.type === "Mesh") {
                // if (
                //     this.group.userData['rotateX'] > 0 ||
                //     this.group.userData['rotateY'] > 0 || 
                //     this.group.userData['rotateZ'] > 0 
                // ) {
                    mesh.rotation.x = this.degreesToRadians(this.group.userData['rotateX']);
                    mesh.rotation.y = this.degreesToRadians(this.group.userData['rotateY']);
                    mesh.rotation.z = this.degreesToRadians(this.group.userData['rotateZ']);
                //}
                const meshItem = mesh as THREE.Mesh;
                const material = meshItem.material as THREE.Material;

                if ('wireframe' in material) {
                    material.wireframe = this.group.userData['wireframe'];
                }

            }


        }

        // I animate the group rotation
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

    degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }



}