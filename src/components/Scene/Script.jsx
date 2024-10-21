import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap, Power2 } from 'gsap';

//Global variables
let currentRef = null;

// GSAP
const timeline = new gsap.timeline(
  {
    defaults: {
      duration: 1,
      ease: Power2.easeOut
    }
  }
)


//Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);

//OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//Animate the scene
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

// CUBES
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
cube.position.set(-1, -1, 0)
cube.name = "cube";

const cube2 = cube.clone();
cube2.position.set(1 , -1, 0);
cube2.name = "cube2";

const cube3 = cube.clone();
cube3.position.set(-1, 1, 0);
cube3.name = "cube3";

const cube4 = cube.clone();
cube4.position.set(1, 1, 0);
cube4.name = "cube4";

scene.add(cube, cube2, cube3, cube4);

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.traverse((object) => {
    // Limpiar geometrías
    if (object.geometry) {
      object.geometry.dispose();
    }

    // Limpiar materiales
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material.dispose();
      }
    }

    // Limpiar texturas
    if (object.material && object.material.map) {
      object.material.map.dispose();
    }
  });
  currentRef.removeChild(renderer.domElement);
};

export const moveCube = () => {
  timeline
  .from(cube.position, { y : -5 })
  .from(cube.rotation, { y: Math.PI * 2}, '+=0.5')
  .to(camera.position, {x: -5, y: 10, z: -5})
};
//moveCube();

export const moveTo = (name) => {
  const mesh = scene.getObjectByName(name);
  if (!mesh) return;

  timeline
    .to(orbitControls.target, { 
      x: mesh.position.x, 
      y: mesh.position.y, 
      z: mesh.position.z,
      ease: "Power2.easeOut", 
      onUpdate: () => { orbitControls.update() },
    })
    .to(camera.position, {
      x: mesh.position.x < 0 ? 3 : -3,
      y: mesh.position.y < 0 ? 3 : -3,
      ease: "Power2.easeOut",
      onUpdate: () => { camera.updateProjectionMatrix() }
    }, '-=1')    
    // no poner delay en la primera animacion porque no funciona
}