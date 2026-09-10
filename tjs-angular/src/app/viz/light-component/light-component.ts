import { Component, inject } from '@angular/core';
import { ControlsService } from '../controls-service';

@Component({
  selector: 'app-light-component',
  imports: [],
  templateUrl: './light-component.html',
  styleUrl: './light-component.scss',
})
export class LightComponent {
  controlsService: ControlsService = inject(ControlsService);

  updateAmbientIntensity(intensity: number): void {
    this.controlsService.setAmbientLightIntensity(intensity);
  }

  updateAmbientColor(red: number, green: number, blue: number): void {
    const color = `#${this.toHex(red)}${this.toHex(green)}${this.toHex(blue)}`;
    this.controlsService.setAmbientLightColor(color);
  }

  updateSceneColor(red: number, green: number, blue: number): void {
    const color = `#${this.toHex(red)}${this.toHex(green)}${this.toHex(blue)}`;
    this.controlsService.setSceneColor(color);
  }

  toHex(value: number): string {
      return value.toString(16).padStart(2, '0');
  }

}
