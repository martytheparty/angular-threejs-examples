export interface VizInterface {
    index: number;
    showMenu: boolean;
    cameraXPosition: number;
    cameraYPosition: number;
    cameraZPosition: number; 
    cameraXLookAt: number;
    cameraYLookAt: number;
    cameraZLookAt: number; 
}

export interface VizIndexDictionary {
  [key: number]: VizInterface;
}
