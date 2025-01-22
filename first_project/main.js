import * as THREE from 'three';


console.log("bent vagyok");
// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#141414');

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// create cube
const geometry = new THREE.TorusGeometry();
const material = new THREE.MeshToonMaterial({ color: '#446e48', emissive: '#446e48' });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// lightning
const light = new THREE.DirectionalLight(0x9CDBA6, 10);
light.position.set(1, 1, 1);
scene.add(light);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// animate
//
// alt + fel nyíl = feljebb viszi a sort
// alt+shift+le = kopizza a sort egy sorral lejjebb
function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
