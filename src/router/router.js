import { createRouter, createWebHistory } from 'vue-router';
import AccueilCinema from '../components/AccueilCinema.vue';
import RechercheCinema from '../components/RechercheCinema.vue';
import DetailCinema from "../components/DetailCinema.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/accueil' // Redirection depuis la route racine vers la page d'accueil
        },
        {
            path: '/accueil',
            name: 'accueil',
            component: AccueilCinema
        },
        {
            path: '/recherche',
            name: 'recherche',
            component: RechercheCinema
        },
        {
            path: '/details/:id',
            name: 'details',
            component: DetailCinema
        }
    ]
});

export default router;

