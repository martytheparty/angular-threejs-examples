import { 
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.html',
  styleUrl: './viz.scss',
})
export class VizComponent implements AfterViewInit {

  @ViewChild('visualization', { static: true })
  visualization!: ElementRef<HTMLDivElement>;

  constructor() {

  }

  ngAfterViewInit(): void {
    const width = window.innerWidth, height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    camera.position.z = 10;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry( 3, 3);
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

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

    function animate( time: number ) {

      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render( scene, camera );

    }
  }
}
