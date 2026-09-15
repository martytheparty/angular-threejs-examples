import { inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlsService } from '../controls-service';
import { CommonModule } from '@angular/common';
import { MeshClass } from '../mesh/mesh';
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

  setRotation(value: string, type: 'x'|'y'|'z'): void {
    if(type === 'x') {
      this.controlsService.setX(parseFloat(value));
    } else if(type === 'y') {
      this.controlsService.setY(parseFloat(value));
    } else if(type === 'z') {
      this.controlsService.setZ(parseFloat(value));
    }
  }

  setPosition(value: string, type: 'x'|'y'|'z'): void {
    if(type === 'x') {
      this.controlsService.setXPosition(parseFloat(value));
    } else if(type === 'y') {
      this.controlsService.setYPosition(parseFloat(value));
    } else if(type === 'z') {
      this.controlsService.setZPosition(parseFloat(value));
    }
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
