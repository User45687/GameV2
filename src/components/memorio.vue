<template>
  <div class="container_main">

    <div class="card_container" :disabled="isStart">
      <div class="card" v-for="(card, index) in cards"
        :class="{ active: isActive(index), win: isWin(index), disabled: !isStart }" @click="toggleActive(index, card)"
        :key="index">
        <input class="input_card" :value="card" readonly
          :class="{ input_active: isActive(index), input_win: isWin(index) }">
      </div>
    </div>

    <div class="info_container">
      <div class="title">
        <h1>MEMORIO</h1>
      </div>

      <div class="details_container">
        <div class="rule">The goal of a memory game is to enhance cognitive skills by challenging players to match pairs
          of cards,
          typically placed face-down. Players must remember the position of each card and make strategic choices to
          uncover matching pairs,
          aiming to complete the game with the fewest moves and shortest time possible.
        </div>
        <div class="point">
          <div class="score">
            Score : {{ score }} points
          </div>
          <div class="time">
            Time : {{ time }} seconds
          </div>
        </div>
      </div>

      <input readonly class=" launch-btn start" @click="Start" value="Start" :disabled="isStart">
      <input readonly class="launch-btn restart" @click="Start" value="Restart" :disabled="!isStart">

    </div>
  </div>

  <div class="modal_f" v-if="isGameFinished">
  <div class="modal_background"></div>
  <div class="modal_content">
    <div class="modal_h">
      <h1>Complete</h1>
    </div>
    <div class="modal_b">
      <p>Time: {{ time }}</p>
      <p>Points: {{ score }}</p>
      <p>Final Score: {{ final_score }}</p>
      <button class="again_btn" @click="newGame">New Game ?</button>
    </div> 
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const cards = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
]);

for (let i = cards.value.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards.value[i], cards.value[j]] = [cards.value[j], cards.value[i]];
}


const activeIndices = ref([]);
const winIndices = ref([]);
const maxEntries = 2;
const card1 = ref(0);
const card2 = ref(0);
const score = ref(0);
const isGameFinished = ref(false);
const final_score = ref(0);



const toggleActive = (index, card) => {

  if (isActive(index)) {
    const i = activeIndices.value.indexOf(index);
    activeIndices.value.splice(i, 1);
    if (card1.value === card) {
      card1.value = 0;
    } else if (card2.value === card) {
      card2.value = 0;
    }

  } else {
    if (card1.value === 0 && activeIndices.value.length < maxEntries) {
      activeIndices.value.push(index);
      card1.value = card;
    } else if (activeIndices.value.length < maxEntries) {
      activeIndices.value.push(index);
      card2.value = card;

      if (card1.value === card2.value) {
        console.log("Win")
        winIndices.value.push(...activeIndices.value);
        activeIndices.value.splice(0, activeIndices.value.length);
        card1.value = 0;
        card2.value = 0;
        score.value += 10;

      } else {
        score.value -= 2;
        setTimeout(function () {
          console.log("loose")
          card1.value = 0;
          card2.value = 0;
          activeIndices.value.splice(0, activeIndices.value.length);
        }, 700)
      }

    }
  }

  if (winIndices.value.length === 30) {
    console.log("finit le S")
    final_score.value = score.value * score.value / time.value * 10;
    final_score.value = Math.floor(final_score.value).toString();
    isGameFinished.value = true;
    clearInterval(IntervalID);
  }


  console.log(activeIndices.value)
  console.log(winIndices.value)
  console.log(index);
  console.log(card1.value)
  console.log(card2.value)
};

const isActive = (index) => {
  return activeIndices.value.includes(index);
};

const isWin = (index) => {
  return winIndices.value.includes(index);
};

const time = ref(0);
const isStart = ref(false)
let IntervalID = null

function Start() {
  if (isStart.value === false) {
    IntervalID = setInterval(() => {
      time.value++
    }, 1000)
    isStart.value = true

  } else {
    console.log("2")
    clearInterval(IntervalID);
    isStart.value = false
    time.value = 0;
    score.value = 0;
    activeIndices.value.splice(0, activeIndices.value.length)
    winIndices.value.splice(0, winIndices.value.length)

    setTimeout(() => {
      mixCard()
    }, 500)
  }
}

function mixCard() {
  for (let i = cards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards.value[i], cards.value[j]] = [cards.value[j], cards.value[i]];
  }
}

function newGame() {
  isGameFinished.value = false;
  isStart.value = true;
  Start();
}
</script>




<style>
@import "../assets/memorio.css";
</style>
  