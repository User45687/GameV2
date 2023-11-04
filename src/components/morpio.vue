<template>
  <div class="modal_e" v-if="isExplainAsk">
    <div class="explanation">Morpion, also known as Tic-Tac-Toe,
      is a classic two-player game played on a 3x3 grid.
      Players take turns placing their symbol (either "X" or "O") on empty spaces.
      The goal is to be the first to create a line of three of their symbols horizontally, vertically, or diagonally.
      The game ends in a draw if the grid fills up without a winner.
      It's a simple yet engaging game of strategy and quick thinking.
    </div>
    <button class="btn_m" @click="Explaination">Let's Play</button>
  </div>

  <div class="modal_c" v-if="isGameMode">
    <div class="bg_m"></div>
    <div class="choice_container">
      <button class="btn_mode" @click="ChangeMode">1 Player</button>
      <button class="btn_mode" @click="ChangeMode">2 Players</button>
    </div>
  </div>


  <div class="main_container">
    <div class="header">
      <div class="title">
        <h1>MORPIO</h1>
        <img class="img_explanation" src="../icons/question.png" @click="Explaination">
      </div>
    </div>

    <div class="body">

      <div class="morpion_container" @click="PlayerTurn">
        <div class="board" v-for="(cell, index) in board" :key="index" @click="toggleActive(cell, index)"
          :class="{ P1: isP1(index), P2: isP2(index), cellWin: isCellWin(index) }">
          {{ cell }}
        </div>
      </div>

      <div class="player_infos">
        <div class="title_h">
          History
        </div>
        <div class="history" v-for="(input, index) in history" :key="index">
          <div class="input_history">
            {{ index + 1 }} - {{ input }}
          </div>
        </div>
      </div>

      <div class="turn_container">
        <div class="turn">
          {{ player_turn }} to play
        </div>
      </div>

      <button class="change_player" @click="ChangeMode">GameMode</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isExplainAsk = ref(false)
function Explaination() {
  if (isExplainAsk.value) {
    isExplainAsk.value = false;
    console.log('IsExplainAsk_F')
  } else {
    isExplainAsk.value = true;
    console.log('IsExplainAsk_T')
  }
}

const isGameMode = ref(true)
function ChangeMode() {
  if (isGameMode.value) {
    isGameMode.value = false
  } else {
    isGameMode.value = true
    resetGame2()
  }
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const wincell = ref([]);
let gameEnded = false
const board = ref(["", "", "", "", "", "", "", "", ""]);
const player_turn = ref("Player 1")
const P1 = ref([])
const P2 = ref([])
let count = 0
const history = ref([])

function toggleActive(cell, index) {

  if (player_turn.value === "Player 1") {
    P1.value.push(index)
    console.log(P1.value)
  } else if (player_turn.value === "Player 2") {
    P2.value.push(index)
    console.log(P2.value)
  }

  count += 1

  if (count === 9 && !gameEnded) {
    console.log("draw")
    history.value.push("Draw")
    resetGame()
  } else {
    checkWinCondition(player_turn.value, index);
  }


  if (player_turn.value === "Player 1") {
    player_turn.value = "Player 2"
  } else if (player_turn.value === "Player 2") {
    player_turn.value = "Player 1"
  }
}


function checkWinCondition(player, index) {
  if (gameEnded) {
    return;
  }

  const currentPlayerMoves = player === "Player 1" ? P1.value : P2.value;

  for (const winCondition of winConditions) {
    const isWin = winCondition.every(cellIndex => currentPlayerMoves.includes(cellIndex));

    if (isWin) {
      console.log(player + " Win");
      history.value.push(player + " Win")
      gameEnded = true;
      wincell.value.push(...winCondition);
      console.log(wincell.value);
      resetGame();
    }
  }
}

const isP1 = (index) => {
  return P1.value.includes(index)
}
const isP2 = (index) => {
  return P2.value.includes(index)
}
const isCellWin = (index) => {
  return wincell.value.includes(index)
}

function resetGame() {
  setTimeout(() => {
    P1.value.splice(0, P1.value.length)
    P2.value.splice(0, P2.value.length)
    wincell.value.splice(0, wincell.value.length)
    player_turn.value = "Player 1"
    gameEnded = false
    count = 0
  }, 1300)
}

function resetGame2() {
  P1.value.splice(0, P1.value.length)
  P2.value.splice(0, P2.value.length)
  history.value.splice(0, history.value.length)
  wincell.value.splice(0, wincell.value.length)
  player_turn.value = "Player 1"
  gameEnded = false
  count = 0
}

const turn = ref(false)

function getEmptyCells() {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

function makeAIMove() {
  const emptyCells = getEmptyCells();

  if (emptyCells.length > 0) {
    // Choisissez une case vide au hasard
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];
    board[selectedCell] = "O"; // Utilisez le symbole de l'IA (par exemple, "O")

    // Mettez à jour les données et vérifiez si l'IA a gagné ou s'il y a un match nul
    checkWinCondition(player_turn.value, selectedCell);
    // Passez le tour au joueur suivant (Player 1)
    player_turn.value = "Player 1";
  }
}

function PlayerTurn() {
  if (turn.value) {
    turn.value = false;
    // C'est le tour de l'IA (Player 2), appelez la fonction pour faire jouer l'IA
    if (player_turn.value === "Player 2") {
      makeAIMove();
    }
  } else {
    turn.value = true;
  }
}

</script>
















<style>
@import '../assets/morpio.css';
</style>