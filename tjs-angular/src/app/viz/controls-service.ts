import { 
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { GroupData, ThreeGroup } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  ambientLightIntensity: WritableSignal<number> = signal<number>(1);
  ambientLightColor: WritableSignal<string> = signal<string>("#FFFFFF");
  sceneColor: WritableSignal<string> = signal<string>("#FFFFFF");

  x: WritableSignal<number> = signal<number>(0);
  y: WritableSignal<number> = signal<number>(0);
  z: WritableSignal<number> = signal<number>(0);

  xPosition: WritableSignal<number> = signal<number>(0);
  yPosition: WritableSignal<number> = signal<number>(0);
  zPosition: WritableSignal<number> = signal<number>(0);

  rColor: WritableSignal<number> = signal<number>(0);
  gColor: WritableSignal<number> = signal<number>(0);
  bColor: WritableSignal<number> = signal<number>(0);

  selected: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');
  selectedPosition: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');
  selectedColorPosition: WritableSignal<'r'|'g'|'b'> = signal<'r'|'g'|'b'>('r');

  selectedAttribute: WritableSignal<'rotation'|'position'|'color'> = signal<'rotation'|'position'>('rotation');

  selectedMeshSignal: WritableSignal<string> = signal<string>("");
  selectedMesh: string = "";

  selectedMaterialSignal: WritableSignal<string> = signal<string>("");
  selectedMaterial: string = "";

  groups: WritableSignal<ThreeGroup[]> = signal<ThreeGroup[]>([]);

constructor() {
  fromEvent<KeyboardEvent>(window, 'keydown')
      .subscribe(this.handleKeyboard.bind(this));
  }

  reset(userData: GroupData): void {
    this.x.set(userData.rotationX);
    this.y.set(userData.rotationY);
    this.z.set(userData.rotationZ);
    this.xPosition.set(userData.positionX);
    this.yPosition.set(userData.positionY);
    this.zPosition.set(userData.positionZ);
    if (userData.color) {
      let color = userData.color as string;

      if (color.length !== 7) {
        color = "#FFFFFF";
      }
      
      this.rColor.set(parseInt(color.substring(1,3),16));
      this.gColor.set(parseInt(color.substring(3,5),16));
      this.bColor.set(parseInt(color.substring(5,7),16));
    }

  }

  setSelectedMesh(meshName: string): void {
    this.selectedMeshSignal.set(meshName);
    this.selectedMesh = meshName;
  }

  setSelectedMaterial(materialName: string): void {
    this.selectedMaterialSignal.set(materialName);
    this.selectedMaterial = materialName;
  }

  setSelectedAttribute(attribute: 'rotation'|'position'|'color'): void {
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

    if (this.selectedAttribute() === 'color') {
      if(this.selectedColorPosition() === 'r') {
        if (this.rColor() < 255) {
          this.rColor.set(this.rColor() + 1); 
        }
      } else if (this.selectedColorPosition() === 'g') {
        if (this.gColor() < 255) {
          this.gColor.set(this.gColor() + 1); 
        } 
      } else if (this.selectedColorPosition() === 'b') {
        if (this.bColor() < 255) {
          this.bColor.set(this.bColor() + 1); 
        } 
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

    if (this.selectedAttribute() === 'color') {
      if(this.selectedColorPosition() === 'r') {
        if (this.rColor() > 0) {
          this.rColor.set(this.rColor() - 1); 
        }
      } else if (this.selectedColorPosition() === 'g') {
        if (this.gColor() > 0) {
          this.gColor.set(this.gColor() - 1); 
        } 
      } else if (this.selectedColorPosition() === 'b') {
        if (this.bColor() > 0) {
          this.bColor.set(this.bColor() - 1); 
        } 
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

  setSelectedColorPosition(selected: 'r'|'g'|'b'): void {
    this.selectedColorPosition.set(selected);
  }

  setAmbientLightIntensity(intensity: number): void {
    this.ambientLightIntensity.set(intensity);
  }

  setAmbientLightColor(color: string): void {
    this.ambientLightColor.set(color);
  }

  setSceneColor(color: string): void {
    this.sceneColor.set(color);
  }
}
