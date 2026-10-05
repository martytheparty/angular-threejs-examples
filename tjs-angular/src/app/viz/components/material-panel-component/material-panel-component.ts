import { Component, inject } from '@angular/core';
import { ControlsService } from '../../services/controls-service';
import { MaterialClass } from '../../classes/material/material-class';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-material-panel-component',
  imports: [
    MatCheckboxModule
  ],
  templateUrl: './material-panel-component.html',
  styleUrl: './material-panel-component.scss',
})
export class MaterialPanelComponent {
  controlsService: ControlsService = inject(ControlsService);
  readonly MaterialClass = MaterialClass;

  selectMaterial(event: Event): void {
    const material = (event.target as HTMLSelectElement).value;
    this.controlsService.setSelectedMaterial(material);
  }

  updateWireframe(parameter: MatCheckboxChange): void {
    this.controlsService.selectWireframe.set(parameter.checked);
    console.log("update wire frame", parameter);
  }

  setColor(value: string, type: 'r'|'g'|'b'): void {
    if(type === 'r') {
      this.controlsService.setRColor(parseFloat(value));
    } else if(type === 'g') {
      this.controlsService.setGColor(parseFloat(value));
    } else if(type === 'b') {
      this.controlsService.setBColor(parseFloat(value));
    }
  }

  setEColor(value: string, type: 'r'|'g'|'b'): void {
    if(type === 'r') {
      this.controlsService.setERColor(parseFloat(value));
    } else if(type === 'g') {
      this.controlsService.setEGColor(parseFloat(value));
    } else if(type === 'b') {
      this.controlsService.setEBColor(parseFloat(value));
    }
  }

  setEIntensity(intensity: string): void {
    this.controlsService.setEIntensity(parseFloat(intensity));
  }

}
