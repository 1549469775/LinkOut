import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router);

const routes = [{
        name: "home",
        path: '/',
        alias: "/home",
        meta: {
            //刚刷新时可能没有，但是在挂载玩之后就有了
            keepAlive: true
        },
        component: () => import("views/home/index.vue")
    },
    {
        path: '/bar',
        meta: {
            keepAlive: true
        },
        component: () => import("ui/list.vue")
    }
];

var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;