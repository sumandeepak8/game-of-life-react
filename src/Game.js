import React, { Component } from 'react';
import './Game.css';
import nextGeneraion from './gameOfLife.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.aliveCells = [];
    this.bounds = { topLeft: [0, 0], bottomRight: [4, 4] };
    this.length = this.bounds.bottomRight[0] - this.bounds.topLeft[0] + 1;
    this.width = this.bounds.bottomRight[1] - this.bounds.topLeft[1] + 1;
    this.selectCell = this.selectCell.bind(this);
    this.currGeneration = [];
    this.runGame = this.runGame.bind(this);
  }

  selectCell(event) {
    event.target.style.backgroundColor = 'black';
  }

  getCoordinates() {
    let numbers = 1;
    for (let i = 0; i <= this.bounds.bottomRight[0]; i++) {
      for (let j = 0; j <= this.bounds.bottomRight[1]; j++) {
        if (this.aliveCells.includes(numbers)) {
          this.currGeneration.push([i, j]);
        }
        numbers++;
      }
    }
  }

  getAllSelectedCellsNumbers(allRows) {
    let number = 1;
    for (let row of allRows) {
      for (let j = 0; j < this.width; j++) {
        let isSelectedCell = row.children[j].style.backgroundColor == 'black';
        if (isSelectedCell) this.aliveCells.push(number);
        number++;
      }
    }
  }

  willAlive(cell) {
    return this.currGeneration.some(x => {
      return +x.join('') == +cell.join('');
    });
  }

  runGame() {
    let allRows = document.getElementById('Board').children;
    this.getAllSelectedCellsNumbers(allRows);
    this.getCoordinates(this.bounds);

    setInterval(() => {
      this.currGeneration = nextGeneraion(this.currGeneration, this.bounds);
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
    let cells = new Array(this.width).fill(cell);
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
