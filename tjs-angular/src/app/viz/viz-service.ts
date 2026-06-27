import { Injectable } from '@angular/core';
import { VizIndexDictionary, VizInterface } from './viz-interface';

@Injectable({
  providedIn: 'root',
})
export class VizService {
  visualizations: VizIndexDictionary = {
    0: {
      index: 0,
      showMenu: true,
      cameraXPosition: -1,
      cameraYPosition: 0,
      cameraZPosition: 0,
      cameraXLookAt: -4,
      cameraYLookAt: 0,
      cameraZLookAt: 0
    },
    1: {
      index: 1,
      showMenu: false,
      cameraXPosition: 0,
      cameraYPosition: 0,
      cameraZPosition: 10,
      cameraXLookAt: 0,
      cameraYLookAt: 0,
      cameraZLookAt: 0
    }
  };

  getVisualizationData(index: number): VizInterface {
    return this.visualizations[index];
  }
}
