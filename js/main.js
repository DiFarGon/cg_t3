// group 23

var lambertOrigami, phongOrigami, basicOrigami;
var lambertOrigamiWhiter, phongOrigamiWhiter, basicOrigamiWhiter;
var floorMaterial, spotlightMaterial;
var firstOrigami, secondOrigami, thirdOrigami;
var spotlight1, spotlight2, spotlight3, directionalLight;
var directionalLightOn = false, spotlight1On = false, spotlight2On = false, spotlight3On = false;
const origamis = [];
var floor;
var renderer, scene, camera, camera1, camera2, camera3;
var firstRotationVelocity = 0, secondRotationVelocity = 0, thirdRotationVelocity = 0;
var shading = true, shadingPhong = true, materialChange = false;
const camFactor = 5;
var wireframeChanged = false, wireframe = false;

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.shadowMapEnabled = true;
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
                        mesh.material = phongOrigami;
                    });
                })
            } else {
                origamis.forEach(function(origami) {
                    origami.children.forEach(function(mesh) {
                        mesh.material = lambertOrigami;
                    });
                });
            }
        } else {
            origamis.forEach(function(origami) {
                origami.children.forEach(function(mesh) {
                    mesh.material = basicOrigami;
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
            floor.children.forEach(
                mesh => mesh.wireframe = true
            );
        } else {
            origamis.forEach(
                origami => origami.children.forEach(
                    mesh => mesh.material.wireframe = false)
            );
            floor.children.forEach(
                mesh => mesh.wireframe = false
            );
        }
    }

    if (directionalLightOn) {
        scene.add(directionalLight);
    } else {
        scene.remove(directionalLight);
    }
    if (spotlight1On) {
        scene.add(spotlight1);
    } else {
        scene.remove(spotlight1);
    }
    if (spotlight2On) {
        scene.add(spotlight2);
    } else {
        scene.remove(spotlight2);
    }
    if (spotlight3On) {
        scene.add(spotlight3);
    } else {
        scene.remove(spotlight3);
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
            directionalLightOn = !directionalLightOn;
            break;
        case 90: // Z
            spotlight1On = !spotlight1On;
            break;
        case 88: // X
            spotlight2On = !spotlight2On;
            break;
        case 67: // C
            spotlight3On = !spotlight3On;
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