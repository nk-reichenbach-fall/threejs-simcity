import { createScene } from "./scene";
import { createCity } from "./city";

export function createGame() {
    const scene = createScene();
    const city = createCity(25);

    scene.initialize(city);

    document.addEventListener("mousedown", scene.onMouseDown, false);
    document.addEventListener("mouseup", scene.onMouseUp, false);
    document.addEventListener("mousemove", scene.onMouseMove, false);

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