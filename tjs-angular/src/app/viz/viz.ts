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
    this.camera = new THREE.PerspectiveCamera( 70, (width /2) / height, 0.01, 20 );
    
    this.camera.position.z = config.camera.position.z;
    this.camera.position.y = config.camera.position.y;
    this.camera.position.x = config.camera.position.x;
    this.camera.lookAt(config.camera.lookat.x, config.camera.lookat.y, config.camera.lookat.z);
    this.scene = new THREE.Scene();
    this.createGroup();
    this.addGroupToScene(this.group, this.scene);

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
    const geometry: THREE.BufferGeometry = new THREE.CylinderGeometry( 0, 3, 6, 16 ).toNonIndexed();;



    //const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});

    const colors: number[] = [];

    const verticesPerSegment = 3; // 2 triangles = 6 vertices
    const segments = 16;
    const numberOfColors = 3;

    const red   = [1, 0, 0];
    const white = [1, 1, 1];
    const blue  = [0, 0, 1];

    console.log(geometry, geometry.attributes['position'].count);

    for (let i = 0; i < geometry.attributes['position'].count; i++) {

      // Which side panel are we in?
      const segment = Math.floor(i / verticesPerSegment) % segments;

      let color;

      switch (segment % numberOfColors) {
        case 0:
          color = red;
          break;
        case 1:
          color = white;
          break;
        default:
          color = blue;
      }

      colors.push(...color);
    }

    console.log('colors', colors);
    
    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );

const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
  side: THREE.DoubleSide
});

    const cylinder = new THREE.Mesh(geometry, material);

    this.group = new THREE.Group();
    this.group.add(cylinder);

    return this.group;
  }

  addGroupToScene( group: THREE.Object3D, scene: THREE.Scene): void {
    scene.add(group);
  }
}
