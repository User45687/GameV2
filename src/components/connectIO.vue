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

if(tokens.value.find(token => token.row === rowIndex + 1 && token.col === colIndex)) {
 console.log('tombe pas')
 rowIndex = rowIndex + 1
} else {
 console.log('tombe')
}


 tokens.value.push({ row: rowIndex, col: colIndex, player: currentPlayer });
 
 activePlayer.value = currentPlayer === 'B' ? 'O' : 'B';
}

function getCellClass(colIndex, rowIndex) {
 const playerToken = tokens.value.find(token => token.row === rowIndex && token.col === colIndex);
 if (playerToken) {
   return playerToken.player + 'Token';
 } else {
   return '';
 }
}

</script>

<style>
 @import url(../assets/connectIO.css);
</style>
