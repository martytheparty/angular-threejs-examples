import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StlService {
  exportMesh(mesh: THREE.Mesh, filename: string): void {
    const exporter = new STLExporter();

    const data = exporter.parse(mesh, { binary: true });

    const blob = new Blob([data], {
      type: 'application/octet-stream'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);

  }

importStl(file: File): Promise<THREE.Mesh> {
  const loader = new STLLoader();

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);

    loader.load(
      url,
      (geometry) => {
        URL.revokeObjectURL(url);

        const mesh = new THREE.Mesh(geometry);

        resolve(mesh);
      },
      undefined,
      (error) => {
        URL.revokeObjectURL(url);
        reject(error);
      }
    );
  });
}
}
