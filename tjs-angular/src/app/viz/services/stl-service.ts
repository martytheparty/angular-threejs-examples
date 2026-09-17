import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

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
}
