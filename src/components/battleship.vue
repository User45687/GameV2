<style>
@import url(../assets/battleship.css);
</style>

<template>
 <div class="b_game_container">
  <div class="b_title_container">
   <div class="b_title">BATTLESHIP</div>
   <div class="b_countship_container">
    Remaining ships : {{ countship }}
   </div>

   <div class="b_shipselection">
    <div v-for="ship in availableShips" :key="ship.name">
     <button @click="selectShip(ship)">{{ ship.name }}</button>
    </div>
   </div>

  </div>

  <div class="b_shipgrid_container">
   <div class="b_shipgrid_row" v-for="(row, rowIndex) in player1_shipgrid" :key="rowIndex">
    <div class="b_shipgrid" v-for="(cell, cellIndex) in row" :key="cellIndex">
     <input class="b_shipgrid_cell" readonly @click="placeShip(rowIndex, cellIndex)"
      :class="{ 'b_shipgrid_cell_selected': isCellSelected(rowIndex, cellIndex) }" :disabled="isCellDisabled">
    </div>
   </div>
  </div>


 </div>
</template>

<script setup>
import { ref } from 'vue';

const player1_shipgrid = ref(Array.from({ length: 10 }, () => Array(10).fill("")));
const player1_ship = ref([]);
const countship = ref(10);
const isCellDisabled = ref(false);
const selectedShip = ref(null);

const availableShips = [
 { name: "Bateau 1.1", W: 2, H: 0 },
 { name: "Bateau 1.2", W: 0, H: 2 },
 { name: "Bateau 2", W: 7, H: 0 },
 // Ajoutez d'autres bateaux prédéfinis si nécessaire
];

function isCellSelected(rowIndex, cellIndex) {
 return player1_ship.value.some(([r, c]) => r === rowIndex && c === cellIndex);
}

function selectShip(ship) {
 selectedShip.value = ship;
}

function placeShip(rowIndex, cellIndex) {
 if (selectedShip.value) {
  const { W, H, name } = selectedShip.value;
  const canPlaceShip = canPlaceShipAt(rowIndex, cellIndex, W, H);

  if (canPlaceShip) {
   for (let i = 0; i < W; i++) {
    player1_shipgrid.value[rowIndex][cellIndex + i] = name;
    player1_ship.value.push([rowIndex, cellIndex + i]);
   }

   if (canPlaceShip) {
    for (let i = 0; i < H; i++) {
     player1_shipgrid.value[rowIndex + i][cellIndex] = name;
     player1_ship.value.push([rowIndex + i, cellIndex]);
    }


    countship.value--;
    selectedShip.value = null;
   }
  }
 }
}

function canPlaceShipAt(rowIndex, cellIndex, W, H) {
 if (rowIndex + H > 10 || cellIndex + W > 10) {
  return false;
 }

 if (W > 0) { // Bateau orienté horizontalement
  for (let i = 0; i < H; i++) {
   for (let j = 0; j < W; j++) {
    if (player1_shipgrid.value[rowIndex + i][cellIndex + j] !== "") {
     return false;
    }
   }
  }
 } else if (H > 0) { // Bateau orienté verticalement
  for (let i = 0; i < H; i++) {
   for (let j = 0; j < Math.abs(W); j++) {
    if (player1_shipgrid.value[rowIndex + i][cellIndex + j] !== "") {
     return false;
    }
   }
  }
 }

 return true;
}

</script>
