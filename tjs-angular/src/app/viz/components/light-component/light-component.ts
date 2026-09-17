import { 
  Component,
  effect,
  inject,
  TemplateRef,
  viewChild
} from '@angular/core';
import { ControlsService } from '../../services/controls-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SceneService } from '../../services/scene-service';

import * as THREE from 'three';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-light-component',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './light-component.html',
  styleUrl: './light-component.scss',
})
export class LightComponent {
  controlsService: ControlsService = inject(ControlsService);
  sceneService: SceneService = inject(SceneService);
  private dialog = inject(MatDialog);

  private toJson = viewChild.required<TemplateRef<unknown>>('toJson');
  private fromJson = viewChild.required<TemplateRef<unknown>>('fromJson');

  // TODO: Scene BG Color got in here.  It needs to be moved into its own scene panel.


  updateAmbientIntensity(intensity: number): void {
    this.controlsService.setAmbientLightIntensity(intensity);
  }

  updateAmbientColor(red: number, green: number, blue: number): void {
    const color = `#${this.toHex(red)}${this.toHex(green)}${this.toHex(blue)}`;
    this.controlsService.setAmbientLightColor(color);
  }

  updateSceneColor(red: number, green: number, blue: number): void {
    const color = `#${this.toHex(red)}${this.toHex(green)}${this.toHex(blue)}`;
    this.controlsService.setSceneColor(color);
  }

  toHex(value: number): string {
      return value.toString(16).padStart(2, '0');
  }

  fromHex(value: string): number {
    return parseInt(value, 16);
  }

  getColor(color: 'red' | 'green' | 'blue', value: string): number {
    console.log("value", value);
    let colorValue = 100;
    if (color === 'red') {
      const redColor = value.substring(1,3);
      colorValue = this.fromHex(redColor);
    } else if (color === 'green') {
      const greenColor = value.substring(3,5);
      colorValue = this.fromHex(greenColor);
    } else if (color === 'blue') {
      const blueColor = value.substring(5,7);
      colorValue = this.fromHex(blueColor);
    }
    return colorValue;
  }

  addSceneFromJson(sceneElement: HTMLTextAreaElement) {
    const json = sceneElement.value;

    const loader = new THREE.ObjectLoader();
    const scene = loader.parse(JSON.parse(json)) as THREE.Scene;
    this.sceneService.importScene(scene);
    this.updateSceneData(scene);
    this.dialog.closeAll();

  }

  updateSceneData(scene: THREE.Scene) {
    console.log("SCENE DATA", scene);

  }

  exportScene(): void {
    const scene: THREE.Scene = this.sceneService.scene;

    const json = JSON.stringify(scene.toJSON(), null, 2);

    navigator.clipboard.writeText(json);

    this.dialog.open(this.toJson(), {
      data: {
        json: scene.toJSON()
      }
    });
  }

  importScene(): void {
    this.dialog.open(this.fromJson());
  }


}
