const ticTacToe = function () {
  const player1 = createPlayer(1);
  const player2 = createPlayer(2);
  const gameBoard = createGameBoard();
  startGame(player1, player2, gameBoard);
};

const startGame = function (player1, player2, gameBoard) {
  let currentMark = "X";

  gameBoard.addEvent(handleClickEvent);

  function setCurrentMark() {
    if (currentMark === "X") {
      currentMark = "O";
    } else currentMark = "X";
  }

  function handleClickEvent(e) {
    e.stopPropagation();
    if (e.target.tagName !== "BUTTON") return;
    const box = e.target;
    const id = +box.dataset.id;
    setCurrentMark();
    gameBoard.assignMarkToThisBox(box, currentMark);
    gameBoard.disableThisBox(box);
    gameBoard.storeInMemory(id, currentMark);
    const clickedBoxCount = gameBoard.countClickedBox();

    if (clickedBoxCount < 5) return;
    const match = gameBoard.getMatch(); // return an patter array e.g. [1,2,3]

    console.log(match);
    if (!match && clickedBoxCount < 9) return; //

    if (!match) {
      console.log("IT'S A TIE.");
      return;
    }

    gameBoard.getWinningMark(match);
  }
};
const createGameBoard = function () {
  const memory = new Array(10); // to track clicked box and its value
  const container = document.querySelector("section"); // gameboard container

  function addEvent(callback) {
    container.addEventListener("click", callback);
  }

  function countClickedBox() {
    let count = memory.reduce((sum, element) => {
      sum += element ? 1 : 0;
      return sum;
    }, 0);

    return count;
  }

  function hasMatch(a, b, c) {
    if (!memory[a]) return false; // empty
    if (!memory[b]) return false; // empty
    if (!memory[c]) return false; // empty
    return memory[a] === memory[b] && memory[b] === memory[c];
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

  function storeInMemory(id, currentMark) {
    memory[id] = currentMark;
    console.log(memory);
  }

  function assignMarkToThisBox(box, currentMark) {
    box.textContent = currentMark;
  }
  function disableThisBox(box) {
    box.disabled = true;
  }

  function getWinningMark(match) {
    console.log(memory[match[0]]);
  }

  return {
    memory,
    addEvent,
    countClickedBox,
    storeInMemory,
    assignMarkToThisBox,
    disableThisBox,
    getMatch,
    getWinningMark,
  };
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
