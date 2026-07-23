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
    const mesh = this.getMesh();
    group.add(mesh);


    scene.add(group);

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor(0xaaaaaa); // white
    renderer.setSize( width, height );

    const animation = new VizAnimation(group);

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

  getMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(2, 0);
    shape.lineTo(1, 2);
    shape.closePath();
    const geometry = new THREE.ShapeGeometry(shape);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }
}
