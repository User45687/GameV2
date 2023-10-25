<style>
@import url(../assets/mastermind.css);
</style>

<template>
  <div class="m_game_container">

    <div class="m_win_container">
      <div class="m_h3">RESULT</div>
      <div class="m_win_content">
        <input class="m_win_input" readonly v-for="color in Arraywin" :class="{
          'm_red': color === 'red',
          'm_blue': color === 'blue',
          'm_purple': color === 'purple',
          'm_brown': color === 'brown',
          'm_pink': color === 'pink',
          'm_yellow': color === 'yellow',
        }">
      </div>
    </div>


    <div class="m_selected_and_choice">
      <div class="m_h3">MASTERMIND</div>
      <div class="m_choice_container">
        <input class="m_choice_input" readonly v-for="color in currentColor" @click="SelectColor(color)" :class="{
          'm_red': color === 'red',
          'm_blue': color === 'blue',
          'm_purple': color === 'purple',
          'm_brown': color === 'brown',
          'm_pink': color === 'pink',
          'm_yellow': color === 'yellow',
        }">
      </div>

      <div class="m_selected_color_container">
        <input class="m_selected_color" readonly v-for="colorSelected in selectedColor" :class="{
          'm_red': colorSelected === 'red',
          'm_blue': colorSelected === 'blue',
          'm_purple': colorSelected === 'purple',
          'm_brown': colorSelected === 'brown',
          'm_pink': colorSelected === 'pink',
          'm_yellow': colorSelected === 'yellow',
          'm_empty': colorSelected === '',
        }">
      </div>


    </div>

    <div class="m_history_global">
      <div class="m_h3">HISTORY</div>
      <div class="m_history_container" ref="m_history_container">
        <div class="m_history_content" v-for="array in Arrayhistory">
          <div class="m_history_body">
            <input class="m_history_input" readonly v-for="answer in array" :class="{
              'm_red': answer.color === 'red',
              'm_blue': answer.color === 'blue',
              'm_purple': answer.color === 'purple',
              'm_brown': answer.color === 'brown',
              'm_pink': answer.color === 'pink',
              'm_yellow': answer.color === 'yellow',
            }">
          </div>

          <div class="m_history_body m_history_clue_container">
            <input class="m_history_input_clue" readonly v-for="clue in array" :class="{
              'm_clue_W': clue.clue === 'W',
              'm_clue_M': clue.clue === 'M',
              'm_clue_L': clue.clue === 'L'
            }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentColor = ['red', 'blue', 'purple', 'brown', 'pink', 'yellow'];
function randowArray() {
  const randowArray = [];
  for (let i = 0; i < 4; i++) {
    const randowColor = currentColor[Math.floor(Math.random() * currentColor.length)];
    randowArray.push(randowColor);
  }
  return randowArray;
}
const Arraywin = randowArray()
console.log(Arraywin)


const selectedColor = ref([])
const count = ref(0)
const Arrayhistory = ref([])
const m_history_container = ref(null)

function SelectColor(color) {
  selectedColor.value.push(color)
  count.value++

  if (count.value === 4) {
    CheckWin()
    count.value = 0
  }
}

function CheckWin() {
  console.log('check');
  if (JSON.stringify(selectedColor.value) === JSON.stringify(Arraywin)) {
    console.log('Win');
  } else {
    console.log('loose');

    const clues = [];

    for (let i = 0; i < 4; i++) {
      if (Arraywin[i] === selectedColor.value[i]) {
        clues.push({ color: selectedColor.value[i], clue: 'W' });
      } else if (Arraywin.includes(selectedColor.value[i])) {
        clues.push({ color: selectedColor.value[i], clue: 'M' });
      } else {
        clues.push({ color: selectedColor.value[i], clue: 'L' })
      }
    }
    console.log(Arraywin[0])
    console.log(selectedColor.value[0])
    console.log(clues)
    Arrayhistory.value.push([...clues]);
    selectedColor.value = [];
    console.log(Arrayhistory.value);
  }
}

</script>
