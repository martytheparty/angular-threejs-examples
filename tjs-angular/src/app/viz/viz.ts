import { 
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewChild
} from '@angular/core';

import * as THREE from 'three';
import {
  ControlsComponent
} from './controls/controls';
import { ControlsService } from './controls-service';
import { VizAnimation } from './viz.animation.class';
import { VizInterface } from './viz-interface';
import { VizService } from './viz-service';

@Component({
  selector: 'app-viz',
  imports: [
    ControlsComponent
  ],
  templateUrl: './viz.html',
  styleUrl: './viz.scss',
})
export class VizComponent implements AfterViewInit {
  vizConfig = input<VizInterface>();
  @ViewChild('visualization', { static: true })

  visualization!: ElementRef<HTMLDivElement>;
  controlsService: ControlsService = inject(ControlsService);
  vizService: VizService = inject(VizService);

  scene = new THREE.Scene();
  group: THREE.Object3D = new THREE.Group();
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true } );
  camera: THREE.PerspectiveCamera | undefined ;

  ngAfterViewInit(): void {
    const config = this.vizConfig() as VizInterface;
    const width = window.innerWidth, height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    this.camera.position.z = config.cameraZPosition;
    this.camera.position.y = config.cameraYPosition;
    this.camera.lookAt(0,0,0);
    this.scene = new THREE.Scene();
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
    const geometry = new THREE.CylinderGeometry( 2, 2, 10, 8 );
    const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    const cylinder = new THREE.Mesh(geometry, material);

    this.group = new THREE.Group();
    this.group.add(cylinder);

    return this.group;
  }

  addGroupToScene( group: THREE.Object3D, scene: THREE.Scene): void {
    scene.add(group);
  }
}
