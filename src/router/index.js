import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Header from '@/components/layout/Header.vue'
import SidePanel from '@/components/layout/SidePanel.vue'
import Profile from '@/views/Profile.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/header',
            name: 'Header',
            component: Header
        },
        {
            path: '/side',
            name: 'Side',
            component: SidePanel
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },

    ]
})

export default router