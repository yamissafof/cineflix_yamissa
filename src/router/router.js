import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/AccueilCinema.vue'
import Recherche from '../components/RechercheCinema.vue'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/recherche',
            name: 'recherche',
            component: Recherche
        },


    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll 10px above the element #main
        return {
            // could also be
            // el: document.getElementById('main'),
            el: '#main',
            // 10px above the element
            top: 10,
        }
    },
})

export default router
