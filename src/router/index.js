import { createRouter, createWebHistory } from 'vue-router'
import guessnumb from "../components/guessnumb.vue"
import memorio from "../components/memorio.vue"
import gambling from "../components/gambling.vue"
import chess from "../components/chess.vue"
import home from "../components/home.vue"
import morpio from "../components/morpio.vue"

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
      path: '/Chess', 
      name: 'Chess', 
      component: chess
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
    }
  ]
})

export default router
