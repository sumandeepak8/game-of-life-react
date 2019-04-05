const { world } = require('./GameLibrary.js');

const getCoordinates = function(selectedCell, length, width) {
  let currGeneration = new Array();
  let numbers = 1;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      if (selectedCell.includes(numbers)) {
        currGeneration.push([i, j]);
      }
      numbers++;
    }
  }
  return currGeneration;
};

const getAliveCells = function() {
  let newGeneration = [];
  let { length, width } = world.getGridDimension(world.grid);
  for (let row = 0; row < length; row++) {
    for (let column = 0; column < width; column++) {
      world.grid[row][column] == 1 && newGeneration.push([row, column]);
    }
  }
  return newGeneration;
};

const nextGeneration = function(length, width, currGeneration) {
  world.grid = world.generateGrid({ length, width });
  currGeneration.forEach(aliveCell => {
    world.initializeGrid({ latitude: aliveCell[0], longitude: aliveCell[1] });
  });

  world.updateGrid();
  return getAliveCells();
};

export { getCoordinates, nextGeneration };
