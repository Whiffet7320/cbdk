import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [
    {
        path: '/Administration',
        name: 'Administration',
        component: () => import('./components/Administration'),
        children: [
            {
                path: '',
                name: 'Administration',
                component: () => import('./components/Administration/main.vue'),
            },
            {
                path: 'NewAdd',
                name: 'NewAdd',
                component: () => import('./components/NewAdd'),
            }
        ]
    },
    {
        path: '/Statistics',
        name: 'Statistics',
        component: () => import('./components/Statistics')
    },
    {
        path: '/Management',
        name: 'Management',
        component: () => import('./components/Management')
    },
    // {
    //     path: '/NewAdd',
    //     name: 'NewAdd',
    //     component: () => import('./components/NewAdd'),
    // }
    // {
    //     path: '/goods',
    //     name: 'goods',
    //     redirect: 'goods/sell',
    //     component: () => import('./components/goods/index.vue'),
    //     children: [
    //         {
    //             path: 'sell',
    //             name: 'sell',
    //             component: () => import('./components/goods/sell.vue'),
    //             children: [
    //                 {
    //                     path: 'Edit',
    //                     name: 'Edit',
    //                     // redirect: 'goods/sell',
    //                     component: () => import('./components/goods/Edit.vue')
    //                 },
    //             ]
    //         },
    //         {
    //             path: 'examine',
    //             name: 'examine',
    //             component: () => import('./components/goods/examine.vue')
    //         }
    //     ]
    // },
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router
