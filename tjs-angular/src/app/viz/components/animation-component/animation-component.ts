import { Component, inject } from '@angular/core';
import { ControlsService } from '../../services/controls-service';

@Component({
  selector: 'app-animation-component',
  imports: [],
  templateUrl: './animation-component.html',
  styleUrl: './animation-component.scss',
})
export class AnimationComponent {
  controlsService: ControlsService = inject(ControlsService);  

  setRotation(value: string, type: 'x'|'y'|'z'): void {
    if(type === 'x') {
      this.controlsService.setAnimationX(parseFloat(value));
    } else if(type === 'y') {
      this.controlsService.setAnimationY(parseFloat(value));
    } else if(type === 'z') {
      this.controlsService.setAnimationZ(parseFloat(value));
    }
  }
}
