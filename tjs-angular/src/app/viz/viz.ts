import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ControlsComponent } from './components/controls/controls';
import { StlService } from './services/stl-service';
import { ListManagerComponent } from './components/list-manager-component/list-manager-component';
import { SceneService } from './services/scene-service';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './components/clock-component/clock-component';
import { LightComponent } from './components/light-component/light-component';
import { AnimationComponent } from './components/animation-component/animation-component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-viz',
  imports: [
    ControlsComponent,
    ListManagerComponent,
    CommonModule,
    ClockComponent,
    LightComponent,
    AnimationComponent,
    CdkDrag,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule
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
  panels: string[] = [
    'light',
    'controls',
    'animations',
    'group-list',
    'clock'
  ];
  hiddenPanels: string[] = [];

  ngAfterViewInit(): void {
    const scene = this.sceneService.scene;

    this.visualization.nativeElement.appendChild(this.sceneService.renderer.domElement);
  }

  setPanelView(panel: string): void {
    const found: string | undefined = this.hiddenPanels.find((panelItem) => panel === panelItem);
    if (found) {
      this.hiddenPanels = this.hiddenPanels.filter( (panelItem: string) => panelItem !== panel );
    } else {
      this.hiddenPanels = [ ...this.hiddenPanels, panel]
    }

  }
}
