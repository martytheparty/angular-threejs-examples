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

  xPosition: WritableSignal<number> = signal<number>(0);
  yPosition: WritableSignal<number> = signal<number>(0);
  zPosition: WritableSignal<number> = signal<number>(0);

  selected: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');
  selectedPosition: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');

  selectedAttribute: WritableSignal<'rotation'|'position'> = signal<'rotation'|'position'>('rotation');

  selectedMeshSignal: WritableSignal<string> = signal<string>("");
  selectedMesh: string = "";

constructor() {
    fromEvent<KeyboardEvent>(window, 'keydown')
      .subscribe(this.handleKeyboard.bind(this));
  }

  setSelectedMesh(meshName: string): void {
    this.selectedMeshSignal.set(meshName);
    this.selectedMesh = meshName;
  }

  setSelectedAttribute(attribute: 'rotation'|'position'): void {
    this.selectedAttribute.set(attribute);
  }

  handleKeyboard(keyboardEvent: KeyboardEvent) {
    const key: string = keyboardEvent.key;
    if (key === 'ArrowUp' ) this.increment();
    if (key === 'ArrowDown' ) this.decrement();
  }

  increment(): void {
    if (this.selectedAttribute() === 'rotation') {
      if(this.selected() === 'x') {
        this.setX(this.x() + 1); 
      } else if (this.selected() === 'y') {
        this.setY(this.y() + 1); 
      } else if (this.selected() === 'z') {
        this.setZ(this.z() + 1); 
      }
    }

    if (this.selectedAttribute() === 'position') {
      if(this.selectedPosition() === 'x') {
        this.xPosition.set(this.xPosition() + 1); 
      } else if (this.selectedPosition() === 'y') {
        this.yPosition.set(this.yPosition() + 1); 
      } else if (this.selectedPosition() === 'z') {
        this.zPosition.set(this.zPosition() + 1); 
      }
    }
  }

  decrement(): void {
    if (this.selectedAttribute() === 'rotation') {
      if(this.selected() === 'x') {
        this.setX(this.x() - 1); 
      } else if (this.selected() === 'y') {
        this.setY(this.y() - 1); 
      } else if (this.selected() === 'z') {
        this.setZ(this.z() - 1); 
      }
    }

    if (this.selectedAttribute() === 'position') {
      if(this.selectedPosition() === 'x') {
        this.xPosition.set(this.xPosition() - 1); 
      } else if (this.selectedPosition() === 'y') {
        this.yPosition.set(this.yPosition() - 1); 
      } else if (this.selectedPosition() === 'z') {
        this.zPosition.set(this.zPosition() - 1); 
      }
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

  setSelectedPosition(selected: 'x'|'y'|'z'): void {
    this.selectedPosition.set(selected);
  }
}
