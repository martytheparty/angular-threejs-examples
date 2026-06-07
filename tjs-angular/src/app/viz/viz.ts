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

  ngAfterViewInit(): void {
    const width = window.innerWidth, height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    camera.position.z = 10;
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry( 3, 3, 3 );
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );

    const animation = new VizAnimation(mesh);

    renderer.setAnimationLoop( 
      () => {
          animation.setRotationXSpeed(this.controlsService.x());
          animation.setRotationYSpeed(this.controlsService.y());
          animation.setRotationZSpeed(this.controlsService.z());
          animation.animate();
          renderer.render(scene, camera);
        }
     );

    this.visualization.nativeElement.appendChild(
      renderer.domElement
    );
  }
}
