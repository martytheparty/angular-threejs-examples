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
    const starMesh = this.getStarMesh();
    // const squareMesh = this.getSquareMesh();
    // const triangleMesh = this.getTriangeMesh();
    // this is confusing I need to come up with a better way to do this...
    // maybe pass in the offset
    // const middleMesh = this.getMidleMesh(.5);
    // const middleMesh2 = this.getMidleMesh(.25);
    // const middleMesh3 = this.getMidleMesh(.75);
    group.add(starMesh);


    scene.add(group);

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor(0xaaaaaa); // white
    renderer.setSize( width, height );
    const meshes: THREE.Mesh[] = [];
    meshes.push(starMesh);
    // meshes.push(triangleMesh);
    // meshes.push(middleMesh3);
    // meshes.push(middleMesh);
    // meshes.push(middleMesh2);
    // meshes.push(squareMesh);
    // meshes.push(middleMesh2);
    // meshes.push(middleMesh);
    // meshes.push(middleMesh3);



    const animation = new VizAnimation(group, meshes);

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

  getStarMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide
    });

    const star = new THREE.Shape();

    const outerRadius = 3;
    const innerRadius = 1.4;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = (i % 2 === 0) ? outerRadius : innerRadius;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        star.moveTo(x, y);
      } else {
        star.lineTo(x, y);
      }
    }

  star.closePath();

  const geometry = new THREE.ShapeGeometry(star);
  geometry.center();

  return new THREE.Mesh(geometry, material);
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

  getMidleMesh(offset: number): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    const square = new THREE.Shape();
    const xLength = 2; // this is the total length
    const middleX = xLength/2; // this is the middle
    const startX = 0; //this is the first spot
    const endX = xLength;
//    const distance = (xLength - middleX)/(position + 1); // this is how far (displacement) the point should be from the end.
    const firstX = startX + offset;
    const lastX = endX - offset;
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(lastX, 2);
    square.lineTo(firstX, 2);

    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

}
