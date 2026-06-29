export interface VizInterface {
    index: number;
    showMenu: boolean;
    camera: {
      position: {x: number, y: number, z: number},
      lookAt: {x: number, y: number, z: number}
    },
    rendererBgColor: number
}

export interface VizIndexDictionary {
  [key: number]: VizInterface;
}
