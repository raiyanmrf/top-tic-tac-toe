(function () {
  const ticTacToe = function () {
    const player1 = createPlayer(1);
    const player2 = createPlayer(2);
    const gameBoard = createGameBoard();
    startGame(player1, player2, gameBoard);
  };

  const startGame = function (player1, player2, gameBoard) {
    let currentMark = player1.mark;
    let currentPlayer = player1.name;
    let msg = `${currentPlayer}'s turn. Put a "${currentMark}"`;

    setNotice(msg); // initial message
    toogleButtons(); // hide start button , show reload button
    gameBoard.addEvent(handleClickEvent);

    function setNotice(msg) {
      document.querySelector(".notice").textContent = msg;
    }

    function setCurrentState() {
      if (currentMark === "O") {
        currentMark = "X";
        currentPlayer = player1.name;
      } else {
        currentMark = "O";
        currentPlayer = player2.name;
      }

      msg = `${currentPlayer}'s turn. Put a "${currentMark}"`;
      setNotice(msg);
    }

    function toogleButtons() {
      document.getElementById("start").classList.toggle("hidden");
      document.getElementById("reset").classList.toggle("hidden");
    }
    function handleClickEvent(e) {
      e.stopPropagation();

      if (e.target.tagName !== "BUTTON") return;
      const box = e.target;
      const id = +box.dataset.id;

      gameBoard.assignMarkToThisBox(box, currentMark);
      gameBoard.disableThisBox(box);
      gameBoard.storeInMemory(id, currentMark);

      const clickedBoxCount = gameBoard.countClickedBox();

      const match = gameBoard.getMatch(); // return an patter array e.g. [1,2,3]

      console.log(match);

      if (match) {
        setNotice(`${currentPlayer} won ! ${currentMark} rocks !`);
        gameBoard.disableAllBox();
      } else if (!match && clickedBoxCount < 9) {
        setCurrentState();
      } else {
        setNotice("It's a tie.");
        gameBoard.disableAllBox();
      }
    }
  };
  const createGameBoard = function () {
    let memory = new Array(10); // to track clicked box and its value
    const container = document.querySelector("section"); // gameboard container
    enableAllBox();

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
      let arr = memory.slice();
      arr[id] = currentMark;
      memory = arr;
      console.log(memory);
    }

    function assignMarkToThisBox(box, currentMark) {
      box.textContent = currentMark;
    }
    function disableThisBox(box) {
      box.disabled = true;
    }

    function disableAllBox() {
      container.childNodes.forEach((box) => {
        box.disabled = true;
      });
    }
    function enableAllBox() {
      container.childNodes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
      });
    }

    return {
      addEvent,
      countClickedBox,
      storeInMemory,
      assignMarkToThisBox,
      disableThisBox,
      getMatch,
      disableAllBox,
    };
  };
  const createPlayer = function (playerNo) {
    const input = prompt(
      `Enter Player ${playerNo} name: `,
      `Player ${playerNo}`,
    );
    // const input = false;
    const buttonId = `#player${playerNo}`;

    const player = !input ? `Player ${playerNo}` : input;
    const mark = playerNo == 1 ? "X" : "O";

    document.querySelector(buttonId).textContent = player;
    return { name: player, mark };
  };

  document.getElementById("start").addEventListener("click", ticTacToe);
  document.getElementById("reset").addEventListener("click", () => {
    location.reload();
  });
})();
