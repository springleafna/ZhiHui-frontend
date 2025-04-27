import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import PriorityMatrix from '@/components/task/PriorityMatrix.vue'
import Community from '@/views/Community.vue'
import Dashboard from '@/views/Dashboard.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import Notes from '@/views/Notes.vue'
import LongTermPlan from '@/views/LongTermPlan.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                hideLayout: true // 隐藏Header和SidePanel
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                hideLayout: true // 隐藏Header和SidePanel
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                hideLayout: true // 隐藏Header和SidePanel
            }
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
        {
            path: '/community',
            name: 'Community',
            component: Community
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/article/:id',
            name: 'ArticleDetail',
            component: ArticleDetail,
            props: true
        },
        {
            path: '/notes',
            name: 'Notes',
            component: Notes
        },
        {
            path: '/long-term-plan',
            name: 'LongTermPlan',
            component: LongTermPlan
        }
    ]
})

export default router