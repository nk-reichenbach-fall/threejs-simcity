import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const assets = {
    'grass': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'grass', x, y };
        mesh.position.set(x, -0.5, y);
        return mesh;
    },
    'resedential': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0xf5f242 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'resedential', x, y };
        mesh.scale.set(1, data.height, 1);
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },
    'industrial': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0xf55d42 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'industrial', x, y };
        mesh.scale.set(1, data.height, 1);
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },
    'commercial': (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x42f5ce });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'commercial', x, y };
        mesh.scale.set(1, data.height, 1);
        mesh.position.set(x, data.height / 2, y);
        return mesh;
    },
    'road': (x, y) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x6e6e6e });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'road', x, y };
        mesh.scale.set(1, 0.1, 1);
        mesh.position.set(x, 0.05, y);
        return mesh;
    },
}

export function createAssets(assetId, x, y, data) {
    if (assetId in assets) {
        return assets[assetId](x, y, data);
    } else {
        console.warn('No Asset found');
        return undefined;
    }
}