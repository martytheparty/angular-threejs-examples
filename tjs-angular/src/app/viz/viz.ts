import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import * as THREE from 'three';
import { ControlsComponent } from './controls/controls';
import { ControlsService } from './controls-service';
import { VizAnimation } from './viz.animation.class';
import { StlService } from './stl-service';
import { MeshClass } from './mesh/mesh';

@Component({
  selector: 'app-viz',
  imports: [ControlsComponent],
  templateUrl: './viz.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './viz.scss',
})
export class VizComponent implements AfterViewInit {
  @ViewChild('visualization', { static: true })
  visualization!: ElementRef<HTMLDivElement>;
  controlsService: ControlsService = inject(ControlsService);
  stlService: StlService = inject(StlService);

  mesh: MeshClass = new MeshClass();

  ngAfterViewInit(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 20);

    camera.position.z = 5;
    const scene = new THREE.Scene();

    const group = new THREE.Group();
    const star = this.mesh.getStarMesh();

    group.add(star);
    scene.add(group);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xaaaaaa); // white
    renderer.setSize(width, height);
    const meshes: THREE.Mesh[] = [];
    meshes.push(star);

    const animation = new VizAnimation(group, meshes, this.controlsService);

    renderer.setAnimationLoop((time: number) => {
      animation.setRotationXSpeed(this.controlsService.x());
      animation.setRotationYSpeed(this.controlsService.y());
      animation.setRotationZSpeed(this.controlsService.z());

      animation.setXPosition(this.controlsService.xPosition());
      animation.setYPosition(this.controlsService.yPosition());
      animation.setZPosition(this.controlsService.zPosition());

      animation.animate(time);
      renderer.render(scene, camera);
    });

    this.visualization.nativeElement.appendChild(renderer.domElement);
  }
}
