<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
 <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
   <RouterLink to="/" class="navbar-brand">BORING.IO</RouterLink>
   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
   </button>
   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <RouterLink to="GuessNumb" class="nav-link">GuessNumb</RouterLink>
      <RouterLink to="Memorio" class="nav-link">Memorio</RouterLink>
      <RouterLink to="Gambling" class="nav-link">Gambling</RouterLink>
      <RouterLink to="Chess" class="nav-link">Chess</RouterLink>
    </div>
   </div>
  </div>
 </nav>
 <RouterView />
</template>

<style>
@import '../assets/navbar.css';
</style>