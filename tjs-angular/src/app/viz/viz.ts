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
    
    camera.position.z = 8;
    const scene = new THREE.Scene();


    const group = new THREE.Group();
    const squareMesh = this.getSquareMesh();
    const triangleMesh = this.getTriangeMesh();
    group.add(triangleMesh);


    scene.add(group);

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor(0xaaaaaa); // white
    renderer.setSize( width, height );

    const animation = new VizAnimation(group, squareMesh, triangleMesh);

    renderer.setAnimationLoop( 
      (time: number) => {
          animation.setRotationXSpeed(this.controlsService.x());
          animation.setRotationYSpeed(this.controlsService.y());
          animation.setRotationZSpeed(this.controlsService.z());
          animation.animate(time);
          renderer.render(scene, camera);
        }
     );

    this.visualization.nativeElement.appendChild(
      renderer.domElement
    );
  }

  getTriangeMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    const square = new THREE.Shape();
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(1, 2);
    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  getSquareMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    const square = new THREE.Shape();
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(2, 2);
    square.lineTo(0, 2);
    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

}
