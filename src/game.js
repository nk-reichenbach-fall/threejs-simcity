import { createScene } from "./scene";
import { createCity } from "./city";

export function createGame() {
    const scene = createScene();
    const city = createCity(25);

    scene.initialize(city);
    scene.onSelectedObject = (selectedObject) => {
        console.log(selectedObject);

        const { x, y } = selectedObject.userData;
        const tileInfo = city.data[x][y];
        console.log(tileInfo);
    }

    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
    document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
    document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        }
    }

    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();
}