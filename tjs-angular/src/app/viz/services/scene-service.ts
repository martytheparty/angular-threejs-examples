import * as THREE from 'three';
import {
    Service,
    inject,
    effect
} from '@angular/core';
import { MeshClass } from '../classes/mesh/mesh';
import { LightClass } from '../classes/light/light-class';
import { VizAnimation } from '../classes/viz.animation.class';
import { ControlsService } from './controls-service';
import { GroupData, SceneData, ThreeGroup } from '../interfaces';
import { ClockService } from './clock-service';
import { MaterialClass } from '../classes/material/material-class';
import { ImportService } from './import-service';
import { GeometryClass } from '../classes/geometry/geometry-class';

@Service()
export class SceneService {
    animationCount = 0;
    selectedGroup: undefined | ThreeGroup;
    currentMesh: string = "";
    currentMaterial: string = "";
    allGroups: ThreeGroup[] = [];
    controlsService: ControlsService = inject(ControlsService);
    clockService: ClockService = inject(ClockService);
    importService: ImportService = inject(ImportService);

    width = window.innerWidth;
    height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene: THREE.Scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 20);

    lightClass: LightClass = new LightClass();
    meshClass: MeshClass = new MeshClass();
    materialClass: MaterialClass = new MaterialClass();
    meshes: THREE.Mesh[] = [];
    materials: THREE.Material[] = [];
    ambientLight: THREE.AmbientLight = this.lightClass.getAmbientLight("#FFFFFF", 1);


    constructor() {
        this.camera.position.z = 5;
        this.renderer.setSize(this.width, this.height);

        this.initializeAnimation();


        this.scene.add(this.ambientLight);

        effect(
            () => {
                this.signalHandler();
            }
        );
    }

    signalHandler() {
                this.controlsService.selectedMeshSignal();

                this.controlsService.selectWireframe();
                this.controlsService.x();
                this.controlsService.y();                
                this.controlsService.z();
                this.controlsService.animationRotationX();
                this.controlsService.animationRotationY();                
                this.controlsService.animationRotationZ();
                this.controlsService.xPosition();
                this.controlsService.yPosition();
                this.controlsService.zPosition();
                this.controlsService.rColor();
                this.controlsService.gColor();
                this.controlsService.bColor();
                this.controlsService.erColor();
                this.controlsService.egColor();
                this.controlsService.ebColor();
                this.controlsService.eIntensity();
                this.controlsService.selectedMaterialSignal();
                this.updateSelectedMesh();
                this.updateSelectedMaterial();
            
                this.updateSelectedGroup();

                this.ambientLight.intensity = this.controlsService.ambientLightIntensity();
                const color: THREE.Color =  new THREE.Color(this.controlsService.ambientLightColor());
                this.ambientLight.color = color;

                // this was changed from renderer to scene so the color would persist after scene exports
                //this.renderer.setClearColor(this.controlsService.sceneColor()); 
                this.scene.background = new THREE.Color(this.controlsService.sceneColor());
                this.setSceneData();
    }

    setSceneData(): void {
        const sceneData: SceneData = {
            name: "Simple ThreeJS Scene",
            backgroundColor: this.controlsService.sceneColor()
        }

        this.scene.userData = sceneData;
    }

    updateSelectedMaterial(): void {
        console.log("Update the current material", this.currentMaterial);
        if (this.currentMaterial != this.controlsService.selectedMaterialSignal()) {
            this.currentMaterial = this.controlsService.selectedMaterialSignal();
            const group = this.selectedGroup?.group;
            if (group) {
                const materialFunction = MaterialClass.getMaterialFunction(this.currentMaterial);
                const material = materialFunction();
                const mesh: THREE.Mesh = group.children[0] as THREE.Mesh;
                mesh.material = material;
            }
        }
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
            const currentData: GroupData = {
                name,
                rotateX: this.controlsService.x(),
                rotateY: this.controlsService.y(),
                rotateZ: this.controlsService.z(),
                rotationX: this.controlsService.animationRotationX(),
                rotationY: this.controlsService.animationRotationY(),
                rotationZ: this.controlsService.animationRotationZ(),
                positionX: this.controlsService.xPosition(),
                positionY: this.controlsService.yPosition(),
                positionZ: this.controlsService.zPosition(),
                isAnimated: this.selectedGroup.group.userData['isAnimated'],
                color: `#${this.toHex(this.controlsService.rColor())}${this.toHex(this.controlsService.gColor())}${this.toHex(this.controlsService.bColor())}`,
                eColor: `#${this.toHex(this.controlsService.erColor())}${this.toHex(this.controlsService.egColor())}${this.toHex(this.controlsService.ebColor())}`,
                eIntensity: this.controlsService.eIntensity(),
                wireframe: this.controlsService.selectWireframe()
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
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            isAnimated: false,
            eIntensity: 1,
            color: "#FF0000",
            eColor: "#FF0000",
            wireframe: false
        };

        group.userData = groupData;
        group.add(star);
        this.scene.add(group);
        this.meshes.push(star);

        return group;
    }

    addGroupForMesh(name: string = "", mesh: THREE.Mesh): THREE.Group {

        // fits the mesh into a 3x3 box
        GeometryClass.scaleToFit(mesh,3);


        const group = new THREE.Group();
        const groupData: GroupData = {
            name,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            isAnimated: false,
            eIntensity: 1,
            color: "#FF0000",
            eColor: "#FF0000",
            wireframe: false
        };

        group.userData = groupData;
        group.add(mesh);
        this.scene.add(group);

        this.meshes.push(mesh);

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
                            const animation = new VizAnimation(
                                currentGroup,
                                this.clockService
                            );
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
                                    const materialItem = m as any;
                                    if (currentGroup.userData['color']) {
                                        materialItem.color.set(currentGroup.userData['color']);
                                    }
                                    if (currentGroup.userData['eColor']) {
                                        materialItem.emissive.set(currentGroup.userData['eColor']);
                                    }
                                });
                            } else {
                                const materialItem = material as any;
                                if (
                                    materialItem.color // throws an error for normal because it does not have a color 
                                    && 
                                    currentGroup.userData['color']
                                ) {
                                    materialItem.color.set(currentGroup.userData['color']);
                                }

                                if (currentGroup.userData['eColor'] && materialItem.emissive !== undefined) {
                                    materialItem.emissive.set(currentGroup.userData['eColor']);
                                }

                                if (currentGroup.userData['eIntensity'] && materialItem.emissiveIntensity !== undefined) {
                                    materialItem.emissiveIntensity = currentGroup.userData['eIntensity'];
                                }
                            }


                            animation.animate(time);
                        } 
                }
            );

      this.renderer.render(this.scene, this.camera);
    });

    }

    importScene(scene: THREE.Scene): void {
        this.scene = scene;
        this.controlsService.setSceneColor(scene.userData['backgroundColor']);
        // The form needs to be set to the correct background color.
        const groups: THREE.Group[] 
        = this.scene.children.filter( (child: THREE.Object3D) => child.type === 'Group' ) as THREE.Group[];
        this.importService.setGroupImport(groups);

        const threeGroups: ThreeGroup[] = groups.map( (group: THREE.Group) => {return {name: group.userData['name'], group}; })

        this.allGroups = threeGroups;
    }

}
