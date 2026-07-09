// 0. Start ->
// a. INPUT players name, and render

const player = function (playerNo) {
  // const input = prompt(`Enter Player ${playerNo} name: `);
  const input = false;
  const buttonId = `#player${playerNo}`;

  const player = !input ? `Player ${playerNo}` : input;
  const mark = playerNo == 1 ? "X" : "O";

  document.querySelector(buttonId).textContent = player;

  return { name: player, mark };
};

const createGameBoard = function () {
  const store = new Array(10);
  const displayBoxContainer = document.querySelector("section");
  let currentMark = "X";

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

    // a.  1,2,3 is "X" or "O"?
    //     or, 4,5,6 is "X" or "O"?
    //     or, 7,8,9 is "X" or "O"?
    //     or, 1,5,9 is "X" or "O"?
    //     or, 3,5,7 is "X" or "O"?

    for (const pattern of possibleMatches) {
      if (hasMatch(...pattern)) return pattern;
    }

    return false;
  }

  function storeInGameBoard(id, currentMark) {
    store[id] = currentMark;
    console.log(store);
  }

  function changeAndDisableBox(box, currentMark) {
    box.textContent = currentMark;
    box.disabled = true;
  }

  function addEvent(callback) {
    displayBoxContainer.addEventListener("click", callback);
  }

  function getWinningMark(match) {
    console.log(store[match[0]]);
  }

  return {
    countClickedBox,
    changeAndDisableBox,
    getMatch,
    storeInGameBoard,
    getWinningMark,
    addEvent,
    getCurrentMark,
    setCurrentMark,
  };
};

const newGame = function () {
  const player1 = player(1);
  const player2 = player(2);
  const gameBoard = createGameBoard();
  gameBoard.addEvent(handleClickEvent);

  function handleClickEvent(e) {
    e.stopPropagation();
    if (e.target.tagName !== "BUTTON") return;
    // 1. Player1 click to a box and assign 'X' to it | Player2 click to a box and assign "O"
    const box = e.target;
    const id = +box.dataset.id;

    // 2.
    // a.That box is disabled and value is changed
    // odd "X"
    //  even "O"
    const currentMark = gameBoard.getCurrentMark();
    gameBoard.setCurrentMark();
    gameBoard.changeAndDisableBox(box, currentMark);

    //b. store it in the array
    gameBoard.storeInGameBoard(id, currentMark);

    // 3.

    //  a. count the number of boxes that are clicked

    //4. if total clicked box is less than 5, do nothigh
    const clickedBoxCount = gameBoard.countClickedBox();

    if (clickedBoxCount < 5) return;

    // 5.

    const match = gameBoard.getMatch(); // return an patter array e.g. [1,2,3]

    console.log(match);

    //     b. if neither "X" or "O":
    //     c. if all boxes are clicked go to step 8.
    //     d. else go to step 1.

    if (!match && clickedBoxCount < 9) return; //

    // 8.  It's a tie
    // 6.  Player1 wins, go to step 9
    // 7.  Player2 wins, go to step 9

    if (!match) {
      console.log("IT'S A TIE.");
      return;
    }

    // return the winning mark "X" or "O"
    // console.log(gameBoard[match[0]]);
  }

  // 9.  Show result
  // 10. End
};

newGame();
