import { 
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  x: WritableSignal<number> = signal<number>(0);
  y: WritableSignal<number> = signal<number>(0);
  z: WritableSignal<number> = signal<number>(0);

  selected: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');

constructor() {
    fromEvent<KeyboardEvent>(window, 'keydown')
      .subscribe(this.handleKeyboard.bind(this));
  }

  handleKeyboard(keyboardEvent: KeyboardEvent) {
    const key: string = keyboardEvent.key;
    console.log(key, "key");
    if (key === 'ArrowUp' ) this.increment();
    if (key === 'ArrowDown' ) this.decrement();
  }

  increment(): void {
    if(this.selected() === 'x') {
      this.setX(this.x() + 1); 
    } else if (this.selected() === 'y') {
      this.setY(this.y() + 1); 
    } else if (this.selected() === 'z') {
      this.setZ(this.z() + 1); 
    }
  }

  decrement(): void {
    if(this.selected() === 'x') {
      this.setX(this.x() - 1); 
    } else if (this.selected() === 'y') {
      this.setY(this.y() - 1); 
    } else if (this.selected() === 'z') {
      this.setZ(this.z() - 1); 
    }
  }



  setX(newX: number): void {
    this.x.set(newX);
  }

  setY(y: number): void {
    this.y.set(y);
  }

  setZ(z: number): void {
    this.z.set(z);
  }

  setSelected(selected: 'x'|'y'|'z'): void {
    this.selected.set(selected);
  }
}
