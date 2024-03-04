import * as THREE from "three";

export function createCamera(gameWindow) {
  const camera = new THREE.PerspectiveCamera(80, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);

  const DEG2RAD = Math.PI / 180.0;
  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  const LEFT_MOUSE_BUTTON = 0;
  const MIDDLE_MOUSE_BUTTON = 1;
  const RIGHT_MOUSE_BUTTON = 2;

  const MIN_CAMERA_RADIUS = 0.1;
  const MAX_CAMERA_RADIUS = 5;

  const MIN_CAMERA_ELEVATION = 30;
  const MAX_CAMERA_ELEVATION = 90;
  const ROTATION_SENSITIVITY = 0.5;
  const ZOOM_SENSITIVITY = 0.02;
  const PAN_SENSITIVITY = -0.01;

  let cameraOrigin = new THREE.Vector3(8, 0, 8);
  let cameraRadius = 0.5;
  let cameraAzimuth = 225;
  let cameraElevation = 45;
  let isLeftMouseDown = false;
  let isRightMouseDown = false;
  let isMiddleMouseDown = false;

  let prevMouseX = 0;
  let prevMouseY = 0;
  updateCameraPosition();

  function onMouseDown(event) {
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = true;
    }
    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = true;
    }
    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = true;
    }
  }
  function onMouseUp(event) {
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = false;
    }
    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = false;
    }
    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = false;
    }
  }
  function onMouseMove(event) {
    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // Handle Camera movement
    if (isLeftMouseDown) {
      cameraAzimuth += -(deltaX * ROTATION_SENSITIVITY);
      cameraElevation += deltaY * ROTATION_SENSITIVITY;
      cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
      updateCameraPosition();
    }

    // Pan Camera
    if (isMiddleMouseDown) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
      cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
      updateCameraPosition();
    }

    // Camera Zoom
    if (isRightMouseDown) {
      cameraRadius += (event.clientY - prevMouseY) * ZOOM_SENSITIVITY;
      cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));

      updateCameraPosition();
    }

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  function updateCameraPosition() {
    camera.position.x = 30 * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
    camera.position.y = 30 * Math.sin(cameraElevation * DEG2RAD);
    camera.position.z = 30 * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
    camera.position.add(cameraOrigin);
    camera.lookAt(cameraOrigin);
    camera.updateMatrix();
  }

  return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
