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
  document.querySelector("section").addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.tagName !== "DIV") return;
    const box = e.target;
    const id = box.dataset.id;

    console.log(id);
  });

  // 1. Player1 click to a box and assign 'X' to it | Player2 click to a box and assign "O"

  // 2. That box is disabled and value is changed
  // 3. if total clicked box is less than 5, go to step 1 (toogle player)
  // 4. sort all "X" and all "O" (ascending order by their index wise)

  // 5.  a.  1,2,3 is "X" or "O"? if "X" go to step 6, if "O" step 7
  //     or, 4,5,6 is "X" or "O"? if "X" go to step 6, if "O" step 7
  //     or, 7,8,9 is "X" or "O"? if "X" go to step 6, if "O" step 7
  //     or, 1,5,9 is "X" or "O"? if "X" go to step 6, if "O" step 7
  //     or, 3,5,7 is "X" or "O"? if "X" go to step 6, if "O" step 7
  //     b. if neither "X" or "O":
  //     c. if all boxes are clicked go to step 8.
  //     d. else go to step 1.

  // 6.  Player1 wins, go to step 9
  // 7.  Player2 wins, go to step 9
  // 8.  It's a tie
  // 9.  Show result
  // 10. End
};

newGame();
