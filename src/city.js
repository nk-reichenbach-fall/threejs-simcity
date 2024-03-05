export function createCity(size) {
  const tiles = [];

  initialize();

  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tiles = createTile(x, y);

        column.push(tiles);
      }
      tiles.push(column);
    }
  }

  function update() {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        tiles[x][y].building?.update();
      }
    }
  }

  return {
    size,
    tiles,
    update,
  };
}


function createTile(x, y) {
  return {
    x,
    y,
    terrainId: 'grass',
    building: undefined,
  };
}