import { Component, inject } from '@angular/core';
import { VizComponent } from './viz/viz';
import { VizService } from './viz/viz-service';

@Component({
  selector: 'app-root',
  imports: [VizComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  vizService: VizService = inject(VizService);
}
