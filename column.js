export class Column {
  constructor() {
    this.myArray = [];
    for (let i = 0; i < 6; i++) {
      this.myArray.push("");
    }
  }

  add(player) {
    for (let i = this.myArray.length - 1; i >= 0; i--) {
      if (!(this.myArray[i] && this.isFull())) {
        this.myArray[i] = player;
        return;
      }
    }
  }

  isFull(gameState) {
    if (gameState !== 0) {
      return true;
    }
    for (let i = 0; i < this.myArray.length; i++) {
      if (!this.myArray[i]) {
        return false;
      }
    }
    return true;
  }

  getLength() {
    return this.myArray.length;
  }

  getTokenAt(row) {
    if (!this.myArray[row]) {
      return null;
    } else {
      return this.myArray[row];
    }
  }

  getArray() {
    return this.myArray;
  }

  getAvailableRow() {
    for (let i = this.myArray.length - 1; i >= 0; i--) {
      if (!this.myArray[i]) {
        return i;
      }
    }
    return -1;
  }
}
