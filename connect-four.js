import { Game } from './game.js';
import { GameJsonSerializer } from './game-json-serializer.js';
import { GameJsonDeserializer } from './game-json-deserializer.js';

//manage state of connect4 game
const player1Name = document.getElementById('player-1-name');
const player2Name = document.getElementById('player-2-name');
const formHolder = document.getElementById('form-holder');
const newGame = document.getElementById('new-game');
const boardHolder = document.getElementById('board-holder');
const gameName = document.getElementById('game-name');
const clickTargets = document.getElementById('click-targets');
let game;

const updateUi = () => {
  if (!game) {
    boardHolder.classList.add('is-invisible');
    return;
  }

  boardHolder.classList.remove('is-invisible');
  gameName.innerHTML = game.getName();

  const current = game.getCurrentPlayer();
  if (current === 1) {
    clickTargets.classList.remove('black');
    clickTargets.classList.add('red');
  }
  else {
    clickTargets.classList.remove('red');
    clickTargets.classList.add('black');
  }

  for (let i = 0; i < 6; i++) {
    for (let k = 0; k < 7; k++) {
      const currentColEl = document.getElementById(`column-${k}`);
      const currentCol = game.getColumns()[k];
      const currentEl = document.getElementById(`square-${i}-${k}`);
      const token = game.getTokenAt(i, k);
      const newDiv = document.createElement('div');

      if (game.isColumnFull(currentCol)) {
        currentColEl.classList.add('full');
      } else {
        currentColEl.classList.remove('full');
      }

      currentEl.innerHTML = "";
      currentEl.appendChild(newDiv);
      newDiv.classList.add('token');

      if (token === 1) {
        newDiv.classList.add('red');
      } else if (token === 2) {
        newDiv.classList.add('black');
      }
    }
  }
};

const animateMove = (row, col) => {
  const currentEl = document.getElementById(`square-${row}-${col}`);
  const currentPlayer = game.getCurrentPlayer();
  const token = document.createElement('div');

  token.classList.add(`drop-token${row}`);
  currentEl.appendChild(token);

  if (currentPlayer === 1) {
    token.style.backgroundColor = 'red';
  } else if (currentPlayer === 2) {
    token.style.backgroundColor = 'black';
  }

  setTimeout(() => {
    token.style.top = '-70px';
  }, 250);
};

formHolder.addEventListener('keyup', () => {
  if (player1Name.value && player2Name.value) {
    newGame.disabled = false;
  } else {
    newGame.disabled = true;
  }
});

// click targets event listener
clickTargets.addEventListener('click', event => {
  const columnID = event.target.id;
  const columnNum = Number.parseInt(columnID[columnID.length - 1]);
  const row = game.getColumns()[columnNum];
  if (columnID.includes('column')) {
    if (row.getAvailableRow() >= 0 && !game.isColumnFull(row)) {
      animateMove(row.getAvailableRow(), columnNum);
    }
    game.playInColumn(columnNum);
    const gameSerializer = new GameJsonSerializer(game);
    const serializedGame = gameSerializer.serialize(game);
    localStorage.setItem('savedState', serializedGame);
  }

  setTimeout(() => {
    updateUi();
  }, 1100);
})

// new game button event listener
newGame.addEventListener('click', () => {
  boardHolder.classList.remove('is-invisible');
  game = new Game(player1Name.value, player2Name.value);
  player1Name.value = '';
  player2Name.value = '';
  newGame.disabled = true;
  updateUi();
});

// if (localStorage.getItem('savedState')) {
//   const loadState = localStorage.getItem('savedState');
//   const deserializedGame = new GameJsonDeserializer(loadState);
//   game = deserializedGame.deserialize();
//   updateUi();
// }
