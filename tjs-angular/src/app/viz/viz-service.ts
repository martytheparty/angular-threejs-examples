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
      camera: {
        position: {
          x: -1,
          y: 0,
          z: 0
        },
        lookAt: {
          x: -4,
          y: 0,
          z: 0
        }
      },
      rendererBgColor: 0x000000
    },
    1: {
      index: 1,
      showMenu: false,
      camera: {
        position: {
          x: 0,
          y: 60,
          z: 0
        },
        lookAt: {
          x: 0,
          y: 0,
          z: 0
        }
      },
      rendererBgColor: 0x000000
    }
  };

  getVisualizationData(index: number): VizInterface {
    return this.visualizations[index];
  }
}
