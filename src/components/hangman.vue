<style>
@import url(../assets/hangman.css);
</style>

<template>
    <div>
      <button @click="nouveauMot">Nouveau mot</button>
      <div>Mot actuel : {{ word }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const wordsFR = ref([]);
  const word = ref('');
  
  const fetchWords = async () => {
    try {
      const response = await fetch('../src/listwords/listFR.txt');
      const text = await response.text();
      wordsFR.value = text.split('\n');
    } catch (error) {
      console.error('Erreur lors du chargement des mots:', error);
    }
  };
  
  const nouveauMot = () => {
    if (wordsFR.value.length > 0) {
      const indiceAleatoire = Math.floor(Math.random() * wordsFR.value.length);
      word.value = wordsFR.value[indiceAleatoire];
    }
  };
  
  fetchWords(); 
  
  </script>
  