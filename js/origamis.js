function createOrigamis() {
    'use strict';

    createFirstOrigami();
    createSecondOrigami();
    createThirdOrigami();
}

function createThirdOrigami() {
    'use strict';

    thirdOrigami = new THREE.Object3D();

    const geometry = new THREE.BufferGeometry();

    const A = (0, 0, -10);
    const _A = (0, 0, 10);
    const B = (-13, 21, 0);
    const C = (29, 0, -2);
    const _C = (29, 0, 2);
    const D = (39, 11, 0);
    const E = (25, 43, -3);
    const _E = (25, 43, 3);
    const F = (29, 45, -1);
    const _F = (29, 45, 1);
    const G = (45, 37, 0);
    const H = (8, 17, 0);
    const I = (14, 0, -6);
    const _I = (14, 0, 6);

    const vertices = new Float32Array([
        0, 0, -10,      // A
        -13, 21, 0,     // B
        8, 17, 0,       // H

        0, 0, -10,      // A
        8, 17, 0,       // H
        14, 0, -6,      // I

        8, 17, 0,       // H
        14, 0, -6,      // I
        29, 0, -2,      // C

        8, 17, 0,       // H
        29, 0, -2,      // C
        39, 11, 0,      // D

        29, 0, -2,      // C
        39, 11, 0,      // D
        25, 43, -3,     // E

        39, 11, 0,      // D
        25, 43, -3,     // E
        29, 45, -1,     // F

        25, 43, -3,     // E
        29, 45, -1,     // F
        45, 37, 0,      // G

        0, 0, 10,       // _A
        -13, 21, 0,     // B
        8, 17, 0,       // H

        0, 0, 10,       // _A
        8, 17, 0,       // H
        14, 0, 6,       // _I

        8, 17, 0,       // H
        14, 0, 6,       // _I
        29, 0, 2,       // _C

        8, 17, 0,       // H
        29, 0, 2,       // _C
        39, 11, 0,      // D

        29, 0, 2,       // _C
        39, 11, 0,      // D
        25, 43, 3,      // _E

        39, 11, 0,      // D
        25, 43, 3,      // _E
        29, 45, 1,      // _F

        25, 43, 3,      // _E
        29, 45, 1,      // _F
        45, 37, 0,      // G
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    const mesh = new THREE.Mesh(geometry, phongOrigami);
    thirdOrigami.add(mesh);
    thirdOrigami.castShadow = true;
    thirdOrigami.receiveShadow = true;

    scene.add(thirdOrigami);
    thirdOrigami.position.set(150, 50, 0);
    origamis.push(thirdOrigami);
}

function createSecondOrigami() {
    'use strict';

    secondOrigami = new THREE.Object3D();

    const geometry = new THREE.BufferGeometry();

    const A = (0, 28, 0);
    const B = (12, 15, 0);
    const _B = (-12, 15, 0);
    const C = (0, 13, 0);
    const _C = (0, 13, -3);
    const D = (10, 10, 3);
    const _D = (-10, 10, 3);
    const E = (0, -38, 0);
    const _E = (0, -38, 0);

    const vertices = new Float32Array([
        0, 28, 0,        // A
        12, 15, 0,       // B
        0, 13, 0,       // C

        0, 28, 0,       // A
        -12, 15, 0,      // _B
        0, 13, 0,       // C

        12, 15, 0,       // B
        0, 13, 0,        // C
        10, 10, 3,      // D

        -12, 15, 0,      // _B
        0, 13, 0,        // C
        -10, 10, 3,     // _D


        10, 10, 3,      // D
        0, 13, 0,        // C
        0, -38, 0,      // E

        -10, 10, 3,     // _D
        0, 13, 0,        // C
        0, -38, 0,      // E

        10, 10, 3,      // D
        0, 13, -3,       // _C
        0, -38, 0,      // _E

        -10, 10, 3,     // _D
        0, 13, -3,       // _C
        0, -38, 0,      // _E

    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    const mesh = new THREE.Mesh(geometry, phongOrigami);
    secondOrigami.add(mesh);
    secondOrigami.castShadow = true;
    secondOrigami.receiveShadow = true;

    scene.add(secondOrigami);
    secondOrigami.position.set(0, 70, 0);
    origamis.push(secondOrigami);
}

function createFirstOrigami() {
    'use strict';

    firstOrigami = new THREE.Object3D();

    const geometry = new THREE.BufferGeometry();

    const A = (25, 25, 0);
    const _A = (-25, -25, 0);
    const B = (0, 25, 0);
    const _B = (0, -25, 0);

    const vertices = new Float32Array([
        25, 25, 0,        // A
        -25, -25, 0,       // _A
        0, 25, 0,       // B

        
        0, -25, 0,       // _B
        25, 25, 0,        // A
        -25, -25, 0,       // _A
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    const mesh = new THREE.Mesh(geometry, phongOrigami);
    firstOrigami.add(mesh);
    firstOrigami.castShadow = true;
    firstOrigami.receiveShadow = true;

    scene.add(firstOrigami);
    firstOrigami.position.set(-150, 60, 0);
    origamis.push(firstOrigami);
}

function createFloor() {
    'use strict';

    floor = new THREE.Object3D();
    
    const geometry = new THREE.BoxGeometry(500, 15, 100);
    const mesh = new THREE.Mesh(geometry, floorMaterial);

    floor.add(mesh);

    addStep(floor, 10, 40);
    addStep(floor, 5, 62.5);

    floor.castShadow = true;
    floor.receiveShadow = true;

    scene.add(floor);
}

function addStep(obj, stepSize, stepDistance) {
    'use strict';

    const geometry = new THREE.BoxGeometry(100, stepSize, 10);
    const mesh = new THREE.Mesh(geometry, floorMaterial);

    obj.add(mesh);
    mesh.position.z = stepDistance;
    mesh.position.y = - stepDistance / 2;
}

function createMaterials() {
    'use strict';

    const loader = new THREE.TextureLoader();
    const origamiTexture = loader.load('../textures/red-origami.jpeg');
    const floorTexture = loader.load('../textures/floor.jpeg');
    const spotlightTexture = loader.load('../textures/metal.jpeg');

    lambertOrigami = new THREE.MeshLambertMaterial({
        color: 0xe2dfd2,
        map: origamiTexture,
        wireframe: false
    });

    phongOrigami = new THREE.MeshPhongMaterial({
        color: 0xe2dfd2,
        map: origamiTexture,
        wireframe: false
    });
    basicOrigami = new THREE.MeshBasicMaterial({
        color: 0xe2dfd2,
        map: origamiTexture,
        wireframe: false
    });

    lambertOrigamiWhiter = new THREE.MeshLambertMaterial({
        map: origamiTexture,
        wireframe: false
    });

    phongOrigamiWhiter = new THREE.MeshPhongMaterial({
        map: origamiTexture,
        wireframe: false
    });

    basicOrigamiWhiter = new THREE.MeshBasicMaterial({
        map: origamiTexture,
        wireframe: false
    });

    floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture,
        wireframe: false
    });

    spotlightMaterial = new THREE.MeshPhongMaterial({
        map: spotlightTexture,
        wireframe: false,
    });
}

function createLights() {
    'use strict';

    spotlight1 = createSpotlight();
    spotlight1.target = firstOrigami;
    spotlight1.castShadow = true;
    scene.add(spotlight1);
    spotlight1.position.set(firstOrigami.position.x, 160, 40);
    spotlight1.shadowDarkness = 1;
    spotlight1.lookAt(firstOrigami.position);

    spotlight2 = createSpotlight();
    spotlight2.target = secondOrigami;
    spotlight2.castShadow = true;
    spotlight2.shadowDarkness = 2;
    scene.add(spotlight2);
    spotlight2.position.set(secondOrigami.position.x, 160, 40);
    spotlight2.lookAt(secondOrigami.position);

    spotlight3 = createSpotlight();
    spotlight3.target = thirdOrigami;
    spotlight3.castShadow = true;
    spotlight3.shadowDarkness = 1;
    scene.add(spotlight3);
    spotlight3.position.set(thirdOrigami.position.x + 10, 160, 40);
    spotlight3.lookAt(thirdOrigami.position);

    directionalLight = new THREE.DirectionalLight();
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 1;
    scene.add(directionalLight); 
}

function createSpotlight() {
    'use strict';

    var spotlight = new THREE.Object3D();

    const sphereGeometry = new THREE.SphereGeometry(4);
    const sphereMesh = new THREE.Mesh(sphereGeometry, spotlightMaterial);

    const coneGeometry = new THREE.ConeGeometry(4, 4);
    const coneMesh = new THREE.Mesh(coneGeometry, spotlightMaterial);

    spotlight.add(sphereMesh);
    spotlight.add(coneMesh);

    coneMesh.rotation.x = - Math.PI / 2;
    coneMesh.position.z = 4;
    
    var light = new THREE.SpotLight();

    spotlight.add(light);
    light.position.x = - 4;

    return spotlight;
}
