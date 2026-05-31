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
    const frontMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000, // red
      side: THREE.FrontSide
    });

    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000, // black
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

    function animate( time: number ) {

      group.rotation.x = time / 2000;
      group.rotation.y = time / 1000;

      renderer.render( scene, camera );

    }
  }
}
