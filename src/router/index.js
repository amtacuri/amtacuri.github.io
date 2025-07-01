import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/redditHome.vue';

const routesClientReddit = [
    {
        path: '/',
        component: Home,
        name: 'home'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routesClientReddit
});

export default router;