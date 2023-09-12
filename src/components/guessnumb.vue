<template>
 <div class="container">

  <!-- Header -->
  <div class="header">
   <div class="title">GuessNumb</div>

   <div class="ex-container">
   <div class="explanation">The goal is to find the right number between

    <input type="number" v-model="lim1" :max="lim2" class="lim1 inputex" @click="handleUpdate()"
     :class="{ 'LimUpdateTrue': isLimUpdate === true, 'LimUpdateFalse': isLimUpdate === false }">

    (inclusive) and

    <input type="number" v-model="lim2" :min="lim1" class="lim2 inputex" @click="handleUpdate()"
     :class="{ 'LimUpdateTrue': isLimUpdate === true, 'LimUpdateFalse': isLimUpdate === false }">

    (exclusive) with

    <input type="number" v-model="decimal" class="decimal inputex" placeholder="0 - 10" @click="handleUpdate()"
     :class="{ 'error-input': decimal > 10 || decimal < 0, 'LimUpdateTrue': isLimUpdate === true, 'LimUpdateFalse': isLimUpdate === false }">

    decimal places.
   </div>

   <!-- Start Button -->
   <button class="start-btn" @click="DefLimit" :disabled="decimal > 10 || decimal < 0 || isLimUpdate === false">
    PLAY
   </button>
  </div>
  </div>

  <!-- Body -->
  <div class="body" @keyup.enter="TakeAnswer">
   <div class="answer-container">

    <!-- Input de la réponse donnée -->
    <input type="number" v-model="Answer" class="input-default" placeholder="Your Answer" ref="answerInput"
     :class="{ 'input-valid': isAnswerValid === true, 'input-invalid': isAnswerValid === false }"
     :disabled="isLimUpdate === true">

     <!-- Submit btn -->
    <button @click="TakeAnswer" :disabled="decimal > 10 || decimal < 0 || isLimUpdate === true"
     class="submit-btn"><img  class="submit_btn_icon" src="../icons/jouer_green.png"></button>

   </div> 

   <!-- Historique des réponses -->
   <div class="history">
    <div class="title titleh">History</div>
    <div class="history-container">
     <div v-for="(entry, index) in history" :key="index += 1">
      <input class="count-history input-history" readonly :value="index">
      <input class="answer-history input-history" readonly :value="entry.answer">
      <img class="help-history input-history" readonly :src="entry.help">
     </div>
    </div>

   </div>
  </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';


//Init const pour les limites de result
const lim1 = ref(0);
const lim2 = ref(10);
const decimal = ref('0');
var result = ref('');
var _result = ref('')

var isLimUpdate = ref(true);

//Savoir si les lim ont été update
function handleUpdate() {
 console.log('update')
 isLimUpdate.value = true
 console.log(isLimUpdate)
}


//Fonction définit les limites du math.random pour le result
function DefLimit() {
 if(lim1.value > lim2.value){
  lim2.value = lim1.value + 2
 }

 function getRandomArbitrary(min, max) {
  isLimUpdate.value = false
  console.log(isLimUpdate)
  return Math.random() * (max - min) + min;
 }
 
 history.value = [];
 _result = getRandomArbitrary(lim1.value, lim2.value);
 result = _result.toFixed(decimal.value);
 console.log(result);

}

//Init const pour TakeAnswer
const Answer = ref('');
const isAnswerValid = ref('');
const history = ref([]);

import icon_correct from '../icons/verifie_green.png';
import icon_plus from '../icons/ajouter.png';
import icon_minus from '../icons/soustraire.png';

// Fonction comparaison entre answer et result
function TakeAnswer() {
 const answer = Answer.value;
 console.log(answer);
 let entry = {};

 if (answer == result) {
  console.log("Right");
  isAnswerValid.value = true;
  entry.help = icon_correct;
  entry.answer = answer;
 } else {
  console.log("Wrong");
  isAnswerValid.value = false;

  if (answer > result) {
   console.log("+");
   entry.help = icon_minus;
   entry.answer = answer;
  } else {
   console.log("-");
   entry.help = icon_plus;
   entry.answer = answer;
  }
 }
 //Push les valeurs help et answer du tableau entry dans le tableau history
 history.value.push(entry);

 Answer.value = null;
}
</script>

<style>
@import '../assets/guessnumb.css';

.error-input {
 background-color: red;
}

.LimUpdateTrue {
 border: 1px solid red;
}

.LimUpdateFalse {
 border: 1px solid #00ff00;
}
</style>
