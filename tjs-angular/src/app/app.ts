import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { VizComponent } from './viz/viz';

@Component({
  selector: 'app-root',
  imports: [VizComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {}
