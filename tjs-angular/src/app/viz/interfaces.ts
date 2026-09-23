import * as THREE from 'three';

export interface ThreeGroup {
  name: string;
  group?: THREE.Group;
}

export interface GroupData {
  name: string;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  isAnimated: boolean;
  color?: string;
  eColor?: string;
  eIntensity: number;
  wireframe: boolean;
}

export interface SceneData {
  name: string;
  backgroundColor: string;
}
