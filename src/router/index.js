import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/homepage'
    },
    {
        path: '/homepage',
        component: () =>
            import ('../views/Homepage.vue')
    },
    {
        path: '/calendar',
        component: () =>
            import ('../views/Calendar.vue')
    },
    {
        path: '/cart',
        component: () =>
            import ('../views/Cart.vue')
    },
    {
        path: '/account',
        component: () =>
            import ('../views/Account.vue')
    },
		{
				path: '/detail:iid',
				component: () =>
						import ('../views/Detail.vue')
		}
]

const router = new VueRouter({
    routes
})

export default router