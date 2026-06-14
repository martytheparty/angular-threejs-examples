import { 
  AfterViewInit,
  Component,
  ElementRef,
  effect,
  inject,
  ViewChild
} from '@angular/core';

import * as THREE from 'three';
import {
  ControlsComponent
} from './controls/controls';
import { ControlsService } from './controls-service';
import { VizAnimation } from './viz.animation.class';

@Component({
  selector: 'app-viz',
  imports: [
    ControlsComponent
  ],
  templateUrl: './viz.html',
  styleUrl: './viz.scss',
})
export class VizComponent implements AfterViewInit {

  @ViewChild('visualization', { static: true })
  visualization!: ElementRef<HTMLDivElement>;
  controlsService: ControlsService = inject(ControlsService);

  segmentCount = 3; // triangle
  scene = new THREE.Scene();
  group: THREE.Object3D = new THREE.Group();
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true } );
  camera: THREE.PerspectiveCamera | undefined ;
  initialized = false;

  constructor() {
    effect( () => {
      this.segmentCount = this.controlsService.s();
      if (this.initialized) {
        this.removeGroupFromScene(this.group, this.scene);
        // get the new group
        this.group = this.createGroup();
        this.addGroupToScene(this.group, this.scene);
        if (this.camera) {
          this.setAnimation(this.renderer, this.camera )
        }

      }
    } );
  }

  ngAfterViewInit(): void {
    this.initialized = true;
    const width = window.innerWidth, height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    this.camera.position.z = 5;
    this.scene = new THREE.Scene();
    this.group = this.createGroup();
    this.addGroupToScene(this.group, this.scene);

    this.renderer.setClearColor(0xaaaaaa); // white
    this.renderer.setSize( width, height );

    this.setAnimation(this.renderer, this.camera);

    this.visualization.nativeElement.appendChild(
      this.renderer.domElement
    );
  }

  setAnimation(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera ): void {
    const animation = new VizAnimation(this.group);

    renderer.setAnimationLoop( 
      () => {
          animation.setRotationXSpeed(this.controlsService.x());
          animation.setRotationYSpeed(this.controlsService.y());
          animation.setRotationZSpeed(this.controlsService.z());
          animation.animate();
          renderer.render(this.scene, camera);
        }
     );

  }

  createGroup(): THREE.Object3D {

    const loader = new THREE.TextureLoader();
    const frontTexture = loader.load('/zoetrope.png');
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    const backTexture = loader.load('/zoetrope.png');
    backTexture.flipY = false;

    const geometry = new THREE.CircleGeometry( 3, this.segmentCount);
    const frontMaterial = new THREE.MeshBasicMaterial({
      map: frontTexture,
      side: THREE.FrontSide
    });

    const backMaterial = new THREE.MeshBasicMaterial({
       map: backTexture,
      side: THREE.BackSide
    });

    const frontMesh = new THREE.Mesh(geometry, frontMaterial);
    const backMesh = new THREE.Mesh(geometry, backMaterial);

    //scene.add(group);
    this.group = new THREE.Group();

    this.group.add(frontMesh);
    this.group.add(backMesh);

    return this.group;
  }

  addGroupToScene( group: THREE.Object3D, scene: THREE.Scene): void {
    scene.add(group);
  }

  removeGroupFromScene(group: THREE.Object3D, scene: THREE.Scene): void {

    scene.remove(group);

    group.traverse((child: any) => {

      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {

        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => m.dispose());
        } else {
          child.material.dispose();
        }

      }

    });

  }
}
