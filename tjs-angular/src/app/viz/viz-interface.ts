export interface VizInterface {
    index: number;
    showMenu: boolean;
    camera: { 
      position: {x: number, y: number, z: number},
      lookat: {x: number, y: number, z: number}
    }
}

export interface VizIndexDictionary {
  [key: number]: VizInterface;
}
