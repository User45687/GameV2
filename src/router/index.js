import { createRouter, createWebHistory } from 'vue-router'
import guessnumb from "../components/guessnumb.vue"
import memorio from "../components/memorio.vue"
import gambling from "../components/gambling.vue"
import home from "../components/home.vue"
import morpio from "../components/morpio.vue"
import slotio from "../components/slotio.vue"
import simon from "../components/simon.vue"
import connectIO from "../components/connectIO.vue"
import mastermind from "../components/mastermind.vue"
import hangman from "../components/hangman.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/GuessNumb',
      name: 'GuessNumb',
      component: guessnumb
    },
    {
      path: '/Memorio',
      name: 'Memorio',
      component: memorio
    },
    {
      path: '/Gambling',
      name: 'Gambling',
      component: gambling
    },
    {
      path: '/', 
      name: 'Home', 
      component: home
    },
    {
      path: '/Morpio',
      name: 'Morpio',
      component: morpio
    },
    {
      path:'/Slotio',
      name: 'Slotio',
      component: slotio
    },
    {
      path: '/Simon',
      name: 'Simon',
      component : simon,
    },
    {
      path: '/ConnectIO',
      name: 'ConnectIO',
      component: connectIO
    },
    {
      path: '/MasterMind',
      name: 'MasterMind',
      component: mastermind
    },
    {
      path: '/Hangman',
      name: 'Hangman',
      component: hangman
    }
  ]
})

export default router
