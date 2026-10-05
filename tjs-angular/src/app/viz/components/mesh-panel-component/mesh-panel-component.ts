import { Component, inject } from '@angular/core';
import { ControlsService } from '../../services/controls-service';
import { MeshClass } from '../../classes/mesh/mesh';

@Component({
  selector: 'app-mesh-panel-component',
  imports: [],
  templateUrl: './mesh-panel-component.html',
  styleUrl: './mesh-panel-component.scss',
})
export class MeshPanelComponent {
  readonly MeshClass = MeshClass;
  controlsService: ControlsService = inject(ControlsService);

  setRotation(value: string, type: 'x'|'y'|'z'): void {
    if(type === 'x') {
      this.controlsService.setX(parseFloat(value));
    } else if(type === 'y') {
      this.controlsService.setY(parseFloat(value));
    } else if(type === 'z') {
      this.controlsService.setZ(parseFloat(value));
    }
  }

  selectMesh(event: Event): void {
    const mesh = (event.target as HTMLSelectElement).value;
    this.controlsService.setSelectedMesh(mesh);
  }

}
