import * as THREE from 'three';
import {OrbitControls} from 'three/addons';

const HTMLElement = document.getElementById('canvas');

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#141414');

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

// objects
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshPhysicalMaterial({ color: '#c78a10', emissive: '#c78a10' });
const dodi = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshToonMaterial({ color: '#0b3817', emissive: '#0b3817' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.y = -1.5;

scene.add(dodi);
scene.add(box);

// lights
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// animations
function animate(){
  requestAnimationFrame(animate);
  dodi.rotation.x += 0.01;
  dodi.rotation.y += 0.01;
  //box.rotation.x += 0.05;
  box.rotation.y += 0.05;
  renderer.render(scene, camera);
  controls.update();
}

// handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// npm create vite@latest
// y
// ./
// *select framework
// *select language
// npm install
// npm i three
// npm run dev
