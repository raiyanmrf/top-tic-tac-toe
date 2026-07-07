// 0. Start ->
// a. INPUT players name, and render

const newGame = function () {
  // const player1 = prompt(`Enter Player 1 name: `);
  const player1 = "none";
  if (!player1) return;
  // const player2 = prompt(`Enter Player 2 name: `);
  const player2 = "none";
  if (!player2) return;

  document.querySelector("#player1").textContent = player1;
  document.querySelector("#player2").textContent = player2;

  // b.
  // total turn count = 9;
  // odd for player 1;
  //  even for player 2;

  let turn = 1;
  // gameboard = array with length 10, we won't use first index zero which is 0 for simplicity
  const gameBoard = new Array(10);
  // add event listener to the boxes of the gameboard
  document.querySelector("section").addEventListener("click", handleClickEvent);

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
    const mark = turn % 2 == 0 ? "O" : "X";
    turn++;
    box.textContent = mark;
    box.disabled = true;

    //b. store it in the array
    gameBoard[id] = mark;
    console.log(gameBoard);

    // 3.

    //  a. count the number of boxes that are clicked
    function countClickedBox() {
      let count = gameBoard.reduce((sum, element) => {
        sum += element ? 1 : 0;
        return sum;
      }, 0);

      return count;
    }

    //4. if total clicked box is less than 5, do nothigh
    const clickedBoxCount = countClickedBox();

    if (clickedBoxCount < 5) return;

    // 5.

    function hasMatch(a, b, c) {
      if (!gameBoard[a]) return false; // empty
      if (!gameBoard[b]) return false; // empty
      if (!gameBoard[c]) return false; // empty
      return gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
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

    const match = getMatch(); // return an patter array e.g. [1,2,3]

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
    console.log(gameBoard[match[0]]);
  }

  // 9.  Show result
  // 10. End
};

newGame();
