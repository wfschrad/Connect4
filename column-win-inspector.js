export class ColumnWinInspector {
  constructor(col) {
    this.col = col;
  }

  inspect() {
    const colArray = this.col.getArray();
    let count = 1;
    for (let i = 0; i < colArray.length - 1; i++) {
      if (colArray[i] && colArray[i] === colArray[i + 1]) {
        count++;
      }
      else {
        count = 1;
      }
      if (count === 4) {
        return colArray[i];
      }
    }
    return 0;
  }
}
