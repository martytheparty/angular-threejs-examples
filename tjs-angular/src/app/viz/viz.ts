import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import * as THREE from 'three';
import { ControlsComponent } from './components/controls/controls';
import { ControlsService } from './services/controls-service';
import { VizAnimation } from './classes/viz.animation.class';
import { StlService } from './services/stl-service';
import { MeshClass } from './classes/mesh/mesh';
import { ListManagerComponent } from './components/list-manager-component/list-manager-component';
import { SceneService } from './services/scene-service';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './components/clock-component/clock-component';
import { LightComponent } from './components/light-component/light-component';

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
