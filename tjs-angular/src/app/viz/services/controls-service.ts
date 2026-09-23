import { 
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { GroupData, ThreeGroup } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  groupName: WritableSignal<string> = signal<string>("");

  selectWireframe: WritableSignal<boolean> = signal<boolean>(false);

  ambientLightIntensity: WritableSignal<number> = signal<number>(1);
  ambientLightColor: WritableSignal<string> = signal<string>("#FFFFFF");
  sceneColor: WritableSignal<string> = signal<string>("#FFFFFF");

  x: WritableSignal<number> = signal<number>(0);
  y: WritableSignal<number> = signal<number>(0);
  z: WritableSignal<number> = signal<number>(0);

  animationRotationX: WritableSignal<number> = signal<number>(0);
  animationRotationY: WritableSignal<number> = signal<number>(0);
  animationRotationZ: WritableSignal<number> = signal<number>(0);

  xPosition: WritableSignal<number> = signal<number>(0);
  yPosition: WritableSignal<number> = signal<number>(0);
  zPosition: WritableSignal<number> = signal<number>(0);

  rColor: WritableSignal<number> = signal<number>(0);
  gColor: WritableSignal<number> = signal<number>(0);
  bColor: WritableSignal<number> = signal<number>(0);

  erColor: WritableSignal<number> = signal<number>(0);
  egColor: WritableSignal<number> = signal<number>(0);
  ebColor: WritableSignal<number> = signal<number>(0);
  eIntensity: WritableSignal<number> = signal<number>(0);

  selected: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');
  selectedPosition: WritableSignal<'x'|'y'|'z'> = signal<'x'|'y'|'z'>('x');
  selectedColorPosition: WritableSignal<'r'|'g'|'b'> = signal<'r'|'g'|'b'>('r');

  selectedAttribute: WritableSignal<'rotation'|'position'|'color'> = signal<'rotation'|'position'>('rotation');

  selectedMeshSignal: WritableSignal<string> = signal<string>("");
  selectedMesh: string = "";

  selectedMaterialSignal: WritableSignal<string> = signal<string>("");
  selectedMaterial: string = "";

  groups: WritableSignal<ThreeGroup[]> = signal<ThreeGroup[]>([]);

  reset(userData: GroupData): void {
    this.groupName.set(userData.name);
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

    if (userData.eColor) {
      let eColor = userData.eColor as string;

      if (eColor.length !== 7) {
        eColor = "#FFFFFF";
      }
      
      this.erColor.set(parseInt(eColor.substring(1,3),16));
      this.egColor.set(parseInt(eColor.substring(3,5),16));
      this.ebColor.set(parseInt(eColor.substring(5,7),16));
    }

    this.eIntensity.set(userData.eIntensity);
    this.animationRotationX.set(userData.animationRotationX);
    this.animationRotationY.set(userData.animationRotationY);
    this.animationRotationZ.set(userData.animationRotationZ);
    this.selectWireframe.set(userData.wireframe);
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

  setX(newX: number): void {
    this.x.set(newX);
  }

  setY(y: number): void {
    this.y.set(y);
  }

  setZ(z: number): void {
    this.z.set(z);
  }

  setAnimationX(newX: number): void {
    this.animationRotationX.set(newX);
  }

  setAnimationY(y: number): void {
    this.animationRotationY.set(y);
  }

  setAnimationZ(z: number): void {
    this.animationRotationZ.set(z);
  }

  setXPosition(newX: number): void {
    this.xPosition.set(newX);
  }

  setYPosition(y: number): void {
    this.yPosition.set(y);
  }

  setZPosition(z: number): void {
    this.zPosition.set(z);
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

  setRColor(color: number): void {
    this.rColor.set(color);
  }

  setGColor(color: number): void {
    this.gColor.set(color);
  }

  setBColor(color: number): void {
    this.bColor.set(color);
  }

  setERColor(color: number): void {
    this.erColor.set(color);
  }

  setEGColor(color: number): void {
    this.egColor.set(color);
  }

  setEBColor(color: number): void {
    this.ebColor.set(color);
  }

  setEIntensity(intensity: number): void {
    this.eIntensity.set(intensity);
  }
}
