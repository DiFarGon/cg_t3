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
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    thirdOrigami.add(mesh);

    scene.add(thirdOrigami);
    thirdOrigami.position.set(150, 75, 0);
    origamis.push(thirdOrigami);
}

function createSecondOrigami() {
    'use strict';

    secondOrigami = new THREE.Object3D();

    const geometry = new THREE.BufferGeometry();

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
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    secondOrigami.add(mesh);

    scene.add(secondOrigami);
    secondOrigami.position.set(0, 90, 0);
    origamis.push(secondOrigami);
}

function createFirstOrigami() {
    'use strict';

    firstOrigami = new THREE.Object3D();

    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        -25, 0, -1,     // A
        0, 25, 1,       // B
        0, -25, 1,      // C

        25, 0, -1,      // _A
        0, 25, 1,       // B
        0, -25, 1,      // C

    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    const mesh = new THREE.Mesh(geometry, phongOrigami);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    firstOrigami.add(mesh);

    scene.add(firstOrigami);
    firstOrigami.position.set(-150, 90, 0);
    origamis.push(firstOrigami);
}

function createStage() {
    'use strict';

    stage = new THREE.Object3D();
    
    const x = 500;
    const y = 30;
    const z = 300;
    const stepHeight = y / 3;
    const stepWidth = 20;
    const stepLength = 50;
    
    const geometry = new THREE.BoxGeometry(x, y, z);
    const mesh = new THREE.Mesh(geometry, phongStage);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    stage.add(mesh);

    addStep(stage, - (y / 6), stepLength, (2 * stepHeight), stepWidth, (z / 2) + (stepHeight / 2));
    addStep(stage, - (y / 3), stepLength, stepHeight, stepWidth, (z / 2) + stepHeight + (stepHeight / 2));

    scene.add(stage);
    stage.position.y = y / 2;
}

function addStep(obj, stepCenter, stepLength, stepHeight, stepWidth, stepDistance) {
    'use strict';

    const geometry = new THREE.BoxGeometry(stepLength, stepHeight, stepWidth);
    const mesh = new THREE.Mesh(geometry, phongStage);

    obj.add(mesh);
    mesh.position.z = stepDistance;
    mesh.position.y = stepCenter;
    mesh.receiveShadow = true;
}

function createFloor() {
    'use strict';

    floor = new THREE.Object3D();

    const geometry = new THREE.PlaneGeometry(10000, 10000);
    const mesh = new THREE.Mesh(geometry, floorMaterial);
    mesh.receiveShadow = true;
    
    floor.add(mesh);
    scene.add(floor);
    floor.rotation.x = Math.PI / 2;
}

function createMaterials() {
    'use strict';

    const loader = new THREE.TextureLoader();
    const origamiTexture = loader.load('../textures/red-origami.jpeg');
    origamiTexture.wrapS = THREE.RepeatWrapping;
    origamiTexture.wrapT = THREE.RepeatWrapping;
    origamiTexture.repeat.set(100, 100);

    const stageTexture = loader.load('../textures/stage.jpeg');
    const spotlightTexture = loader.load('../textures/metal.jpeg');

    const floorTexture = loader.load('../textures/floor.jpeg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(200, 200);

    lambertOrigami = new THREE.MeshLambertMaterial({
        color: 0xe2dfd2,
        map: origamiTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    phongOrigami = new THREE.MeshPhongMaterial({
        color: 0xe2dfd2,
        map: origamiTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });
    basicOrigami = new THREE.MeshBasicMaterial({
        color: 0xe2dfd2,
        map: origamiTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    lambertOrigamiWhiter = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: origamiTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    phongOrigamiWhiter = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: origamiTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    basicOrigamiWhiter = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: origamiTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    phongStage = new THREE.MeshPhongMaterial({
        map: stageTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    lambertStage = new THREE.MeshLambertMaterial({
        map: stageTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    basicStage = new THREE.MeshBasicMaterial({
        map: stageTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    spotlightMaterial = new THREE.MeshPhongMaterial({
        map: spotlightTexture,
        wireframe: false,
        side: THREE.DoubleSide
    });

    floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture,
        wireframe: false,
        side: THREE.DoubleSide
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
    spotlight3.position.set(thirdOrigami.position.x, 160, 40);
    spotlight3.lookAt(thirdOrigami.position);

    directionalLight = new THREE.DirectionalLight();
    directionalLight.position.set(0, 500, 500);
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

function createPauseMessage() {
    'use strict';

    var pause = new THREE.Object3D();

    const loader = new THREE.TextureLoader();
    const pauseTexture = loader.load('../textures/pause.jpeg');

    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({
        map: pauseTexture,
    });

    const mesh = new THREE.Mesh(geometry, material);

    pause.add(mesh);
    pauseScene.add(pause);
}
