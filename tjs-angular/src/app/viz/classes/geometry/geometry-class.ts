import * as THREE from 'three';


// Geometry categories used by this platform:
//
// 1. Self-contained
//    Geometry can be created from its own parameters.
// Self-contained geometries
//   Box
//   Sphere
//   Cylinder
//   Cone
//   Plane
//   Circle
//   Ring
//   Torus
//   TorusKnot
//   Capsule
//   Polyhedra
//
// 2. Dependent
//    Geometry requires another geometric concept,
//    such as a Curve or Shape.
//
// 3. Compound
//    Geometry is constructed from multiple geometric
//    components or operations.

export class GeometryClass {
    static getList(): string[] {
        return [
        'box',
        'sphere',
        'capsule',
        // 'torus',
        // 'torusKnot',
        // 'tube',
        // 'gear',
        // 'star',
        // 'square'
        ];
    }

    // Self Contained Geometries

    static getBoxGeometry(
        width : number = 1, 
        height: number = 1, 
        depth: number = 1,
        widthSegments: number = 32,
        depthSegments: number = 32,
        center: boolean = true,
    ): THREE.BoxGeometry {
        const geometry = new THREE.BoxGeometry(
            width,   
            height,
            depth,
            widthSegments,
            depthSegments
        );

        if (center) {
            geometry.center();
        }

        return geometry;
    }

    static getCapsuleGeometry(
        radius : number = 1, 
        height: number = 1, 
        capSegments: number = 4,
        radialSegments: number = 8,
        heightSegments: number = 32,
        center: boolean = true,
    ): THREE.CapsuleGeometry {
        const geometry = new THREE.CapsuleGeometry(
            radius,   
            height,
            capSegments,
            heightSegments
        );

        if (center) {
            geometry.center();
        }

        return geometry;
    }

    static getSphereGeometry(
        radius: number = 1,
        segmentWidth: number = 32,
        segmentHeight: number = 32,
        center: boolean = true
    ): THREE.SphereGeometry 
    {
        const geometry = new THREE.SphereGeometry(
            radius,   // radius
            segmentWidth,  // width segments
            segmentHeight,  // height segments
        );

        if (center) {
            geometry.center();
        }

        return geometry;
    } ;
}
