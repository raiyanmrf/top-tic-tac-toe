const ticTacToe = function () {
  const player1 = createPlayer(1);
  const player2 = createPlayer(2);
  const gameBoard = createGameBoard();
  startGame(player1, player2, gameBoard);
};

const startGame = function (player1, player2, gameBoard) {
  const store = gameBoard.store;
  let currentMark = "X";

  gameBoard.displayBoxContainer.addEventListener("click", handleClickEvent);

  function getCurrentMark() {
    return currentMark;
  }
  function setCurrentMark() {
    if (currentMark === "X") {
      currentMark = "O";
    } else currentMark = "X";
  }
  function countClickedBox() {
    let count = store.reduce((sum, element) => {
      sum += element ? 1 : 0;
      return sum;
    }, 0);

    return count;
  }

  function hasMatch(a, b, c) {
    if (!store[a]) return false; // empty
    if (!store[b]) return false; // empty
    if (!store[c]) return false; // empty
    return store[a] === store[b] && store[b] === store[c];
  }

  function getMatch() {
    const possibleMatches = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (const pattern of possibleMatches) {
      if (hasMatch(...pattern)) return pattern;
    }

    return false;
  }

  function storeInGameBoard(id) {
    store[id] = currentMark;
    console.log(store);
  }

  function changeAndDisableBox(box) {
    box.textContent = currentMark;
    box.disabled = true;
  }

  function getWinningMark(match) {
    console.log(store[match[0]]);
  }

  function handleClickEvent(e) {
    e.stopPropagation();
    if (e.target.tagName !== "BUTTON") return;
    const box = e.target;
    const id = +box.dataset.id;
    setCurrentMark();
    changeAndDisableBox(box);
    storeInGameBoard(id);
    const clickedBoxCount = countClickedBox();

    if (clickedBoxCount < 5) return;
    const match = getMatch(); // return an patter array e.g. [1,2,3]

    console.log(match);
    if (!match && clickedBoxCount < 9) return; //

    if (!match) {
      console.log("IT'S A TIE.");
      return;
    }

    getWinningMark();
  }

  return {
    countClickedBox,
    changeAndDisableBox,
    getMatch,
    storeInGameBoard,
    getWinningMark,
    getCurrentMark,
    setCurrentMark,
  };
};
const createGameBoard = function () {
  const store = new Array(10);
  const displayBoxContainer = document.querySelector("section");
  return { store, displayBoxContainer };
};
const createPlayer = function (playerNo) {
  // const input = prompt(`Enter Player ${playerNo} name: `);
  const input = false;
  const buttonId = `#player${playerNo}`;

  const player = !input ? `Player ${playerNo}` : input;
  const mark = playerNo == 1 ? "X" : "O";

  document.querySelector(buttonId).textContent = player;
  return { name: player, mark };
};

document.getElementById("start").addEventListener("click", ticTacToe);
