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
import { ListManagerComponent } from './list-manager-component/list-manager-component';
import { SceneService } from './scene-service';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock-component/clock-component';
import { LightComponent } from './light-component/light-component';

@Component({
  selector: 'app-viz',
  imports: [
    ControlsComponent,
    ListManagerComponent,
    CommonModule,
    ClockComponent,
    LightComponent
  ],
  templateUrl: './viz.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './viz.scss',
})
export class VizComponent implements AfterViewInit {
  @ViewChild('visualization', { static: true })
  visualization!: ElementRef<HTMLDivElement>;
  stlService: StlService = inject(StlService);
  sceneService: SceneService = inject(SceneService);

  ngAfterViewInit(): void {
    const scene = this.sceneService.scene;

    this.visualization.nativeElement.appendChild(this.sceneService.renderer.domElement);
  }
}
