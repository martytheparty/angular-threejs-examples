import { inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlsService } from '../../services/controls-service';
import { CommonModule } from '@angular/common';
import { MeshClass } from '../../classes/mesh/mesh';
import { MaterialClass } from '../../classes/material/material-class';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-controls',
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  templateUrl: './controls.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './controls.scss',
})
export class ControlsComponent {

  controlsService: ControlsService = inject(ControlsService);
  readonly MeshClass = MeshClass;
  readonly MaterialClass = MaterialClass;

  constructor() {}

  setPosition(value: string, type: 'x'|'y'|'z'): void {
    if(type === 'x') {
      this.controlsService.setXPosition(parseFloat(value));
    } else if(type === 'y') {
      this.controlsService.setYPosition(parseFloat(value));
    } else if(type === 'z') {
      this.controlsService.setZPosition(parseFloat(value));
    }
  }





}
