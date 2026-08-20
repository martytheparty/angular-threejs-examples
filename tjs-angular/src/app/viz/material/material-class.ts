import * as THREE from 'three';

export class MaterialClass {
    static getList(): string[] {
        return [
        'basic',
        'normal',
        'lambert',
        'phong',
        'standard',
        'physical',
        'toon'
        ];
    }

    // ✅ MeshBasicMaterial
    // ✅ MeshNormalMaterial
    // ✅ MeshLambertMaterial
    // ✅ MeshPhongMaterial
    // ✅ MeshStandardMaterial
    // ✅ MeshPhysicalMaterial
    // MeshToonMaterial

    static getColor(): THREE.ColorRepresentation {
        return 0xFF0000;
    }

    static getBasicMaterial(): THREE.MeshBasicMaterial {
        return new THREE.MeshBasicMaterial({
          color: MaterialClass.getColor(),
          side: THREE.DoubleSide,
          wireframe: false,
          transparent: false,
          opacity: 1,
        });
      }
    
    static getNormalMaterial(): THREE.MeshNormalMaterial {
        return new THREE.MeshNormalMaterial({
          side: THREE.DoubleSide,
          wireframe: true,
          transparent: false,
          opacity: 1,
        });
      }
    
    static  getLambertMaterial(): THREE.MeshLambertMaterial {
        return new THREE.MeshLambertMaterial({
          color: MaterialClass.getColor(),
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
    
      static getPhongMaterial(): THREE.MeshPhongMaterial {
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
    
      static getStandardMaterial(): THREE.MeshStandardMaterial {
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
    
      static getPhysicalMaterial(): THREE.MeshPhysicalMaterial {
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
    
      static getToonMaterial(): THREE.MeshToonMaterial {
    
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
}
