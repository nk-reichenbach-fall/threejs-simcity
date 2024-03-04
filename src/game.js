import { createScene } from "./scene";
import { createCity } from "./city";
import buildingFactory from './building';

export function createGame() {
    let activeToolid = "";
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);

    scene.onSelectedObject = (selectedObject) => {
        const { x, y } = selectedObject.userData;
        const tileInfo = city.data[x][y];

        if (activeToolid === 'bulldoze') {
            tileInfo.building = undefined;
            scene.update(city);
        } else if (!tileInfo.building) {
            tileInfo.building = buildingFactory[activeToolid]();
            scene.update(city);
        }

    }

    function onMouseDown() {
        
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