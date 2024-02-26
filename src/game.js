import { createScene } from "./scene";
import { createCity } from "./city";

export function createGame() {
    let activeToolid = "";
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);
    scene.onSelectedObject = (selectedObject) => {
        const { x, y } = selectedObject.userData;
        const tileInfo = city.data[x][y];

        if(activeToolid === 'bulldoze'){
            tileInfo.buildingId = undefined;
            scene.update(city);
        } else if(!tileInfo.buildingId) {
            tileInfo.buildingId = activeToolid;
            scene.update(city);
        }

    }

    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
    document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
    document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolId) {
            activeToolid = toolId;
        }
    }

    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();

    return game;
}