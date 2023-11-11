<style>
@import url(../assets/hangman.css);
</style>

<template>
  <div class="h_game_container">
    <div class="h_game_content">

      <div class="h_title_container">
        <div class="h_title">HANGMAN</div>
      </div>

      <div class="h_word_container">
        <div class="h_word_content">
          <div class="h_word" v-for="(letter, index) in arrayNewWord" :key="index">
            <input class="h_letter" v-model="arrayNewWord[index]" readonly
              :class="{ h_letter_active: isLetterActive(index) }">
          </div>
        </div>
      </div>

      <div class="h_keyboard_container" v-if="!isGameOver">
        <div class="h_keyboard_content">
          <div class="h_keyboard_row" v-for="row in keyboard">
            <div class="h_keyboard" v-for="keys in row">
              <input class="h_keyboard_keys" :value="keys" @click='takePlayerInput(keys)' readonly
                :class="{ h_keyboard_keys_selected: isKeySelected(keys) }">
            </div>
          </div>
        </div>
      </div>

      <div class="h_gameover_container" v-if="isGameOver">
        <div class="h_gameover_w h_gameover_content" v-if="isGameOverW">GAME SUCESS</div>
        <div class="h_gameover_l h_gameover_content" v-if="isGameOverL">GAME LOOSE</div>
        <button class="h_retry_btn" @click="restartGame">NEW GAME ?</button>

      </div>


      <div class="h_hangman_container">
        <div class="h_hangman_content">
          <img :src="currentImg" class="h_hangman_img">
        </div>
      </div>


    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const keyboard = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "k", "L", "M"],
  ["W", "X", "C", "V", "B", "N"]
]
const hangmanImg = [
  '../src/hangman_png/HangMan0.png',
  '../src/hangman_png/HangMan1.png',
  '../src/hangman_png/HangMan2.png',
  '../src/hangman_png/HangMan3.png',
  '../src/hangman_png/HangMan4.png',
  '../src/hangman_png/HangMan5.png',
  '../src/hangman_png/HangMan6.png',
  '../src/hangman_png/HangMan7.png',
  '../src/hangman_png/HangMan8.png',
  '../src/hangman_png/HangMan9.png',
  '../src/hangman_png/HangMan10.png',
  '../src/hangman_png/HangMan11.png',
]
const wordsFR = ref([]);
const word = ref('');
const arrayNewWord = ref([])
const winletter = ref([])
const key = ref('')
const selectedKeys = ref([])
const countError = ref(0)
const currentImg = ref(hangmanImg[countError.value])
const isGameOver = ref(false)
const isGameOverW = ref(false)
const isGameOverL = ref(false)

const fetchWords = async () => {
  try {
    const response = await fetch('../src/listwords/listFR.txt');
    const text = await response.text();
    wordsFR.value = text.split('\n');
    newWord();
  } catch (error) {
    console.error('Erreur lors du chargement des mots:', error);
  }
};
fetchWords();

function newWord() {
  if (wordsFR.value.length > 0) {
    const indiceAleatoire = Math.floor(Math.random() * wordsFR.value.length);
    word.value = wordsFR.value[indiceAleatoire];
    arrayNewWord.value = word.value.split('') 
  }
};

function takePlayerInput(keys) {
  key.value = keys
  console.log(key.value)

  checkWin(key)
}

function checkWin(key) {

  if (arrayNewWord.value.includes(key.value)) {
    console.log('win')
    for (let i = 0; i < arrayNewWord.value.length; i++) {
      if (arrayNewWord.value[i] === key.value) {
        winletter.value.push(i)
      }
    }
  } else {
    console.log('loose')
    countError.value++
    currentImg.value = hangmanImg[countError.value]
  }
  selectedKeys.value.push(key.value)
  checkGameOver()
}

function checkGameOver() {

  if(winletter.value.length === arrayNewWord.value.length) {
    isGameOver.value = true
    isGameOverW.value = true
  } else if (countError.value === 11) {
    console.log('gameover:loose')
    isGameOver.value = true
    isGameOverL.value = true
  }  
}

function restartGame() {
  isGameOver.value = false
  isGameOverW.value = false
  isGameOverL.value = false
  winletter.value = []
  selectedKeys.value = []
  countError.value = 0
  currentImg.value = hangmanImg[countError.value]
  newWord()
}

const isLetterActive = (index) => {
  return winletter.value.includes(index)
}

const isKeySelected = (keys) => {
  return selectedKeys.value.includes(keys)
}


</script>
  