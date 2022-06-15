// group 23

var dullMaterial, brightMaterial, basicMaterial;
var dullMaterialWhiter, brightMaterialWhiter, basicMaterialWhiter;
var firstOrigami, secondOrigami, thirdOrigami;
const origamis = [];
var floor;
var renderer, scene, camera, camera1, camera2, camera3;
var firstRotationVelocity = 0, secondRotationVelocity = 0, thirdRotationVelocity = 0;
var shading = true, shadingPhong = true, materialChange = false;
const camFactor = 5;

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    update();

    render();

    requestAnimationFrame(animate);
}

function update() {
    'use strict';

    // origami rotation commands
    if (firstRotationVelocity) {
        firstOrigami.rotation.y += firstRotationVelocity
    }
    if (secondRotationVelocity) {
        secondOrigami.rotation.y += secondRotationVelocity
    }
    if (thirdRotationVelocity) {
        thirdOrigami.rotation.y += thirdRotationVelocity
    }

    if (materialChange) {
        if (shading) {
            if (shadingPhong) {
                origamis.forEach(function(origami) {
                    origami.children.forEach(function(mesh) {
                        mesh.material = brightMaterial;
                    });
                })
            } else {
                origamis.forEach(function(origami) {
                    origami.children.forEach(function(mesh) {
                        mesh.material = dullMaterial;
                    });
                });
            }
        } else {
            origamis.forEach(function(origami) {
                origami.children.forEach(function(mesh) {
                    mesh.material = basicMaterial;
                });
            });
        }
        materialChange = false;
    }
}

function render() {
    'use strict';

    renderer.render(scene, camera);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        // camera 1 - perspective projection
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();

        // camera 2 - orthographic projection
        camera2.left = - window.innerWidth / camFactor;
        camera2.right = window.innerWidth / camFactor;
        camera2.top = window.innerHeight / camFactor;
        camera2.bottom = - window.innerHeight / camFactor;
        camera2.updateProjectionMatrix();
    }
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        // origami rotation
        case 81: // Q
            firstRotationVelocity = -0.1;
            break;
        case 87: // W
            firstRotationVelocity = 0.1;
            break;
        case 69: // E
            secondRotationVelocity = -0.1;
            break;
        case 82: // R
            secondRotationVelocity = 0.1;
            break;
        case 84: // T
            thirdRotationVelocity = -0.1;
            break;
        case 89: // Y
            thirdRotationVelocity = 0.1;
            break;
    }
}

function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
        // origami rotation 
        case 81: // Q
        case 87: // W
            firstRotationVelocity = 0;
            break;
        case 69: // E
        case 82: // R
            secondRotationVelocity = 0;
            break;
        case 84: // T
        case 89: // Y
            thirdRotationVelocity = 0;
            break;

        case 65: // A
            materialChange = true;
            shadingPhong = !shadingPhong;
            break;
        case 83: // S
            materialChange = true;
            shading = !shading;
            break;

        case 68: // D
            break;
        case 90: // Z
            break;
        case 88: // X
            break;
        case 67: // C
            break;

        case 49: // 1
            camera = camera1;
            break;
        case 50: // 2
            camera = camera2;
            break;
    }
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();;
    
    createMaterials();
    createOrigamis();
    createFloor();
    createLights();

}

function createMaterials() {
    'use strict';

    dullMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true
    });

    brightMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true
    });
    basicMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });

    dullMaterialWhiter = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true
    });

    brightMaterialWhiter = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true
    });

    basicMaterialWhiter = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });
}

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

    const vertices = new Float32Array([
        0, 0, -10,      // A
        - 13, 21, 0,    // B
        29, 0, -2,      // C

        - 13, 21, 0,    // B
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
        - 13, 21, 0,    // B
        29, 0, 2,       // _C

        -13, 21, 0,     // B
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
    
    const mesh = new THREE.Mesh(geometry, basicMaterial);
    thirdOrigami.add(mesh);

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
    const E = (0, -38, 6);
    const _E = (0, -38, -3);

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
        0, -38, 6,      // E

        -10, 10, 3,     // _D
        0, 13, 0,        // C
        0, -38, 6,      // E

        10, 10, 3,      // D
        0, 13, -3,       // _C
        0, -38, -1,      // _E

        -10, 10, 3,     // _D
        0, 13, -3,       // _C
        0, -38, -1,      // _E

    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const mesh = new THREE.Mesh(geometry, basicMaterial);
    secondOrigami.add(mesh);

    scene.add(secondOrigami);
    secondOrigami.position.set(0, 70, 0);
    origamis.push(secondOrigami);
}

function createFirstOrigami() {
    'use strict';

    firstOrigami = new THREE.Object3D();

    const geometry = new THREE.BufferGeometry();

    const A = (25, 25, 0);
    const _A = (-25, 25, 0);
    const B = (0, 25, 0);
    const _B = (0, -25, 0);

    const vertices = new Float32Array([
        25, 25, 0,        // A
        -25, 25, 0,       // _A
        0, 25, 0,       // B

        
        0, -25, 0,       // _B
        25, 25, 0,        // A
        -25, 25, 0,       // _A


    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const mesh = new THREE.Mesh(geometry, basicMaterial);
    firstOrigami.add(mesh);

    scene.add(firstOrigami);
    firstOrigami.position.set(-150, 60, 0);
    origamis.push(firstOrigami);
}

function createFloor() {
    'use strict';

    floor = new THREE.Object3D();
    
    const geometry = new THREE.BoxGeometry(500, 15, 100);
    const mesh = new THREE.Mesh(geometry, basicMaterial);

    floor.add(mesh);

    addStep(floor, 10, 40);
    addStep(floor, 5, 62.5);

    scene.add(floor);
}

function addStep(obj, stepSize, stepDistance) {
    'use strict';

    const geometry = new THREE.BoxGeometry(100, stepSize, 10);
    const mesh = new THREE.Mesh(geometry, basicMaterial);

    obj.add(mesh);
    mesh.position.z = stepDistance;
    mesh.position.y = - stepDistance / 2;
} 

function createLights() {
    'use strict';

    var spotlight1 = createSpotlight();
    scene.add(spotlight1);
    spotlight1.position.set(firstOrigami.position.x, 160, -20);
    spotlight1.lookAt(firstOrigami.position);
    spotlight1.add(new THREE.AxesHelper(100));
}

function createSpotlight() {
    'use strict';

    var spotlight = new THREE.Object3D();

    const sphereGeometry = new THREE.SphereGeometry(4);
    const sphereMesh = new THREE.Mesh(sphereGeometry, basicMaterial);

    const coneGeometry = new THREE.ConeGeometry(4, 4);
    const coneMesh = new THREE.Mesh(coneGeometry, basicMaterial);

    spotlight.add(sphereMesh);
    spotlight.add(coneMesh);

    coneMesh.rotation.z = - Math.PI / 2;
    coneMesh.position.x = - 4;

    var light = new THREE.SpotLight();

    spotlight.add(light);
    light.position.x = - 4;

    return spotlight;
}

function createCameras() {
    'use strict';

    camera1 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    scene.add(camera1);
    camera1.position.set(0, 300, 500);
    camera1.lookAt(scene.position);
    

    camera2 = new THREE.OrthographicCamera(- window.innerWidth / camFactor,
    window.innerWidth / camFactor,
    window.innerHeight / camFactor,
    - window.innerHeight / camFactor,
    -10, 1000);
    camera2.updateProjectionMatrix();

    // camera3 = new THREE.StereoCamera()

    camera = camera1;
}