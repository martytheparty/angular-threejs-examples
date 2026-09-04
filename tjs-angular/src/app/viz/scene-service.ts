import * as THREE from 'three';
import {
    Service,
    inject,
    effect
} from '@angular/core';
import { MeshClass } from './mesh/mesh';
import { VizAnimation } from './viz.animation.class';
import { ControlsService } from './controls-service';
import { GroupData, ThreeGroup } from './interfaces';
import { ClockService } from './clock-service';

@Service()
export class SceneService {
    animationCount = 0;
    selectedGroup: undefined | ThreeGroup;
    currentMesh: string = "";
    allGroups: ThreeGroup[] = [];
    controlsService: ControlsService = inject(ControlsService);
    clockService: ClockService = inject(ClockService);

    width = window.innerWidth;
    height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene: THREE.Scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 20);

    meshClass: MeshClass = new MeshClass();
    meshes: THREE.Mesh[] = [];

    constructor() {
        this.camera.position.z = 5;
        this.renderer.setClearColor(0xaaaaaa); // white
        this.renderer.setSize(this.width, this.height);

        this.initializeAnimation();

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        this.scene.add(ambientLight);

        effect(
            () => {
                this.controlsService.selectedMeshSignal();

                this.controlsService.x();
                this.controlsService.y();                
                this.controlsService.z();
                this.controlsService.xPosition();
                this.controlsService.yPosition();
                this.controlsService.zPosition();
                this.updateSelectedMesh();
                this.updateSelectedGroup();
            }
        );
    }

    updateSelectedMesh(): void {
        console.log("Update the current mesh ", this.currentMesh);
        if (this.currentMesh !== this.controlsService.selectedMeshSignal()) {
            this.currentMesh = this.controlsService.selectedMeshSignal();
            const group = this.selectedGroup?.group;

            if (group) {
                const meshFunction = this.meshClass.getMeshFunction(this.currentMesh);
                const mesh = meshFunction();
                group.remove(group.children[0]);
                group.add(mesh);
            }
        }

    }

    updateSelectedGroup(): void {
        if(this.selectedGroup && this.selectedGroup.group) {
            let name = this.selectedGroup.group.userData['name'] ;
            console.log("Updating data for ", name);
            const currentData: GroupData = {
                name,
                rotationX: this.controlsService.x(),
                rotationY: this.controlsService.y(),
                rotationZ: this.controlsService.z(),
                positionX: this.controlsService.xPosition(),
                positionY: this.controlsService.yPosition(),
                positionZ: this.controlsService.zPosition(),
                isAnimated: this.selectedGroup.group.userData['isAnimated'],
                color: `#${this.toHex(this.controlsService.rColor())}${this.toHex(this.controlsService.gColor())}${this.toHex(this.controlsService.bColor())}`
            } 
            this.selectedGroup.group.userData = currentData;
        }
    }

    toHex(value: number): string {
        return value.toString(16).padStart(2, '0');
    }

    setSelectedGroup(threeGroup: ThreeGroup): void {
        this.selectedGroup = threeGroup;
        const group = threeGroup.group;
        if (group) {
            const data: GroupData = group.userData as GroupData;
            console.log("RESET", data);
            //this.reset = true;
            this.controlsService.reset(data);
        }

    }

    addGroup(group: ThreeGroup): void {
        this.allGroups.push(group);
    }

    deleteGroup(group: ThreeGroup): void {
        this.allGroups = this.allGroups.filter( 
            (threeGroup: ThreeGroup) => {
                return threeGroup !== group
            } 
        );
        if (group.group) {
            this.scene.remove(group.group);
        }

        if (this.selectedGroup === group){
            this.selectedGroup = undefined;
        }
    }

    addDefaultGroup(name: string = ""): THREE.Group {
        const group = new THREE.Group();
        const star = this.meshClass.getStarMesh();
        const groupData: GroupData = {
            name,
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            isAnimated: false,
        };

        group.userData = groupData;
        group.add(star);
        this.scene.add(group);
        this.meshes.push(star);

        return group;
    }

    addImportedGroup(group: THREE.Group): THREE.Group {
        this.scene.add(group);

        group.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                this.meshes.push(object);
            }
        });

        return group;
    }

    initializeAnimation(): void {
            this.renderer.setAnimationLoop((time: number) => {
            this.allGroups.forEach(
                (listGroupItem: ThreeGroup) => {
                    const currentGroup: THREE.Group | undefined = listGroupItem.group;
                        if (currentGroup) {
                            currentGroup.userData['isAnimated'] = true;
                            this.animationCount++;
                            const animation = new VizAnimation(currentGroup, this.controlsService, this.clockService);
                            animation.setRotationXSpeed(currentGroup.userData['rotationX']);
                            animation.setRotationYSpeed(currentGroup.userData['rotationY']);
                            animation.setRotationZSpeed(currentGroup.userData['rotationZ']);

                            animation.setXPosition(currentGroup.userData['positionX']);
                            animation.setYPosition(currentGroup.userData['positionY']);
                            animation.setZPosition(currentGroup.userData['positionZ']);

                            const mesh = currentGroup.children[0] as THREE.Mesh;
                            const material: THREE.Material | THREE.Material[] = mesh.material;

                            if (Array.isArray(material)) {
                                material.forEach(m => { 
                                    const materialItem = m as THREE.MeshBasicMaterial;
                                    if (currentGroup.userData['color']) {
                                        materialItem.color.set(currentGroup.userData['color']);
                                    }
                                });
                            } else {
                                const materialItem = material as THREE.MeshBasicMaterial;
                                if (currentGroup.userData['color']) {
                                    materialItem.color.set(currentGroup.userData['color']);
                                }
                            }


                            animation.animate(time);
                        } 
                }
            );

      this.renderer.render(this.scene, this.camera);
    });

    }
}
