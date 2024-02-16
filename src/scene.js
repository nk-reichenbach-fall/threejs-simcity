import * as THREE from "three";
import { createCamera } from "./camera";

export function createScene() {
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  // Test
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xfff999 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function draw() {
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  function onMouseDown() {
    camera.onMouseDown();
  }
  function onMouseUp() {
    camera.onMouseUp();
  }
  function onMouseMove(event) {
    camera.onMouseMove(event);
  }

  return {
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
