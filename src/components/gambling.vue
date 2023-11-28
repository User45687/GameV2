
<style>
@import "../assets/gambling.css";
</style>
<template>
   <div class="g_game_container">

      <div class="g_roul_container">
         <div class="g_roul_content" :class="{ g_roul_content_roll: isRolling }">
            <input class="g_roul_result" :value="randomnumber" @click="roll" 
            :class="{ g_roul_btn_disabled: isRolling }" readonly>
         </div>
      </div>

      <div class="g_bet_container">

         <div class="g_bet_0_container">
            <input class="g_bet_0" value="0" readonly>
         </div>

         <div class="g_bet_content">
            <div class="g_bet_row" v-for="betrow in bets">
               <div class="g_bet" v-for="bet in betrow">
                  <input class="g_bet_input" readonly :value="bet" @click="Betting(bet)"
                     :class="{ g_bet_input_active: isBetting(bet), g_red: isRed(bet)  }">
               </div>
            </div>

            <div class="g_bet_bottom_container">
               <div class="g_bet_bottom_content">
                  <input class="g_input_bottom_1" value="1st 12" readonly>
                  <input class="g_input_bottom_1" value="2nd 12" readonly>
                  <input class="g_input_bottom_1" value="3rd 12" readonly>
               </div>
               <div class="g_bet_bottom_content">
                  <input class="g_input_bottom_2" value="1-18" readonly>
                  <input class="g_input_bottom_2" value="EVEN" readonly>
                  <input class="g_input_bottom_2" value="RED" readonly>
                  <input class="g_input_bottom_2" value="BLACK" readonly>
                  <input class="g_input_bottom_2" value="ODD" readonly>
                  <input class="g_input_bottom_2" value="19-36" readonly>
               </div>
            </div>
         </div>

         <div class="g_bet_right_container">
            <input class="g_input_right" value="2 TO 1" readonly>
            <input class="g_input_right" value="2 TO 1" readonly>
            <input class="g_input_right" value="2 TO 1" readonly>
         </div>
   </div>



</div></template>
 
<script setup>
import { ref } from 'vue';

const bets = [
   [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
   [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
   [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
]

const red = [
   1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34
]


const isRolling = ref(false)
const randomnumber = ref(RandomNumber())
const Array_bet = ref([])


function RandomNumber() {
   return Math.floor(Math.random() * 36) + 1;
}


function roll() {
   isRolling.value = true

   const intervalId = setInterval(() => {
      randomnumber.value = RandomNumber()
   }, 100)

   setTimeout(() => {
      isRolling.value = false
      clearInterval(intervalId)
   }, 4000)

}

function Betting(bet) {
   const index = Array_bet.value.indexOf(bet);

   if (index !== -1) {
      Array_bet.value.splice(index, 1);
   } else {
      Array_bet.value.push(bet);
   }
}

const isBetting = (bet) => {
   return Array_bet.value.includes(bet)
}

const isRed = (bet) => {
   return red.includes(bet)
}

</script>
 
 