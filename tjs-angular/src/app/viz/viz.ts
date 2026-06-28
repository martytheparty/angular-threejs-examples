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

    this.camera = new THREE.PerspectiveCamera( 70, (width /2) / height, 0.01, 120 );    

    this.camera.position.z = config.camera.position.z;
    this.camera.position.y = config.camera.position.y;
    this.camera.lookAt(config.camera.lookAt.x, config.camera.lookAt.y, config.camera.lookAt.z);
    this.scene = new THREE.Scene();
    this.group = this.createGroup();
    this.addGroupToScene(this.group, this.scene);

    const sun = this.createSphere(5, -36, 0, 0);
    this.addMeshToScene(sun, this.scene);

    this.renderer.setClearColor(0xaaaaaa); // white
    this.renderer.setSize( width/2, height );

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
    const sphereGeometry = new THREE.SphereGeometry(2);
    const sphereSmallGeometry = new THREE.SphereGeometry(.4);
    const material = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, material);  
    const sphereSmall = new THREE.Mesh(sphereSmallGeometry, material);
    sphereSmall.position.set(-3, 0, 0);

    this.group = new THREE.Group();
    this.group.add(sphere);
    this.group.add(sphereSmall);

    return this.group;
  }

  createSphere(radius: number, x: number, y: number, z: number): THREE.Object3D {
    const sphereGeometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, material);  
    sphere.position.set(x, y, z);

    return sphere;
  }

  addGroupToScene( group: THREE.Object3D, scene: THREE.Scene): void {
    scene.add(group);
  }

  addMeshToScene(mesh: THREE.Object3D, scene: THREE.Scene): void {
    scene.add(mesh);
  }
}
