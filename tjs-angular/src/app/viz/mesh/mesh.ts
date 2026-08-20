import * as THREE from 'three';
import { GeometryClass } from '../geometry/geometry-class';

export class MeshClass {
  GeometryClass = GeometryClass;

  static getList(): string[] {
        return [
            'box',
            'capsule',
            'sphere',
            'candlestick',
            'tube',
            'gear',
            'star',
            'square',
            'shrinking helix',
            'triangle',
            '2lathe'
        ];
    }

  getMeshFunction(meshName: string): () => THREE.Mesh {
    if (meshName === 'sphere') {
      return this.getSphereMesh.bind(this);
    }

    if (meshName === 'candlestick') {
      return this.getLatheCandleStickMesh.bind(this);
    }

    if (meshName === 'tube') {
      return this.getTubeMesh.bind(this);
    }

    if (meshName === 'gear') {
      return this.getGearMesh.bind(this);
    }

    if (meshName === 'star') {
      return this.getStarMesh.bind(this);
    }

    if (meshName === 'square') {
      return this.getSquareMesh.bind(this);
    }

    if (meshName === 'shrinking helix') {
      return this.getShrinkingHelixMesh.bind(this);
    }

    if (meshName === 'triangle') {
      return this.getTriangleMesh.bind(this);
    }

    if (meshName === '2lathe') {
      return this.getSimpleTwoLathe.bind(this);
    }

    if (meshName === 'box') {
      return this.getBoxMesh.bind(this);
    }

    if (meshName === 'capsule') {
      return this.getCapsuleMesh.bind(this);
    }

    return this.getLatheCandleStickMesh;
  }

  getMaterial(): THREE.Material {
    return this.getToonMaterial();
  }

// ✅ MeshBasicMaterial
// ✅ MeshNormalMaterial
// ✅ MeshLambertMaterial
// ✅ MeshPhongMaterial
// ✅ MeshStandardMaterial
// ✅ MeshPhysicalMaterial
// MeshToonMaterial

  getBasicMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      color: this.getColor(),
      side: THREE.DoubleSide,
      wireframe: false,
      transparent: false,
      opacity: 1,
    });
  }

  getNormalMaterial(): THREE.MeshNormalMaterial {
    return new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
      wireframe: true,
      transparent: false,
      opacity: 1,
    });
  }

  getLambertMaterial(): THREE.MeshLambertMaterial {
    return new THREE.MeshLambertMaterial({
      color: this.getColor(),
      emissive: 0x000000, // can't be demonstrated without other object
      emissiveIntensity: 1, // can't be demonstrated without other object
      flatShading: false, // can't be demonstrated without other objects and directional light (need shadows)
      fog: true, // can only be tested with scene
      wireframe: false,
      transparent: false,
      opacity: 1,
      side: THREE.DoubleSide,
      depthTest: true, // You need at least two objects whose rendered surfaces overlap from the camera's point of view.
      depthWrite: true, // You need at least two objects whose rendered surfaces overlap from the camera's point of view.
      alphaTest: 0, // You need a PNG surface that has pixels with an alpha less than the value here.  Then that pixel would be clear.
      dithering: false, // ??
      toneMapped: true, // ??
    });
  }

  getPhongMaterial(): THREE.MeshPhongMaterial {
      return new THREE.MeshPhongMaterial({
        color: this.getColor(),

        emissive: 0x000000, // material self-emission; does not illuminate other objects
        emissiveIntensity: 1, // controls the strength of emissive color

        specular: 0x111111, // requires directional/point/spot light to see the highlight
        shininess: 30, // controls the size/sharpness of the specular highlight

        flatShading: false, // most visible with directional/point/spot lighting
        fog: true, // can only be tested with scene.fog

        wireframe: false,

        transparent: false,
        opacity: 1,

        side: THREE.DoubleSide,

        depthTest: true, // requires overlapping objects to demonstrate
        depthWrite: true, // requires overlapping objects to demonstrate

        alphaTest: 0, // requires texture pixels with varying alpha values
        dithering: false, // useful for subtle color/alpha gradients
        toneMapped: true, // relevant when using HDR/high-dynamic-range rendering
    });
  }

  getStandardMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: this.getColor(),

      roughness: 1, // 0 = very smooth/shiny, 1 = very rough
      metalness: 0, // 0 = non-metal, 1 = metallic

      emissive: 0x000000, // material self-emission; does not illuminate other objects
      emissiveIntensity: 1, // controls emissive strength

      flatShading: false, // more apparent with directional/point/spot lighting
      fog: true, // can only be tested with scene.fog

      wireframe: false,

      transparent: false,
      opacity: 1,

      side: THREE.DoubleSide,

      depthTest: true, // requires overlapping objects to demonstrate
      depthWrite: true, // requires overlapping objects to demonstrate

      alphaTest: 0, // requires texture pixels with varying alpha values
      dithering: false, // useful for subtle color/alpha gradients
      toneMapped: true, // relevant with HDR/high-dynamic-range rendering
    });
  }

  getPhysicalMaterial(): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color: this.getColor(),

      // StandardMaterial properties.
      // Much more meaningful with directional/point/spot lighting
      // and/or environment reflections.
      roughness: 1,
      metalness: 0,

      // Material appears to emit light but does not illuminate other objects.
      emissive: 0x000000,
      emissiveIntensity: 1,

      // Adds a glossy clear-coat layer over the base material.
      // Great for car paint, varnished surfaces, etc.
      // Requires meaningful lighting/reflections to see clearly.
      clearcoat: 0,
      clearcoatRoughness: 0,

      // Simulates a soft sheen on materials such as fabric.
      // Requires appropriate lighting to demonstrate.
      sheen: 0,
      sheenColor: 0x000000,
      sheenRoughness: 1,

      // Simulates thin-film interference.
      // Useful for soap bubbles, oil films, etc.
      // Requires appropriate lighting/environment to see clearly.
      iridescence: 0,
      iridescenceIOR: 1.3,

      // Simulates light transmission through the material.
      // Requires transparency and an appropriate scene/environment.
      // Best demonstrated with glass, water, wax, etc.
      transmission: 0,
      thickness: 0,

      // Index of refraction.
      // Only meaningful when transmission/refraction is being demonstrated.
      ior: 1.5,

      // Controls absorption of transmitted light.
      // Requires transmission and non-zero thickness.
      attenuationColor: 0xffffff,
      attenuationDistance: Infinity,

      // Much more apparent with directional/point/spot lighting.
      flatShading: false,

      // Requires scene.fog.
      fog: true,

      // Can be demonstrated with a single object.
      wireframe: false,

      // Requires alpha/transparency setup to demonstrate.
      transparent: false,
      opacity: 1,

      side: THREE.DoubleSide,

      // Requires multiple overlapping objects to demonstrate.
      depthTest: true,
      depthWrite: true,

      // Requires texture data containing varying alpha values.
      alphaTest: 0,

      // More meaningful with subtle color/alpha gradients.
      dithering: false,

      // More meaningful with HDR/high-dynamic-range rendering.
      toneMapped: true,
    });
  }

  getToonMaterial(): THREE.MeshToonMaterial {

  const gradientMap = new THREE.DataTexture(
    new Uint8Array([
       0,   0,   0, 255,   // dark
     128, 128, 128, 255,   // middle
     255, 255, 255, 255    // bright
    ]),
    3,
    1,
    THREE.RGBAFormat
  );

  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.needsUpdate = true;

  return new THREE.MeshToonMaterial({
    color: this.getColor(),

    // Controls how much the material is affected by lighting.
    // Toon shading uses discrete lighting bands rather than smooth shading.
    gradientMap: gradientMap, // Optional texture controlling the toon shading steps.

    // Material self-emission; does not illuminate other objects.
    emissive: 0x000000,
    emissiveIntensity: 1,

    // Requires scene.fog.
    fog: true,

    wireframe: false,

    transparent: false,
    opacity: 1,

    side: THREE.DoubleSide,

    // Requires multiple overlapping objects to demonstrate.
    depthTest: true,
    depthWrite: true,

    // Requires texture data containing varying alpha values.
    alphaTest: 0,

    // More meaningful with subtle color/alpha gradients.
    dithering: false,

    // More meaningful with HDR/high-dynamic-range rendering.
    toneMapped: true,
  });
}

  getColor(): THREE.ColorRepresentation {
    return 0xFF0000;
  }

  // ✅ 
  getBoxMesh(): THREE.Mesh {
    const geometry = GeometryClass.getBoxGeometry();

    return new THREE.Mesh(geometry, this.getMaterial());
  }

    // ✅ 
  getCapsuleMesh(): THREE.Mesh {
    const geometry = GeometryClass.getCapsuleGeometry();

    return new THREE.Mesh(geometry, this.getMaterial());
  }

  // ✅ 
  getSphereMesh(): THREE.Mesh {
    const geometry = GeometryClass.getSphereGeometry();

    return new THREE.Mesh(geometry, this.getMaterial());
  }

   getTubeMesh(): THREE.Mesh {


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

    return new THREE.Mesh(geometry, this.getMaterial());
  }

  getGearMesh(): THREE.Mesh {

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

    return new THREE.Mesh(geometry, this.getMaterial());
  }

  getStarMesh(): THREE.Mesh {


    const star = new THREE.Shape();

    const outerRadius = 1.8;
    const innerRadius = 1;
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

    return new THREE.Mesh(geometry, this.getMaterial());
  }

  getTriangleMesh(): THREE.Mesh {
    const triangle = new THREE.Shape();
    triangle.moveTo(0, 0);
    triangle.lineTo(2, 0);
    triangle.lineTo(1, 2);
    triangle.closePath();
    const geometry = new THREE.ShapeGeometry(triangle);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, this.getMaterial());

    return mesh;
  }

  getSquareMesh(): THREE.Mesh {
    const square = new THREE.Shape();
    square.moveTo(0, 0);
    square.lineTo(2, 0);
    square.lineTo(2, 2);
    square.lineTo(0, 2);
    square.closePath();
    const geometry = new THREE.ShapeGeometry(square);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, this.getMaterial());

    return mesh;
  }


  getShrinkingHelixMesh(): THREE.Mesh {

    const curve = this.getShrinkingHelixCurve();

    const geometry = new THREE.TubeGeometry(curve, 256, 0.08, 16, false);

    return new THREE.Mesh(geometry, this.getMaterial());
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

    const latheWidth = 1;
    const latheHeight = 1;

    const points: THREE.Vector2[] = [
      new THREE.Vector2(latheWidth + 1, 0),
      new THREE.Vector2(latheWidth, latheHeight),
    ];

    const geometry = new THREE.LatheGeometry(points, 64);
    geometry.center();

    return new THREE.Mesh(geometry, this.getMaterial());
  }

  getLatheCandleStickMesh(): THREE.Mesh {


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

    return new THREE.Mesh(geometry, this.getMaterial());
  }   
}
