import React, { Component } from 'react';
import './Game.css';
import { nextGeneration, getCoordinates } from './GameOfLife.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      length: 5,
      width: 5,
      aliveCells: [],
      currGeneration: []
    };

    this.selectCell = this.selectCell.bind(this);
    this.runGame = this.runGame.bind(this);
  }

  selectCell(event) {
    event.target.style.backgroundColor = 'black';
  }

  getAllSelectedCellsNumbers(allRows) {
    let number = 1;
    for (let row of allRows) {
      for (let j = 0; j < this.setState.length; j++) {
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
      this.setState.length,
      this.setState.width
    );

    setInterval(() => {
      this.setState.currGeneration = nextGeneration(
        this.setState.length,
        this.setState.width,
        this.setState.currGeneration
      );

      let i = 0;
      for (let row of allRows) {
        for (let j = 0; j < this.setState.width; j++) {
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
    let cells = new Array(this.setState.length).fill(cell);
    let row = <tr className="CellRow">{cells}</tr>;
    let rows = new Array(this.setState.width).fill(row);
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
