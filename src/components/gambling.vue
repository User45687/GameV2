<template>
  <div class="main_container">
   <div class="roulette">
    <h1>Gambling</h1>
    <div class="result_container">
     <input class="result_input" readonly :value="result">
    </div>
   </div>
   <div class="mise_container">
    <h3>Mise</h3>
    <button class="mise_btn" v-for="(number, index) in numbers" :key="number" @click="TakeAnswer(number)"
    :class="{ 
       mise_btn_select: isSelect(number),
       mise_btn_win: isWinNumb && isWinningNumber(number),
       mise_btn_loose: isLooNumb && isLosingNumber(number),
       blinking: blinkingIndex === index
    }">
     {{ number }}
    </button>
   </div>
  </div>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 
 const numbers = ref([...Array(37).keys()]);
 const numbers_select = ref([]);
 const result = ref(null);
 const answer = ref(null);
 
 const isWinNumb = ref(false);
 const isLooNumb = ref(false);
 
 const blinkingIndex = ref(-1);
 
 function TakeAnswer(number) {
  answer.value = number;
  if (isSelect(number)) {
   const i = numbers_select.value.indexOf(number);
   numbers_select.value.splice(i, 1);
  } else {
   numbers_select.value.push(number);
  }
 }
 
 function resetButtons() {
  numbers_select.value = [];
  isWinNumb.value = false;
  isLooNumb.value = false;
  blinkingIndex.value = -1; 
 }
 
 function simulateBlinking(index) {
  blinkingIndex.value = index;
  setTimeout(() => {
   blinkingIndex.value = -1;
  }, 300);
 }
 
 setInterval(() => {
  result.value = Math.floor(Math.random() * 37); 
 
  if (isSelect(result.value)) {
   isWinNumb.value = true;
   isLooNumb.value = false;
  } else {
   isWinNumb.value = false;
   isLooNumb.value = true;
  }
  setTimeout(() => {
   resetButtons();
  }, 3000);
 
  // Simuler le clignotement pour chaque bouton
  for (let i = 0; i < numbers.length; i++) {
   simulateBlinking(i);
  }
 }, 5000);
 
 const isSelect = (number) => {
  return numbers_select.value.includes(number);
 };
 
 const isWinningNumber = (number) => {
  return isSelect(number) && number === result.value;
 };
 
 const isLosingNumber = (number) => {
  return !isSelect(number) && number === result.value;
 };
 </script>
 
 <style>
 @import "../assets/gambling.css";
 
 .blinking {
  animation: blink 0.3s infinite alternate;
 }
 
 @keyframes blink {
  from {
   opacity: 1;
  }
 
  to {
   opacity: 0;
  }
 }
 </style>
 