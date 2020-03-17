import { Column } from './column.js';
import { ColumnWinInspector } from './column-win-inspector.js';
import { RowWinInspector } from './row-win-inspector.js';
import { DiagonalWinInspector } from './diagonal-win-inspector.js';

export class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = 1;
    this.columns = [];
    this.winnerNumber = 0;
    for (let i = 0; i < 7; i++) {
      this.columns.push(new Column());
    }
  }

  setColumns(columns) {
    this.columns = columns;
  }

  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  getColumns() {
    return this.columns;
  }

  getPlayerOne() {
    return this.player1;
  }

  getPlayerTwo() {
    return this.player2;
  }

  getWinner() {
    return this.winnerNumber;
  }

  checkForColumnWin() {
    if (this.winnerNumber !== 0) { return; }
    for (let i = 0; i < this.columns.length; i++) {
      const colInspector = new ColumnWinInspector(this.columns[i]);
      const winCheck = colInspector.inspect();
      if (winCheck) {
        this.winnerNumber = winCheck;
      }
    }
  }

  checkForDiagonalWin() {
    for (let i = 0; i <= 3; i++) {
      const DiagInspector = new DiagonalWinInspector(this.columns.slice(i, i + 4));
      const winCheck = DiagInspector.inspect();
      if (winCheck) {
        this.winnerNumber = winCheck;
      }
    }
  }

  checkForRowWin() {
    for (let i = 0; i <= 3; i++) {
      const rowInspector = new RowWinInspector(this.columns.slice(i, i + 4));
      const winCheck = rowInspector.inspect();
      if (winCheck) {
        this.winnerNumber = winCheck;
      }
    }
  }

  getName() {
    let message;
    if (this.getWinnerNumber() === 0) {
      return `${this.player1.toUpperCase()} VS. ${this.player2.toUpperCase()}`;
    } else if (this.getWinnerNumber() === 1) {
      message = `${this.player1.toUpperCase()} wins!`;
    } else if (this.getWinnerNumber() === 2) {
      message = `${this.player2.toUpperCase()} wins!`;
    } else if (this.getWinnerNumber() === 3) {
      message = `${this.player1.toUpperCase()} ties with ${this.player2.toUpperCase()}`;
    }
    localStorage.clear();
    return message;
  }

  getWinnerNumber() {
    return this.winnerNumber;
  }

  playInColumn(index) {
    if (!this.columns[index].isFull(this.winnerNumber)) {
      this.columns[index].add(this.currentPlayer);
      this.togglePlayer();
      this.checkForTie();
      this.checkForColumnWin();
      this.checkForRowWin();
      this.checkForDiagonalWin();
    }
  }

  checkForTie() {
    for (let i = 0; i < this.columns.length; i++) {
      if (!this.columns[i].isFull(this.winnerNumber)) {
        return false;
      }
    }
    this.winnerNumber = 3;
    return true;
  }

  getTokenAt(row, col) {
    const column = this.columns[col];
    return column.getTokenAt(row);
  }

  togglePlayer() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    }
    else {
      this.currentPlayer = 1;
    }
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }

  isColumnFull(col) {
    if (this.winnerNumber !== 0) {
      return true;
    }
    return col.isFull(this.winnerNumber);
  }

  getColumns() {
    return this.columns;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }
}
