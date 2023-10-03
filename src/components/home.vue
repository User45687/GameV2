<script setup>
import { RouterLink, RouterView } from 'vue-router'

const cards = [
  { name: "GuessNumb", backgroundImg: "../src/icons/screen_GN.png", link: "GuessNumb" },
  { name: "Memorio", backgroundImg: "../src/icons/screen_memo.png", link: "Memorio" },
  { name: "Morpio", backgroundImg: "../src/icons/screen_morpio.png", link: "Morpio" },
  { name: "Slotio", backgroundImg: "../src/icons/screen_slotio.png", link: "Slotio" },

];

</script>

<template>
 <RouterView />
 <div class="content">
   <div class="cards_container">
     <div class="cards" v-for="(card, index) in cards" :key="index">
       <div class="card_header">
         <img :src="card.backgroundImg" class="img_card" />
         <RouterLink :to="card.link" class="nav_card">{{ card.name }}</RouterLink>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>
@import url(../assets/home.css);
</style>