export function createCity(size) {
  const data = [];

  initialize();

  function initialize() {
    for (let x = 0; x < size.length; x++) {
      const column = [];
      for (let y = 0; y < size.length; y++) {
        const tile = { x, y };
        column.push(tile);
      }
      data.push(column);
    }
  }

  return {
    size,
    data,
  };
}
