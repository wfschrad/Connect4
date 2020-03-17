export class DiagonalWinInspector {
  constructor(cols) {
    this.cols = cols;
  }

  inspect() {
    const col1 = this.cols[0].getArray();
    const col2 = this.cols[1].getArray();
    const col3 = this.cols[2].getArray();
    const col4 = this.cols[3].getArray();

    for (let i = 0; i <= 2; i++) {
      if (col1[i] && (col1[i] === col2[i + 1] && col1[i] === col3[i + 2] && col1[i] === col4[i + 3])) {
        return col1[i];
      }
    }

    for (let i = 5; i >= 3; i--) {
      if (col1[i] && (col1[i] === col2[i - 1] && col1[i] === col3[i - 2] && col1[i] === col4[i - 3])) {
        return col1[i];
      }
    }
    return 0;
  }

}
