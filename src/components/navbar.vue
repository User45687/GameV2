<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
 <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
   <RouterLink to="/" class="navbar-brand">BORING.IO</RouterLink>
  </div>
 </nav>
 <RouterView />

 
</template>

<style>
@import '../assets/navbar.css';
</style>