<style>
@import url(../assets/yahtzee.css)
</style>

<template>
 <div class="y_game_container">


  <div class="y_dice_container">
   <div class="y_dice_content">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice1] + ')' }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice2] + ')' }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice3] + ')' }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice4] + ')' }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice5] + ')' }">
   </div>
   <button @click="Roll()">Roll</button>
  </div>

  <div class="y_history_container">
   <div class="y_history_content">
    <div class="y_history">
     <div class="y_history_title">HISTORY</div>
     
     </div>
    </div>
   </div>

 </div>
</template>

<script setup>
import { ref } from 'vue';

const dice_icons = ref([
 '../src/dice_png/dice_1.png',
 '../src/dice_png/dice_1.png',
 '../src/dice_png/dice_2.png',
 '../src/dice_png/dice_3.png',
 '../src/dice_png/dice_4.png',
 '../src/dice_png/dice_5.png',
 '../src/dice_png/dice_6.png',
])

function setRandomNumber() {
 const randomNumber = Math.floor(Math.random() * 6) + 1;
 return randomNumber
}

const dice1 = ref(setRandomNumber())
const dice2 = ref(setRandomNumber())
const dice3 = ref(setRandomNumber())
const dice4 = ref(setRandomNumber())
const dice5 = ref(setRandomNumber())

function preRoll() {
 dice1.value = setRandomNumber()
 dice2.value = setRandomNumber()
 dice3.value = setRandomNumber()
 dice4.value = setRandomNumber()
 dice5.value = setRandomNumber()
}

function Roll() {
 const intervalId = setInterval(preRoll, 100)

 setTimeout(() => {
  clearInterval(intervalId)
 }, 2000)
}
</script>