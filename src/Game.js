import React, { Component } from 'react';
import './Game.css';
import { nextGeneration, getCoordinates } from './gameOfLife.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      bounds: { topLeft: [0, 0], bottomRight: [4, 4] },
      currGeneration: [],
      aliveCells: []
    };

    this.length =
      this.setState.bounds.bottomRight[0] - this.setState.bounds.topLeft[0] + 1;
    this.width =
      this.setState.bounds.bottomRight[1] - this.setState.bounds.topLeft[1] + 1;
    this.selectCell = this.selectCell.bind(this);
    this.runGame = this.runGame.bind(this);
  }

  selectCell(event) {
    event.target.style.backgroundColor = 'black';
  }

  getAllSelectedCellsNumbers(allRows) {
    let number = 1;
    for (let row of allRows) {
      for (let j = 0; j < this.length; j++) {
        if (row.children[j].style.backgroundColor == 'black')
          this.setState.aliveCells.push(number);
        number++;
      }
    }
  }

  willAlive(cell) {
    return this.setState.currGeneration.some(position => {
      return +position.join('') == +cell.join('');
    });
  }

  runGame() {
    let allRows = document.getElementById('Board').children;
    this.getAllSelectedCellsNumbers(allRows);

    this.setState.currGeneration = getCoordinates(
      this.setState.aliveCells,
      this.length,
      this.width
    );

    setInterval(() => {
      this.setState.currGeneration = nextGeneration(
        this.length,
        this.width,
        this.setState.currGeneration
      );

      let i = 0;
      for (let row of allRows) {
        for (let j = 0; j < this.width; j++) {
          row.children[j].style.backgroundColor = 'white';
          if (this.willAlive([i, j]))
            row.children[j].style.backgroundColor = 'black';
        }
        i++;
      }
    }, 1000);
  }

  rowsGenerator() {
    let cell = <td onClick={this.selectCell} />;
    let cells = new Array(this.length).fill(cell);
    let row = <tr className="CellRow">{cells}</tr>;
    let rows = new Array(this.width).fill(row);
    return rows;
  }

  render() {
    let doneButton = document.getElementById('done');
    doneButton.onclick = this.runGame;
    return (
      <div className="Game">
        <table id="Board" className="Board">
          {this.rowsGenerator()}
        </table>
      </div>
    );
  }
}

export default Game;
