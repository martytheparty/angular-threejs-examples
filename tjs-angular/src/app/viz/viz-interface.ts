export interface VizInterface {
    index: number;
    showMenu: boolean;
    cameraXPosition: number;
    cameraYPosition: number;
    cameraZPosition: number; 
}

export interface VizIndexDictionary {
  [key: number]: VizInterface;
}
