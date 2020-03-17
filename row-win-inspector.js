export class RowWinInspector {
  constructor(cols) {
    this.cols = cols;
  }

  inspect() {
    const col1 = this.cols[0].getArray();
    const col2 = this.cols[1].getArray();
    const col3 = this.cols[2].getArray();
    const col4 = this.cols[3].getArray();
    for (let i = 0; i < col1.length; i++) {
      if (col1[i] && (col1[i] === col2[i] && col1[i] === col3[i] && col1[i] === col4[i])) {
        return col1[i];
      }
    }
    return 0;
  }
}