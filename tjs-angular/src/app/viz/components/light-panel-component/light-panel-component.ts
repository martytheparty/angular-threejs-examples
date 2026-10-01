import { Component, inject } from '@angular/core';
import { ControlsService } from '../../services/controls-service';

@Component({
  selector: 'app-light-panel-component',
  imports: [],
  templateUrl: './light-panel-component.html',
  styleUrl: './light-panel-component.scss',
})
export class LightPanelComponent {
    controlsService: ControlsService = inject(ControlsService);
}
