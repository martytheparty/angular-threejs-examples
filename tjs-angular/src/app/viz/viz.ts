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
    const loader = new THREE.TextureLoader();
    const bulldogTexture = loader.load('/bulldog.jpg');
    bulldogTexture.flipY = false;

    const width = window.innerWidth, height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    camera.position.z = 10;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry( 3, 3);
    const frontMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000, // red
      side: THREE.FrontSide
    });

    const backMaterial = new THREE.MeshBasicMaterial({
       map: bulldogTexture,
      side: THREE.BackSide
    });

    const frontMesh = new THREE.Mesh(geometry, frontMaterial);
    const backMesh = new THREE.Mesh(geometry, backMaterial);

    const group = new THREE.Group();

    group.add(frontMesh);
    group.add(backMesh);

    scene.add(group);

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor(0xaaaaaa); // white
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
        group.rotation.x = time / controlsService.x();
      }

      if(controlsService.y() > 0) {
        group.rotation.y = time / controlsService.y();
      }

      if(controlsService.z() > 0) {
        group.rotation.z = time / controlsService.z();
      }

      renderer.render( scene, camera );

    }
  }
}
