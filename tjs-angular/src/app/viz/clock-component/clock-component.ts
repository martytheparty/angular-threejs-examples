import { 
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


import { ClockService } from '../clock-service';

@Component({
  selector: 'app-clock-component',
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './clock-component.html',
  styleUrl: './clock-component.scss',
})
export class ClockComponent {

  clockService: ClockService = inject(ClockService);
  time: WritableSignal<number> = signal<number>(0);

  times: string[] = ['seconds', '10s of seconds', '100s of seconds', 'milliseconds'];
  timeInc: TimeIncrements = "seconds"

  constructor() {
    setInterval( () => {
      let time = this.clockService.getElapsedSeconds();

      if (this.timeInc === '10s of seconds') {
        time = this.clockService.getElapsedTensSeconds();
      } else if (this.timeInc === '100s of seconds') {
        time = this.clockService.getElapsedHundredsSeconds();
      } else if (this.timeInc === 'milliseconds') {
        time = this.clockService.getElapsedMilliseconds();
      }

      this.time.set(time);
    }, 100 );
  }

  setTimeInc(timeInc: MatSelectChange<TimeIncrements>): void {
    console.log(timeInc.value);
    this.timeInc = timeInc.value;
  }
}

type TimeIncrements = 'seconds' | '10s of seconds' | '100s of seconds' | 'milliseconds';
