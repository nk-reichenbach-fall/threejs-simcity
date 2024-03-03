import * as THREE from "three";

const cube = new THREE.BoxGeometry(1, 1, 1);

let loader = new THREE.TextureLoader();

function loadTexture(url) {
    const tex = loader.load(url);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    return tex;
}

const textures = {
    'grass': loadTexture('public/textures/grass.png'),
    'resedential1': loadTexture('public/textures/resedential1.png'),
    'resedential2': loadTexture('public/textures/resedential2.png'),
    'resedential3': loadTexture('public/textures/resedential3.png'),
    'commercial1': loadTexture('public/textures/commercial1.png'),
    'commercial2': loadTexture('public/textures/commercial2.png'),
    'commercial3': loadTexture('public/textures/commercial3.png'),
    'industrial1': loadTexture('public/textures/industrial1.png'),
    'industrial2': loadTexture('public/textures/industrial2.png'),
    'industrial3': loadTexture('public/textures/industrial3.png'),
}

function getTopMaterial() {
    return new THREE.MeshLambertMaterial({ color: 0x555555 });
}

function getSideMaterial(textureName) {
    return new THREE.MeshLambertMaterial({ map: textures[textureName].clone() });
}

const assets = {
    'grass': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ map: textures.grass });
        const mesh = new THREE.Mesh(cube, material);
        mesh.userData = { x, y };
        mesh.position.set(x, -0.5, y);
        mesh.receiveShadow = true;
        return mesh;
    },
    'resedential': (x, y, data) => createZoneMesh(x, y, data),
    'industrial': (x, y, data) => createZoneMesh(x, y, data),
    'commercial': (x, y, data) => createZoneMesh(x, y, data),
    'road': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x222222 });
        const mesh = new THREE.Mesh(cube, material);
        mesh.userData = { x, y };
        mesh.scale.set(1, 0.02, 1);
        mesh.position.set(x, 0.01, y);
        mesh.receiveShadow = true;
        return mesh;
    },
}

function createZoneMesh(x, y, data) {
    const textureName = data.type + data.style;

    const topMaterial = getTopMaterial();
    const sideMaterial = getSideMaterial(textureName);
    let materialArray = [
        sideMaterial,
        sideMaterial,
        topMaterial,
        topMaterial,
        sideMaterial,
        sideMaterial
    ]

    let mesh = new THREE.Mesh(cube, materialArray);
    mesh.userData = { x, y };
    mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
    mesh.material.forEach(material => material.map?.repeat.set(1, data.height - 1))
    mesh.position.set(x, (data.height - 0.95) / 4, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

export function createAssets(assetId, x, y, data) {
    console.log(assetId);
    if (assetId in assets) {
        return assets[assetId](x, y, data);
    } else {
        console.warn('No Asset found');
        return undefined;
    }
}
