<template>
 <div class="head">
  <div class="title">
   Slotio
  </div>
 </div>

 <div class="content_container">

  <div class="rules_container">
   <div class="rules_title">Combinations</div>

   <div class="combinations">

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/panier.png' class="icon_table">
      <img src='../icons/panier.png' class="icon_table">
      <img src='../icons/panier.png' class="icon_table">
     </div>
     <div class="multi">
      x20
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/gland.png' class="icon_table">
      <img src='../icons/gland.png' class="icon_table">
      <img src='../icons/gland.png' class="icon_table">
     </div>
     <div class="multi">
      x10
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/feuille.png' class="icon_table">
      <img src='../icons/feuille.png' class="icon_table">
      <img src='../icons/feuille.png' class="icon_table">
     </div>
     <div class="multi">
      x10
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/cerise.png' class="icon_table">
      <img src='../icons/cerise.png' class="icon_table">
      <img src='../icons/cerise.png' class="icon_table">
     </div>
     <div class="multi">
      x5
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/poire.png' class="icon_table">
      <img src='../icons/poire.png' class="icon_table">
      <img src='../icons/poire.png' class="icon_table">
     </div>
     <div class="multi">
      x5
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/pomme.png' class="icon_table">
      <img src='../icons/pomme.png' class="icon_table">
      <img src='../icons/pomme.png' class="icon_table">
     </div>
     <div class="multi">
      x5
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/panier.png' class="icon_table">
      <img src='../icons/panier.png' class="icon_table">
     </div>
     <div class="multi">
      x3
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/gland.png' class="icon_table">
      <img src='../icons/gland.png' class="icon_table">
     </div>
     <div class="multi">
      x3
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/feuille.png' class="icon_table">
      <img src='../icons/feuille.png' class="icon_table">
     </div>
     <div class="multi">
      x3
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/cerise.png' class="icon_table">
      <img src='../icons/cerise.png' class="icon_table">
     </div>
     <div class="multi">
      x3
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/poire.png' class="icon_table">
      <img src='../icons/poire.png' class="icon_table">
     </div>
     <div class="multi">
      x3
     </div>
    </div>

    <div class="row_comb">
     <div class="icon_table_container">
      <img src='../icons/pomme.png' class="icon_table">
      <img src='../icons/pomme.png' class="icon_table">
     </div>
     <div class="multi">
      x3
     </div>
    </div>


   </div>
  </div>

  <div class="game_container">
   <div class="slot_container">
    <div class="slot">
     <input class="input" readonly :style="{ backgroundImage: 'url(' + get_icon_1 + ')' }"
      :class="{ 'input_win': isWin1 }">
     <input class="input" readonly :style="{ backgroundImage: 'url(' + get_icon_2 + ')' }"
      :class="{ 'input_win': isWin2 }">
     <input class="input" readonly :style="{ backgroundImage: 'url(' + get_icon_3 + ')' }"
      :class="{ 'input_win': isWin3 }">
    </div>
    <button class="start_btn" @click="start()">ROLL</button>
   </div>

   <div class="bet_container">

    <div class="bet">
     <div class="bet_title">Credit Left:</div>
     <input class="bet_input" readonly :value="credit">
    </div>

    <div class="bet">
     <div class="bet_title">Make Your Bet:</div>
     <div class="bet_btn_container">
      <button class="bet_btn" @click="BetMoins()">-</button>
      <input class="bet_input" readonly :value="bet_number">
      <button class="bet_btn" @click="BetPlus()">+</button>
      <button class="bet_btn" @click="BetMax()">MAX</button>
     </div>
    </div>
   </div>
  </div>

 </div>
</template>

<script setup>
import { ref } from 'vue';

const icons =
 [
  '../src/icons/cerise.png',
  '../src/icons/feuille.png',
 '../src/icons/gland.png',
 '../src/icons/panier.png',
 '../src/icons/poire.png',
 '../src/icons/pomme.png'
]

function getRandomIcon() {
 const randomIndex = Math.floor(Math.random() * icons.length);
 return icons[randomIndex];
}

const get_icon_1 = ref('../src/icons/pomme.png')
const get_icon_2 = ref('../src/icons/gland.png')
const get_icon_3 = ref('../src/icons/panier.png')
const bet_number = ref(0)
const credit = ref(100)
const isWin1 = ref(false)
const isWin2 = ref(false)
const isWin3 = ref(false)

function start() {

 const intervalId = setInterval(Roll, 100);
 isWin1.value = false
 isWin2.value = false
 isWin3.value = false

 setTimeout(() => {
  clearInterval(intervalId);
  console.log(get_icon_1.value)
  console.log(get_icon_2.value)
  console.log(get_icon_3.value)
  checkResult()
  if (credit.value < bet_number.value) {
   bet_number.value = credit.value
  }
 }, 1600);


}

function Roll() {
 get_icon_1.value = getRandomIcon()
 get_icon_2.value = getRandomIcon()
 get_icon_3.value = getRandomIcon()
}

function checkResult() {

 //---------------------------------------------------------------3 WIN-------------------------------------------------------------------------------------------------
 if (get_icon_1.value === get_icon_2.value && get_icon_2.value === get_icon_3.value) {
  isWin1.value = true
  isWin2.value = true
  isWin3.value = true
  if (get_icon_1.value === '../src/icons/cerise.png' || get_icon_1.value === '../src/icons/poire.png' || get_icon_1.value === '../src/icons/pomme.png') {
   credit.value += bet_number.value * 5;
  } else if (get_icon_1.value === '../src/icons/feuille.png' || get_icon_1.value === '../src/icons/gland.png') {
   credit.value += bet_number.value * 10
  } else if (get_icon_1.value === '../src/icons/panier.png') {
   credit.value += bet_number.value * 20
  }
  //---------------------------------------------------------------2 WIN-------------------------------------------------------------------------------------------------
 } else if (get_icon_1.value === get_icon_2.value) {
  credit.value += bet_number.value * 3
  isWin1.value = true
  isWin2.value = true
 } else if (get_icon_1.value === get_icon_3.value) {
  credit.value += bet_number.value * 3
  isWin1.value = true
  isWin3.value = true
 } else if (get_icon_2.value === get_icon_3.value) {
  credit.value += bet_number.value * 3
  isWin3.value = true
  isWin2.value = true

  //---------------------------------------------------------------LOOSE-------------------------------------------------------------------------------------------------
 } else if (get_icon_1.value !== get_icon_2.value && get_icon_2.value !== get_icon_3.value && get_icon_1.value !== get_icon_3.value) {
  credit.value -= bet_number.value
 }
}

function BetMoins() {
 if (bet_number.value === 0) {
  bet_number.value = 0
 } else {
  bet_number.value -= 5
 }
}
function BetPlus() {
 if (bet_number.value >= credit.value) {
  bet_number.value = credit.value
 } else {
  bet_number.value += 5
 }
}
function BetMax() {
 bet_number.value = credit.value
}
</script>







<style scoped>
@import "../assets/slot.css"
</style>