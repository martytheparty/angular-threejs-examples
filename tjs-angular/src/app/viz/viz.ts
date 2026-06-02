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

  constructor() {

  }

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

    renderer.setAnimationLoop( animate );
    //document.body.appendChild( renderer.domElement );

    this.visualization.nativeElement.appendChild(
      renderer.domElement
    );

    // animation
    const controlsService = this.controlsService;

    function animate( time: number ) {

      if(controlsService.x() > 0) {
        mesh.rotation.x = time / controlsService.x();
      }

      if(controlsService.y() > 0) {
        mesh.rotation.y = time / controlsService.y();
      }

      if(controlsService.z() > 0) {
        mesh.rotation.z = time / controlsService.z();
      }

      renderer.render( scene, camera );

    }
  }
}
