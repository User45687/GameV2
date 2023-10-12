<template>
  <div class="main_container">
    <div class="header">
    </div>

    <div class="content">
      <div class="level">LEVEL:{{ level }}</div>
      <div class="game_container">
        <div ref="red_btn" class="button red" :class="{ 'isRed': isRed }" @click="red"></div>
        <div ref="green_btn" class="button green" :class="{ 'isGreen': isGreen }" @click="green"></div>
        <div class="rond">
          <div class="title" :class="{ 'winLevel': winLevel, 'looseLevel': looseLevel }">SIMON </div>
          <h6 class="h6" @click="play" :class="{ 'btn_disabled': isStart }">Start</h6>
        </div>
        <div ref="blue_btn" class="button blue" :class="{ 'isBlue': isBlue }" @click="blue"></div>
        <div ref="yellow_btn" class="button yellow" :class="{ 'isYellow': isYellow }" @click="yellow"></div>
      </div>
    </div>
  </div>

  <div class="history_container">
    <div class="history_title">HISTORY</div>
    <div class="history_content">
      <div class="historyArray" v-for="(input, index) in historyArray" :key="index">
        <span class="index">{{ index + 1}}</span><span class="inputArray">LEVEL {{ input }}</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const colors = ['red', 'green', 'blue', 'yellow']
const isStart = ref(false)
const red_btn = ref(null)
const green_btn = ref(null)
const blue_btn = ref(null)
const yellow_btn = ref(null)
const countP = ref(0)
const countW = ref(0)
const historyArray = ref([])

function red() {
  player.value.push("red")
  console.log(player.value)
  playerPlay()
}
function green() {
  player.value.push("green")
  console.log(player.value)
  playerPlay()
}
function blue() {
  player.value.push("blue")
  console.log(player.value)
  playerPlay()
}
function yellow() {
  player.value.push("yellow")
  console.log(player.value)
  playerPlay()
}

const level = ref(1)
const isRed = ref(false)
const isGreen = ref(false)
const isBlue = ref(false)
const isYellow = ref(false)
const color = ref('')
const win = ref([])
const player = ref([])
const winLevel = ref(false)
const looseLevel = ref(false)

function play() {
  countW.value++
  displayNextColor()
  isStart.value = true
  looseLevel.value = false
  winLevel.value = false
}

function playerPlay() {
  countP.value++;
  console.log(win.value[countP.value - 1]);
  console.log(player.value[countP.value - 1]);
  console.log('countP: ' + countP.value)
  console.log('countW: ' + countW.value)

  if (win.value[countP.value - 1] === player.value[countP.value - 1]) {
    console.log('vrai');

    if (countP.value === countW.value) {
      console.log('level gagné')
      countP.value = 0
      player.value = []
      level.value++
      winLevel.value = true
      setTimeout(() => {
        play()
        winLevel.value = false
      }, 500)
    }
  } else {
    console.log('Échec !');
    gameOver();
  }
}

async function displayNextColor() {
  addRandomColor();

  for (let i = 0; i < win.value.length; i++) {
    const color = win.value[i];
    setTimeout(() => {
      lightUpButton(color);
      setTimeout(() => {
        turnOffButton(color);
      }, 300);
    }, i * 700);
  }

}


function gameOver() {
  console.log('Game Over');
  win.value = [];
  player.value = [];
  isStart.value = false
  looseLevel.value = true
  historyArray.value.push(level.value)
  level.value = 1;
}

function lightUpButton(color) {
  switch (color) {
    case 'red':
      isRed.value = true;
      break;
    case 'green':
      isGreen.value = true;
      break;
    case 'blue':
      isBlue.value = true;
      break;
    case 'yellow':
      isYellow.value = true;
      break;
    default:
      break;
  }
}

function turnOffButton(color) {
  switch (color) {
    case 'red':
      isRed.value = false;
      break;
    case 'green':
      isGreen.value = false;
      break;
    case 'blue':
      isBlue.value = false;
      break;
    case 'yellow':
      isYellow.value = false;
      break;
    default:
      break;
  }
}

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function addRandomColor() {
  color.value = getRandomColor()
  console.log(color.value)
  win.value.push(color.value)
  console.log(win.value)
}


</script>
<style>
@import "../assets/simon.css"
</style>
