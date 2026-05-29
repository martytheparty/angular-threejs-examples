import { Component, signal } from '@angular/core';
import { VizComponent } from './viz/viz';

@Component({
  selector: 'app-root',
  imports: [VizComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
