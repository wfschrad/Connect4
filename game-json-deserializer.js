// import { Game } from './game.js';
// import { Column } from './column.js';

// export class GameJsonDeserializer {
//   constructor(loadState) {
//     this.loadState = JSON.parse(loadState);
//   }

//   deserialize() {
//     //grab state object from storage
//     //make new game instance
//     //re-setup game environment
//     const game = new Game(this.loadState.player1, this.loadState.player2);
//     game.setCurrentPlayer(this.loadState.currentPlayer);
//     const columns = [];

//     for (let i = 0; i < 7; i++) {
//       columns.push(new Column());
//     }

//     this.loadState.columns.forEach((obj, i) => {
//       const objArr = obj.myArray;
//       for (let k = objArr.length - 1; k >= 0; k--) {
//         if (objArr !== "") {
//           columns[i].add(objArr[k]);
//         }
//       }
//     });

//     game.setColumns(columns);
//     return game;
//   }
// }

//algorithmic implementation

import { Game } from './game.js';
export class GameJsonDeserializer {
  constructor(loadState) {
    this.loadState = JSON.parse(loadState);
  }

  deserialize() {
    // debugger;
    //grab state object from storage
    //make new game instance
    //re-setup game environment
    const game = new Game(this.loadState.player1, this.loadState.player2);
    game.setCurrentPlayer(this.loadState.currentPlayer);
    const rowInIndex = [5, 5, 5, 5, 5, 5, 5];
    let playerTurn = 1;
    while (rowInIndex.some(ele => ele !== -1)) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const rowIndex = rowInIndex[columnIndex];

        if (rowIndex === -1) continue;

        const tokenValue = this.loadState.tokens[rowIndex][columnIndex];
        if (!tokenValue) {
          rowInIndex[columnIndex] = -1;
        }

        if (tokenValue === playerTurn) {
          game.playInColumn(columnIndex);
          rowInIndex[columnIndex] -= 1;
          if (playerTurn === 1) {
            playerTurn = 2;
          } else {
            playerTurn = 1;
          }
        }
      }
    }
    return game;
  }
}
