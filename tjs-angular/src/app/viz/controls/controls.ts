import { inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlsService } from '../controls-service';
import { CommonModule } from '@angular/common';
import { MeshClass } from '../mesh/mesh';
import { VizAnimation } from '../viz.animation.class';

@Component({
  selector: 'app-controls',
  imports: [CommonModule],
  templateUrl: './controls.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './controls.scss',
})
export class ControlsComponent {

  controlsService: ControlsService = inject(ControlsService);
  readonly MeshClass = MeshClass;

  constructor() {}

  setAttribute(selected: 'rotation' | 'position'): void {
    this.controlsService.setSelectedAttribute(selected);
  }

  setControlSelected(selected: 'x' | 'y' | 'z'): void {
    this.controlsService.setSelected(selected);
  }

  setControlPositionSelected(selected: 'x' | 'y' | 'z'): void {
    this.controlsService.setSelectedPosition(selected);
  }

  selectMesh(event: Event): void {
    const mesh = (event.target as HTMLSelectElement).value;
    this.controlsService.setSelectedMesh(mesh);
  }
}
