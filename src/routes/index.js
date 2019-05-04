import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router);

var routes = [{
        path: '/home',
        component: () => import("ui/header.vue"),
    },
    {
        path: '/bar',
        component: () => import("ui/list.vue")
    }
];

var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;