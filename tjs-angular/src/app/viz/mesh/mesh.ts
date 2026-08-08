import * as THREE from 'three';

export class MeshClass {
    getList(): string[] {
        return [
            'candlestick',
            'tube',
            'gear'
        ];
    }

  getMeshFunction(meshName: string): () => THREE.Mesh {
    if (meshName === 'candlestick') {
      return this.getLatheCandleStick
    }

    if (meshName === 'tube') {
      return this.getTubeMesh;
    }

    if (meshName === 'gear') {
      return this.getGearMesh;
    }



    return this.getLatheCandleStick;

  }

   getTubeMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 3, 0),
    ]);
    const geometry = new THREE.TubeGeometry(
      curve,
      32, // tubular segments
      1, // radius
      64, // radial segments
      false, // closed
    );

    geometry.center();

    return new THREE.Mesh(geometry, material);
  }

  getGearMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const gear = new THREE.Shape();

    const teeth = 10;
    const outerRadius = 1.8;
    const rootRadius = 1.1;

    const segmentsPerTooth = 6;

    for (let i = 0; i < teeth * segmentsPerTooth; i++) {
      const segment = i % segmentsPerTooth;

      let radius: number;

      switch (segment) {
        case 0: // valley before tooth
          radius = rootRadius;
          break;

        case 1: // outside edge
          radius = outerRadius;
          break;

        case 2: // flat top of tooth
          radius = outerRadius;
          break;

        case 3: // falling edge
          radius = rootRadius;
          break;

        default:
          radius = rootRadius;
      }

      const angle = (i / (teeth * segmentsPerTooth)) * Math.PI * 2 - Math.PI / 2;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        gear.moveTo(x, y);
      } else {
        gear.lineTo(x, y);
      }
    }

    gear.closePath();

    // const geometry = new THREE.ShapeGeometry(gear);
    const geometry = new THREE.ExtrudeGeometry(gear, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
    });

    geometry.center();

    return new THREE.Mesh(geometry, material);
  }

  getStarMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const star = new THREE.Shape();

    const outerRadius = 3;
    const innerRadius = 1.4;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        star.moveTo(x, y);
      } else {
        star.lineTo(x, y);
      }
    }

    star.closePath();

    const geometry = new THREE.ExtrudeGeometry(star, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
    });
    geometry.center();

    return new THREE.Mesh(geometry, material);
  }

  getTriangeMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const square = new THREE.Shape();
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(1, 2);
    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  getSquareMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const square = new THREE.Shape();
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(2, 2);
    square.lineTo(0, 2);
    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  getMidleMesh(offset: number): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const square = new THREE.Shape();
    const xLength = 2; // this is the total length
    const middleX = xLength / 2; // this is the middle
    const startX = 0; //this is the first spot
    const endX = xLength;
    //    const distance = (xLength - middleX)/(position + 1); // this is how far (displacement) the point should be from the end.
    const firstX = startX + offset;
    const lastX = endX - offset;
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(lastX, 2);
    square.lineTo(firstX, 2);

    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  getShrinkingHelixMesh(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const curve = this.getShrinkingHelixCurve();

    const geometry = new THREE.TubeGeometry(curve, 256, 0.08, 16, false);

    return new THREE.Mesh(geometry, material);
  }

  getShrinkingHelixCurve(): THREE.CatmullRomCurve3 {
    const points: THREE.Vector3[] = [];

    const turns = 8;
    const stepsPerTurn = 32;

    const startRadius = 2.0;
    const endRadius = 0.2;
    const height = 6;

    const totalSteps = turns * stepsPerTurn;

    for (let i = 0; i <= totalSteps; i++) {
      const t = i / totalSteps;

      const angle = t * turns * Math.PI * 2;

      // Radius shrinks linearly
      const radius = startRadius * (1 - t) + endRadius * t;

      const x = radius * Math.cos(angle);
      const y = height * (t - 0.5);
      const z = radius * Math.sin(angle);

      points.push(new THREE.Vector3(x, y, z));
    }

    return new THREE.CatmullRomCurve3(points);
  }

  getSimpleTwoLathe(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const latheWidth = 1;
    const latheHeight = 1;

    const points: THREE.Vector2[] = [
      new THREE.Vector2(latheWidth + 1, 0),
      new THREE.Vector2(latheWidth, latheHeight),
    ];

    const geometry = new THREE.LatheGeometry(points, 64);
    geometry.center();

    return new THREE.Mesh(geometry, material);
  }

  getLatheCandleStick(): THREE.Mesh {
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
    });

    const points: THREE.Vector2[] = [
      // Base
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.2, 0.0),
      new THREE.Vector2(1.1, 0.15),
      new THREE.Vector2(0.9, 0.25),

      // Stem
      new THREE.Vector2(0.35, 0.5),
      new THREE.Vector2(0.3, 2.5),

      // Decorative ring
      new THREE.Vector2(0.55, 2.7),
      new THREE.Vector2(0.35, 2.9),

      // Candle cup
      new THREE.Vector2(0.7, 3.2),
      new THREE.Vector2(0.8, 3.5),
      new THREE.Vector2(0.55, 3.75),
      new THREE.Vector2(0.45, 4.1),

      // Center point to close the top
      new THREE.Vector2(0.3, 3.0),
      new THREE.Vector2(0.0, 3.0),
    ];

    const geometry = new THREE.LatheGeometry(points, 64);
    geometry.center();

    return new THREE.Mesh(geometry, material);
  }   
}
