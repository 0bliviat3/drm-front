import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import Dashboard from '@/views/Dashboard.vue';
import BatchManager from '@/views/BatchManager.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import UserList from '@/components/user/UserList.vue';
import { compile } from 'vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/batch',
        component: BatchManager,
      },
      {
        path:'/users',
        component: UserList
      }     
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/cron-edit',
    name: 'CronEdit',
    component: () => import('@/views/CronEdit.vue')
  },
  {
    path: '/user-create',
    name: 'UserCreate',
    component: () => import('@/components/user/UserCreate.vue')
  },
  {
    path: '/user-edit',
    name: 'UserEdit',
    component: () => import('@/components/user/UserEdit.vue')
  },
  {
    path: '/user-delete',
    name: 'UserDelete',
    component: () => import('@/components/user/UserDelete.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
