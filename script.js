// 0. Start -> INPUT players name and assign their tags

// IIFE

const newGame = function () {
  const player1 = prompt(`Enter Player 1 name: `);
  if (!player1) return;
  const player2 = prompt(`Enter Player 2 name: `);
  if (!player2) return;
};

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
