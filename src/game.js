import { createScene } from "./scene";
import { createCity } from "./city";
import buildingFactory from './building';

export function createGame() {
    let activeToolId = "";
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);

    scene.onSelectedObject = (selectedObject) => {
        const { x, y } = selectedObject.userData;
        const tileInfo = city.data[x][y];

        if (activeToolId === 'bulldoze') {
            tileInfo.building = undefined;
            scene.update(city);
        } else if (!tileInfo.building) {
            tileInfo.building = buildingFactory[activeToolId]();
            scene.update(city);
        }

    }

    function onMouseDown(event) {
        if (event.button === 0) {
            const selectedObject = scene.getSelectedObject(event);
            useActiveTool(selectedObject);
        };
    };

    function useActiveTool(object) {
        if (!object) {
            updateInfoPanel(null);
            return;
        }

        const { x, y } = object.userData;
        const tile = city.tiles[x][y];

        if (activeToolId === 'select') {
            scene.setActiveToolId(object);
            updateInfoPanel(tile);
        } else if (activeToolId === 'bulldoze') {
            bulldoze(tile);
        } else if (!tile.building) {
            placeBuilding(tile);
        }
    }

    function updateInfoPanel(tile) {
        document.getElementById('selected-object-info').innerHTML = tile ? JSON.stringify(tile, ' ', 2) : '';
    };

    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
    document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
    document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolId) {
            activeToolId = toolId;
        }
    }

    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();

    return game;
}