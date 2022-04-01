import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

function createStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));
  star.position.set(x, y, z);
  return star;
}

function createCamera() {
  return new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
}

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

function createTorus() {
  const geometry = new THREE.TorusGeometry(10, 3, 116, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6347
  });
  return new THREE.Mesh(geometry, material);
}

const torus = createTorus();

const pointLight = new THREE.PointLight(0x888888);
const ambientLight = new THREE.AmbientLight(0x888888, 0.3);
pointLight.position.set(20, 20, 20);

const gridhelper = new THREE.GridHelper(200, 40);

// Add things to the scene
scene.add(torus);
scene.add(pointLight, ambientLight);
//scene.add(gridhelper);
Array(1000)
  .fill()
  .map(() => scene.add(createStar()));

// Now for the camera
//

const camera = createCamera();
camera.position.setZ(30);

// Now set up animation / rendering
//
const renderer = createRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(torus);
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  //torus.rotation.z += 0.0017;
  torus.rotation.y += 0.017;
  camera.position.x += 0.01;
  camera.position.y += 0.02;
  controls.update();
  renderer.render(scene, camera);
}

animate();
