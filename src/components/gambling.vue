
<style>
@import "../assets/gambling.css";
</style>
<template>
   <div class="g_game_container">

      <div class="g_roul_container">
         <div class="g_roul_content" :class="{g_roul_content_roll: isRolling}" >
         </div>
         <button class="g_roul_btn" @click="roll" :class="{g_roul_btn_disabled: isRolling}">ROLL</button>
         <input class="g_roul_result" :value="randomnumber">
      </div>

      <div class="g_bet_container">
         <div class="g_bet_content">
            <div class="g_bet" v-for="bet in bets">
               <input class="g_bet_input" readonly :value="bet" @click="Betting(bet)">
            </div>
         </div>
      </div>



   </div>
</template>
 
<script setup>
import { ref } from 'vue';

const bets = []
for(let i = 0; i < 37;i++) {
   bets.push(i)
}


const isRolling = ref(false)
const randomnumber = ref(RandomNumber())
const Array_bet = ref([])


function RandomNumber() {
   return Math.floor(Math.random()* 36) +1;
}


function roll() {
   isRolling.value = true

   const intervalId = setInterval(()=> {
      randomnumber.value = RandomNumber()
   },100)
   
   setTimeout(()=> {
      isRolling.value = false
      clearInterval(intervalId)
   },4000)

}

function Betting(bet) {
   console.log(bet)
   Array_bet.value.push(bet)
   console.log(Array_bet.value)
}


</script>
 
 