import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '@/views/Profile.vue'
import PriorityMatrix from '@/components/task/PriorityMatrix.vue'

import Header from '@/components/layout/Header.vue'
import SidePanel from '@/components/layout/SidePanel.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/priority',
            name: 'Priority',
            component: PriorityMatrix
        },
        
    ]
})

export default router