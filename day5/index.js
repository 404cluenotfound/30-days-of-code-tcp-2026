const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const resetAllBtn = document.getElementById("resetAll");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreDEl = document.getElementById("scoreD");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0, D: 0 };
let autoResetTimeout = null;

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => handleClick(cell));
});



resetAllBtn.addEventListener("click", () => {
  clearTimeout(autoResetTimeout);
  resetAll();
});

function handleClick(cell) {
  const index = Number(cell.dataset.index);

  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("disabled", currentPlayer.toLowerCase());

  const result = checkResult();

  if (result === "win") {
    showWin();
    scheduleAutoReset();
  } else if (result === "draw") {
    showDraw();
    scheduleAutoReset();
  } else {
    switchPlayer();
  }
}

function checkResult() {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(pattern);
      gameOver = true;
      return "win";
    }
  }

  if (board.every((val) => val !== null)) {
    highlightDraw();
    gameOver = true;
    return "draw";
  }

  return "ongoing";
}

function highlightWin(winPattern) {
  cells.forEach((cell, idx) => {
    if (winPattern.includes(idx)) {
      cell.classList.add("cell-win");
    }
    cell.classList.add("disabled");
  });
}

function highlightDraw() {
  cells.forEach((cell) => {
    cell.classList.add("cell-draw", "disabled");
  });
}

function showWin() {
  statusEl.textContent = `Player ${currentPlayer} wins! 🎉 New round in a moment…`;
  scores[currentPlayer]++;
  updateScores();
}

function showDraw() {
  statusEl.textContent = "It's a draw. New round in a moment…";
  scores.D++;
  updateScores();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer} turn`;
}

function scheduleAutoReset() {
  autoResetTimeout = setTimeout(() => {
    resetRound();
  }, 1500);
}

function resetRound() {
  board = Array(9).fill(null);
  gameOver = false;
  statusEl.textContent = `Player ${currentPlayer} turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

function resetAll() {
  scores = { X: 0, O: 0, D: 0 };
  updateScores();
  currentPlayer = "X";
  resetRound();
  statusEl.textContent = "Player X turn";
}

function updateScores() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDEl.textContent = scores.D;
}
