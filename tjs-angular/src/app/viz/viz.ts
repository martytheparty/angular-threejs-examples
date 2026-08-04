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
import { StlService } from './stl-service';

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
  stlService: StlService = inject(StlService);

  ngAfterViewInit(): void {

    const width = window.innerWidth, height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 20 );
    
    camera.position.z = 5;
    const scene = new THREE.Scene();


    const group = new THREE.Group();
    const twoLathe = this.getSimpleTwoLathe()
    //const candleStick = this.getLatheCandleStick();
    //const shrinkingHelix = this.getShrinkingHelixMesh();
    //const tubeMesh = this.getTubeMesh();
    //const gearMesh = this.getGearMesh();
    // this.stlService.exportMesh(tubeMesh, 'tube.stl');
    //const starMesh = this.getStarMesh();
    // const squareMesh = this.getSquareMesh();
    // const triangleMesh = this.getTriangeMesh();
    // this is confusing I need to come up with a better way to do this...
    // maybe pass in the offset
    // const middleMesh = this.getMidleMesh(.5);
    // const middleMesh2 = this.getMidleMesh(.25);
    // const middleMesh3 = this.getMidleMesh(.75);
    //group.add(shrinkingHelix);

    group.add(twoLathe);
    scene.add(group);

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor(0xaaaaaa); // white
    renderer.setSize( width, height );
    const meshes: THREE.Mesh[] = [];
    meshes.push(twoLathe);
    //meshes.push(shrinkingHelix);
    //meshes.push(gearMesh);
    //meshes.push(starMesh);
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

getTubeMesh(): THREE.Mesh {
  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
  });

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 3, 0),
  ])
  const geometry = new THREE.TubeGeometry(
    curve,
    32,    // tubular segments
    1,  // radius
    64,    // radial segments
    false  // closed
  );

  geometry.center();

  return new THREE.Mesh(geometry, material);
}

getGearMesh(): THREE.Mesh {
  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  });

  const gear = new THREE.Shape();

  const teeth = 10;
  const outerRadius = 1.8;
  const rootRadius = 1.1;

  const segmentsPerTooth = 6;

  for (let i = 0; i < teeth * segmentsPerTooth; i++) {
    const segment = i % segmentsPerTooth;

    let radius: number;

    switch (segment) {
      case 0: // valley before tooth
        radius = rootRadius;
        break;

      case 1: // outside edge
        radius = outerRadius;
        break;

      case 2: // flat top of tooth
        radius = outerRadius;
        break;

      case 3: // falling edge
        radius = rootRadius;
        break;

      default:
        radius = rootRadius;
    }

    const angle =
      (i / (teeth * segmentsPerTooth)) * Math.PI * 2 -
      Math.PI / 2;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (i === 0) {
      gear.moveTo(x, y);
    } else {
      gear.lineTo(x, y);
    }
  }

  gear.closePath();

 // const geometry = new THREE.ShapeGeometry(gear);
   const geometry = new THREE.ExtrudeGeometry(gear, {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1
  });

  geometry.center();

  return new THREE.Mesh(geometry, material);
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

    const geometry = new THREE.ExtrudeGeometry(star, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1
    });
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

  getShrinkingHelixMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide
    });

    const curve = this.getShrinkingHelixCurve();

    const geometry = new THREE.TubeGeometry(
      curve,
      256,
      0.08,
      16,
      false
    );

    return new THREE.Mesh(geometry, material);
  }

  getShrinkingHelixCurve(): THREE.CatmullRomCurve3 {
    const points: THREE.Vector3[] = [];

    const turns = 8;
    const stepsPerTurn = 32;

    const startRadius = 2.0;
    const endRadius = 0.2;
    const height = 6;

    const totalSteps = turns * stepsPerTurn;

    for (let i = 0; i <= totalSteps; i++) {
      const t = i / totalSteps;

      const angle = t * turns * Math.PI * 2;

      // Radius shrinks linearly
      const radius = startRadius * (1 - t) + endRadius * t;

      const x = radius * Math.cos(angle);
      const y = height * (t - 0.5);
      const z = radius * Math.sin(angle);

      points.push(new THREE.Vector3(x, y, z));
    }

    return new THREE.CatmullRomCurve3(points);
  }

getSimpleTwoLathe(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const latheWidth = 1;
    const latheHeight = 1;

    const points: THREE.Vector2[] = [
      new THREE.Vector2(latheWidth + 1, 0),
      new THREE.Vector2(latheWidth, latheHeight),
    ];

    const geometry = new THREE.LatheGeometry(points, 64);
    geometry.center();

    return new THREE.Mesh(geometry, material);
}

getLatheCandleStick(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const points: THREE.Vector2[] = [
      // Base
      new THREE.Vector2(0.00, 0.00),
      new THREE.Vector2(1.20, 0.00),
      new THREE.Vector2(1.10, 0.15),
      new THREE.Vector2(0.90, 0.25),

      // Stem
      new THREE.Vector2(0.35, 0.50),
      new THREE.Vector2(0.30, 2.50),

      // Decorative ring
      new THREE.Vector2(0.55, 2.70),
      new THREE.Vector2(0.35, 2.90),

      // Candle cup
      new THREE.Vector2(0.70, 3.20),
      new THREE.Vector2(0.80, 3.50),
      new THREE.Vector2(0.55, 3.75),
      new THREE.Vector2(0.45, 4.10),

      // Center point to close the top
      new THREE.Vector2(0.00, 4.10),
    ];

    const geometry = new THREE.LatheGeometry(points, 64);
    geometry.center();

    return new THREE.Mesh(geometry, material);
  }

}
