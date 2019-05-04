import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router);

var routes = [{
        path: '/',
        alias: "/home",
        meta: {
            keepAlive: false
        },
        component: () => import("page/home/index.vue"),
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