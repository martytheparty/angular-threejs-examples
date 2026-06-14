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
  s: WritableSignal<number> = signal<number>(3);

  selected: WritableSignal<'x'|'y'|'z'|'s'> = signal<'x'|'y'|'z'|'s'>('x');

constructor() {
    fromEvent<KeyboardEvent>(window, 'keydown')
      .subscribe(this.handleKeyboard.bind(this));
  }

  handleKeyboard(keyboardEvent: KeyboardEvent) {
    const key: string = keyboardEvent.key;
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
    } else if (this.selected() === 's') {
      this.setS(this.s() + 1); 
    }
  }

  decrement(): void {
    if(this.selected() === 'x') {
      this.setX(this.x() - 1); 
    } else if (this.selected() === 'y') {
      this.setY(this.y() - 1); 
    } else if (this.selected() === 'z') {
      this.setZ(this.z() - 1); 
    } else if (this.selected() === 's') {
      if (this.s() > 3) {
        this.setS(this.s() - 1); 
      }
    }
  }

  setS(newS: number): void {
    this.s.set(newS);
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

  setSelected(selected: 'x'|'y'|'z'|'s'): void {
    this.selected.set(selected);
  }
}
