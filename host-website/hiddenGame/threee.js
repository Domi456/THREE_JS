import * as THREE from 'three';

console.log("bent vagyok");
// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

// camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

// create shape
const geometry = new THREE.TorusGeometry(2, 0.8, 16, 100);
const material = new THREE.MeshPhysicalMaterial({ color: "rgb(68, 15, 184)" });

const cube = new THREE.Mesh(geometry, material)
scene.add(cube);

// lightning
const light = new THREE.DirectionalLight({ position: [10,10,5] });
const amb_light = new THREE.AmbientLight({ intensity: 2 });
//light.position.set(10, 10, 5);
//amb_light.position.set(10,10,5);
scene.add(light);
scene.add(amb_light);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(78, 78);
const place_of_shape = document.getElementById('three');
place_of_shape.appendChild(renderer.domElement);

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
