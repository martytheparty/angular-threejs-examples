import * as THREE from 'three';

export interface ThreeGroup {
  name: string;
  group?: THREE.Group;
}

export interface GroupData {
  name: string;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  isAnimated: boolean;
}
