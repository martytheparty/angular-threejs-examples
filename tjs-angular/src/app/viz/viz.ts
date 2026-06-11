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
    const loader = new THREE.TextureLoader();
    const frontTexture = loader.load('/zoetrope.png');
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    const backTexture = loader.load('/zoetrope.png');
    backTexture.flipY = false;

    const width = window.innerWidth, height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    camera.position.z = 5;
    const scene = new THREE.Scene();
    const geometry = new THREE.CircleGeometry( 3, 8);
    const frontMaterial = new THREE.MeshBasicMaterial({
      map: frontTexture,
      side: THREE.FrontSide
    });

    const backMaterial = new THREE.MeshBasicMaterial({
       map: backTexture,
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

    const animation = new VizAnimation(group);

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
