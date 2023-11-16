<style>
@import url(../assets/yahtzee.css)
</style>

<template>
 <div class="y_game_container">


  <div class="y_dice_container">
   <div class="y_dice_content">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice1] + ')' }"
     @click="letDisableDice1" :class="{ y_isDisableDice: DisableDice1 }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice2] + ')' }"
     @click="letDisableDice2" :class="{ y_isDisableDice: DisableDice2 }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice3] + ')' }"
     @click="letDisableDice3" :class="{ y_isDisableDice: DisableDice3 }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice4] + ')' }"
     @click="letDisableDice4" :class="{ y_isDisableDice: DisableDice4 }">
    <input class="y_dice" readonly :style="{ backgroundImage: 'url( ' + dice_icons[dice5] + ')' }"
     @click="letDisableDice5" :class="{ y_isDisableDice: DisableDice5 }">
    <button class="y_btn_roll" @click="Roll()" :class="{ y_btn_roll_disabled: isRollDisabled }">ROLL</button>
   </div>
  </div>

  <div class="y_table_container">
   <div class="y_table_content">
    <div class="y_table" v-for="cat in cat_name">
     <input class="y_table_cat" readonly :value="cat">
     <input class="y_table_input">
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

const cat_name = ref([
 "Aces",
 "Twos",
 "Threes",
 "Fours",
 "Fives",
 "Sixes",
 "Three of a Kind",
 "Four of a Kind",
 "Full House",
 "Small Straight",
 "Large Straight",
 "Yahtzee",
 "Chance"
]);

function setRandomNumber() {
 const randomNumber = Math.floor(Math.random() * 6) + 1;
 return randomNumber
}

const dice1 = ref(setRandomNumber())
const dice2 = ref(setRandomNumber())
const dice3 = ref(setRandomNumber())
const dice4 = ref(setRandomNumber())
const dice5 = ref(setRandomNumber())

const DisableDice1 = ref(false)
const DisableDice2 = ref(false)
const DisableDice3 = ref(false)
const DisableDice4 = ref(false)
const DisableDice5 = ref(false)

const countRoll = ref(0)
const isRollDisabled = ref(false)

function letDisableDice1() {
 DisableDice1.value = !DisableDice1.value
}
function letDisableDice2() {
 DisableDice2.value = !DisableDice2.value
}
function letDisableDice3() {
 DisableDice3.value = !DisableDice3.value
}
function letDisableDice4() {
 DisableDice4.value = !DisableDice4.value
}
function letDisableDice5() {
 DisableDice5.value = !DisableDice5.value
}

function preRoll() {
 if (!DisableDice1.value) {
  dice1.value = setRandomNumber()
 }
 if (!DisableDice2.value) {
  dice2.value = setRandomNumber()
 }
 if (!DisableDice3.value) {
  dice3.value = setRandomNumber()
 }
 if (!DisableDice4.value) {
  dice4.value = setRandomNumber()
 }
 if (!DisableDice5.value) {
  dice5.value = setRandomNumber()
 }
}

function Roll() {
 const intervalId = setInterval(preRoll, 100)

 setTimeout(() => {
  clearInterval(intervalId)
 }, 2000)
 countRoll.value++
 if (countRoll.value === 3) {
  isRollDisabled.value = true
 }
}

</script>