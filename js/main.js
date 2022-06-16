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
var wireframeChanged = false, wireframe = true;

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

    if (wireframeChanged) {
        if (wireframe) {
            origamis.forEach(
                origami => origami.children.forEach(
                    mesh => mesh.material.wireframe = true)
            );
        } else {
            origamis.forEach(
                origami => origami.children.forEach(
                    mesh => mesh.material.wireframe = false)
            );
        }
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

        case 52: // 4
            wireframe = !wireframe;
            wireframeChanged = true;
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

    const texture = new THREE.TextureLoader().load('../textures/origami-texture-red-pr-.jpeg');

    dullMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        wireframe: true
    });

    brightMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        wireframe: true
    });
    basicMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        wireframe: true
    });

    dullMaterialWhiter = new THREE.MeshLambertMaterial({
        map: texture,
        wireframe: true
    });

    brightMaterialWhiter = new THREE.MeshPhongMaterial({
        map: texture,
        wireframe: true
    });

    basicMaterialWhiter = new THREE.MeshBasicMaterial({
        map: texture,
        wireframe: true
    });
}

function createLights() {
    'use strict';

    var spotlight1 = createSpotlight();
    scene.add(spotlight1);
    spotlight1.position.set(firstOrigami.position.x, 160, 40);
    spotlight1.lookAt(firstOrigami.position);

    var spotlight2 = createSpotlight();
    scene.add(spotlight2);
    spotlight2.position.set(secondOrigami.position.x, 160, 40);
    spotlight2.lookAt(secondOrigami.position);

    var spotlight3 = createSpotlight();
    scene.add(spotlight3);
    spotlight3.position.set(thirdOrigami.position.x + 10, 160, 40);
    spotlight3.lookAt(thirdOrigami.position);

    var directionalLight = new THREE.DirectionalLight();
    scene.add(directionalLight);
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

    coneMesh.rotation.x = - Math.PI / 2;
    coneMesh.position.z = 4;
    
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