<template>
  <div class="main_container">
    <div class="table_container">
      <table class="table">
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td v-for="(cell, colIndex) in row" :key="colIndex" class="cell" @click="dropToken(colIndex, rowIndex)">
            <div class="cell-content" :class="getCellClass(colIndex, rowIndex)"></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const grid = ref([
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '']
]);

const tokens = ref([]);
const activePlayer = ref('B');

function dropToken(colIndex, rowIndex) {
  const currentPlayer = activePlayer.value;

  
  for (let r = grid.value.length - 1; r >= 0; r--) {
    if (!tokens.value.find(token => token.row === r && token.col === colIndex)) {
      tokens.value.push({ row: r, col: colIndex, player: currentPlayer });
      activePlayer.value = currentPlayer === 'B' ? 'O' : 'B';
      break;
    }
  }

  if(checkWin(colIndex, rowIndex)){
    console.log("win")
  } else {
    console.log("loose")
  }
}

function getCellClass(colIndex, rowIndex) {
  const playerToken = tokens.value.find(token => token.row === rowIndex && token.col === colIndex);
  if (playerToken) {
    return playerToken.player + 'Token';
  } else {
    return '';
  }
}

function checkWin(colIndex, rowIndex) {
  const currentPlayer = activePlayer.value;
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (const [dx, dy] of directions) {
    let count = 1;

    // Recherchez vers la gauche et la droite à partir du dernier jeton déposé
    for (let i = -1; i >= -3; i--) {
      const newRow = rowIndex + i * dy;
      const newCol = colIndex + i * dx;

      if (
        newRow >= 0 && newRow < grid.value.length &&
        newCol >= 0 && newCol < grid.value[0].length
      ) {
        const token = tokens.value.find(token => token.row === newRow && token.col === newCol && token.player === currentPlayer);
        if (token) {
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    // Recherchez vers la gauche et la droite à partir du dernier jeton déposé
    for (let i = 1; i <= 3; i++) {
      const newRow = rowIndex + i * dy;
      const newCol = colIndex + i * dx;

      if (
        newRow >= 0 && newRow < grid.value.length &&
        newCol >= 0 && newCol < grid.value[0].length
      ) {
        const token = tokens.value.find(token => token.row === newRow && token.col === newCol && token.player === currentPlayer);
        if (token) {
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    if (count >= 4) {
      // Le joueur actif a gagné
      console.log(currentPlayer + ' a gagné !');
      // Vous pouvez ajouter ici d'autres actions de fin de jeu
      return true;
    }
  }

  return false;
}
  



</script>

<style>
@import url(../assets/connectIO.css);
</style>
