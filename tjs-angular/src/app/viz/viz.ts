import { 
  AfterViewInit,
  Component,
  ElementRef,
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

  scene = new THREE.Scene();
  group: THREE.Object3D = new THREE.Group();
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true } );
  camera: THREE.PerspectiveCamera | undefined ;

  ngAfterViewInit(): void {
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
    const frontTexture = loader.load('/patriotic.jpg');
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    const backTexture = loader.load('/patriotic.jpg');
    backTexture.colorSpace = THREE.SRGBColorSpace;
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

    this.group = new THREE.Group();
    this.group.add(tetrahedron);

    return this.group;
  }

  addGroupToScene( group: THREE.Object3D, scene: THREE.Scene): void {
    scene.add(group);
  }
}
