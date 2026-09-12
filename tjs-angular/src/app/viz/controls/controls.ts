import { inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlsService } from '../controls-service';
import { CommonModule } from '@angular/common';
import { MeshClass } from '../mesh/mesh';
import { VizAnimation } from '../viz.animation.class';
import { MaterialClass } from '../material/material-class';

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
  readonly MaterialClass = MaterialClass;

  constructor() {}

  setAttribute(selected: 'rotation' | 'position' | 'color'): void {
    this.controlsService.setSelectedAttribute(selected);
  }

  setControlSelected(selected: 'x' | 'y' | 'z'): void {
    this.controlsService.setSelected(selected);
  }

  setControlPositionSelected(selected: 'x' | 'y' | 'z'): void {
    this.controlsService.setSelectedPosition(selected);
  }

  setColorPositionSelected(selected: 'r' | 'g' | 'b'): void {
    this.controlsService.setSelectedColorPosition(selected);
  }

  selectMesh(event: Event): void {
    const mesh = (event.target as HTMLSelectElement).value;
    this.controlsService.setSelectedMesh(mesh);
  }

  selectMaterial(event: Event): void {
    const material = (event.target as HTMLSelectElement).value;
    this.controlsService.setSelectedMaterial(material);
  }
}
