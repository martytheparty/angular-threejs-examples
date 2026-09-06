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

}
