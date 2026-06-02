import {
  inject,
  Component
} from '@angular/core';
import { ControlsService } from '../controls-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls',
  imports: [
    CommonModule
  ],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class ControlsComponent {
  controlsService: ControlsService = inject(ControlsService);

  setControlSelected(selected: "x"|"y"|"z"):void {
    this.controlsService.setSelected(selected);
  }
}
