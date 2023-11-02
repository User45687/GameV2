<style>
@import url(../assets/mastermind.css);
</style>


<template>
  <div class="m_game_container">

    <div class="m_win_container">
      <div class="m_h3">RESULT</div>
      <div class="m_win_content" v-if="isShowResult">
        <input class="m_win_input" readonly v-for="color in Arraywin" :class="{
          'm_red': color === 'red',
          'm_blue': color === 'blue',
          'm_purple': color === 'purple',
          'm_brown': color === 'brown',
          'm_pink': color === 'pink',
          'm_yellow': color === 'yellow',
        }">
      </div>
      <div class="m_difficult_container">
        <div class="m_difficult_show">{{ selectedDifficulty - turn }} TRY LEFT</div>
      </div>
    </div>


    <div class="m_selected_and_choice">
      <div class="m_h3">MASTERMIND<span class="m_explanation_btn" @click="ModalExplaination">HOW TO PLAY</span></div>
      <div class="m_choice_container" v-if="!isGameOver">
        <input class="m_choice_input" readonly v-for="color in currentColor" @click="SelectColor(color)" :class="{
          'm_red': color === 'red',
          'm_blue': color === 'blue',
          'm_purple': color === 'purple',
          'm_brown': color === 'brown',
          'm_pink': color === 'pink',
          'm_yellow': color === 'yellow',
        }">
      </div>

      <div class="m_selected_color_container" v-if="!isGameOver">
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

      <div class="m_gameover_container_L" v-if="isGameOver === 'LOOSE'">
        <div class="m_gameover_content_L">
          <div class="m_gameover_title_L">GAME OVER</div>
          <div class="m_gameover_container_btn_L">
            <button class="m_gameover_btn_L" @click="Retry()">RETRY</button>
            <button class="m_gameover_btn_L" @click="GameStart()">CHANGE DIFFICULTY</button>
          </div>
        </div>
      </div>

      <div class="m_gameover_container_W" v-if="isGameOver === 'WIN'">
        <div class="m_gameover_content_W">
          <div class="m_gameover_title_W">GAME SUCESS</div>
          <div class="m_gameover_container_btn_W">
            <button class="m_gameover_btn_W" @click="Retry()">RETRY</button>
            <button class="m_gameover_btn_W" @click="GameStart()">CHANGE DIFFICULTY</button>
          </div>
        </div>
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

  <div class="m_modal_explanation" v-if="isExplainAsk">

    <div class="m_modal_explanation_content" v-if="isLanguage === 'FRA'">
      MasterIO est un jeu où votre objectif est de trouver la combinaison secrète en un nombre limité d'essais.
      Cette combinaison est constituée de 4 couleurs choisies parmi le
      <span class="m_red">rouge</span>,
      <span class="m_blue">bleu</span>,
      <span class="m_purple">violet</span>,
      <span class="m_brown">marron</span>,
      <span class="m_pink">rose</span> et
      <span class="m_yellow">jaune</span>.

      Chaque tentative est affichée dans la section historique, et sous chaque couleur proposée,
      se trouve un indicateur qui peut être de l'une des trois couleurs suivantes : <ul>
        <li>
          Noir = La couleur n'est pas dans la combinaison secrète.
        </li>
        <li>
          <span class="m_clue_M">Orange</span> = La couleur est dans la combinaison secrète, mais pas a cet emplacement.
        </li>
        <li>
          <span class="m_clue_W">Vert</span> = La couleur est au bon emplacement.
        </li>
      </ul>
      <div class="m_modal_explanation_btn_container">
        <button class="m_modal_btn" @click="ModalExplaination">TERMINER</button>
        <button class="m_modal_btn" @click="changeLanguage">FRA</button>
      </div>
    </div>

    <div class="m_modal_explanation_content" v-if="isLanguage === 'ENG'">
      MasterIO is a game where your goal is to find the secret combination within a limited number of attempts.
      This combination consists of 4 colors chosen from
      <span class="m_red">red</span>,
      <span class="m_blue">blue</span>,
      <span class="m_purple">purple</span>,
      <span class="m_brown">brown</span>,
      <span class="m_pink">pink</span>, and
      <span class="m_yellow">yellow</span>.

      Each attempt is displayed in the historical section, and under each proposed color,
      there is an indicator that can be one of three colors: <ul>
        <li>
          Black = The color is not in the secret combination.
        </li>
        <li>
          <span class="m_clue_M">Orange</span> = The color is in the secret combination, but not in this position.
        </li>
        <li>
          <span class="m_clue_W">Green</span> = The color is in the right position.
        </li>
      </ul>
      <div class="m_modal_explanation_btn_container">
        <button class="m_modal_btn" @click="ModalExplaination">FINISH</button>
        <button class="m_modal_btn" @click="changeLanguage">ENG</button>
      </div>
    </div>

  </div>

  <div class="m_modal_start" v-if="isGameStart">
    <div class="m_modal_background"></div>
    <div class="m_modal_start_content">
      <div class="m_modal_start_btn_container" v-if="!isPlayerChoose">
        <button class="m_modal_start_btn" @click="PlayerChoose">1 Player</button>
        <button class="m_modal_start_btn" @click="PlayerChoose">2 Player</button>
      </div>

      <div class="m_modal_start_difficult_container" v-if="isPlayerChoose">
        CHOOSE YOUR DIFFICULT:

        <div class="m_div_flexrow">
          <input class="m_modal_start_difficult" type="radio" name="difficult" value="Infinity"
            v-model="selectedDifficulty">Infinity
        </div>

        <div class="m_div_flexrow">
          <input class="m_modal_start_difficult" type="radio" name="difficult" value="12" checked
            v-model="selectedDifficulty">Beginner (12 TRY)
        </div>

        <div class="m_div_flexrow">
          <input class="m_modal_start_difficult" type="radio" name="difficult" value="8"
            v-model="selectedDifficulty">Medium (8 TRY)
        </div>

        <div class="m_div_flexrow">
          <input class="m_modal_start_difficult" type="radio" name="difficult" value="5" v-model="selectedDifficulty">Hard
          (5 TRY)
        </div>

        <div class="m_div_flexrow">
          <input class="m_modal_start_difficult" type="radio" name="difficult" value="3" v-model="selectedDifficulty">
          Impossible (3 TRY)
        </div>
        <button class="m_modal_start_btn" @click="GameStart">DONE</button>
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
const Arraywin = ref(randowArray())
console.log(Arraywin.value)


const selectedColor = ref([])
const count = ref(0)
const Arrayhistory = ref([])
const m_history_container = ref(null)
const isExplainAsk = ref(false)
const isLanguage = ref('ENG')
const isGameStart = ref(true)
const isPlayerChoose = ref(false)
const selectedDifficulty = ref(0)
const turn = ref(0)
const isGameOver = ref(false)
const isShowResult = ref(false)

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
  turn.value++
  if (JSON.stringify(selectedColor.value) === JSON.stringify(Arraywin.value)) {
    console.log('Win');
    isGameOver.value = 'WIN'
    isShowResult.value = true
  } else {
    console.log('loose');
    const clues = [];

    for (let i = 0; i < 4; i++) {
      if (Arraywin.value[i] === selectedColor.value[i]) {
        clues.push({ color: selectedColor.value[i], clue: 'W' });
      } else if (Arraywin.value.includes(selectedColor.value[i])) {
        clues.push({ color: selectedColor.value[i], clue: 'M' });
      } else {
        clues.push({ color: selectedColor.value[i], clue: 'L' })
      }
    }
    Arrayhistory.value.push([...clues]);
    selectedColor.value = [];
    if (turn.value === parseInt(selectedDifficulty.value, 10)) {
      console.log('nooob')
      isGameOver.value = 'LOOSE'
      isShowResult.value = true
    }
  }
  m_history_container.value.scrollTop = m_history_container.value.scrollHeight;
  console.log(turn.value)
  console.log(selectedDifficulty.value)


}


function ModalExplaination() {
  isExplainAsk.value = !isExplainAsk.value;
}

function changeLanguage() {
  const lang = isLanguage.value
  isLanguage.value = lang === 'ENG' ? 'FRA' : 'ENG';
}

function GameStart() {
  isGameStart.value = !isGameStart.value
  turn.value = 0
}
function PlayerChoose() {
  isPlayerChoose.value = !isPlayerChoose.value
}


function Retry() {
  isShowResult.value = false
  Arraywin.value = randowArray()
  Arrayhistory.value = []
  selectedColor.value = []
  isGameOver.value = false
  turn.value = 0
}
</script>
