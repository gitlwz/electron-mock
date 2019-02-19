import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: require('@/components/homePage/index.vue').default
        },
        {
            path: '/addproject',
            name: 'add-project',
            component: require('@/components/addproject/index.vue').default
        },
        {
            path: '/interfaceList',
            name: 'interface-list',
            component: require('@/components/interfaceList/index.vue').default
        },
        
        {
            path: '*',
            redirect: '/'
        }
    ]
})
