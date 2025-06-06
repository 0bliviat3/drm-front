import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import Dashboard from '@/views/Dashboard.vue';
import BatchManager from '@/views/BatchManager.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import UserList from '@/components/user/UserList.vue';
import { compile } from 'vue';
import LogManager from '@/views/LogManager.vue';
import CryptoTest from '@/views/CryptoTest.vue';
import FunctionManual from '@/views/FunctionManual.vue';
import { isAuthenticated } from '@/utils/auth'

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
      },
      {
        path:'/logs',
        component: LogManager
      },
      {
        path:'/crypto',
        component: CryptoTest
      },
      {
        path:'/docs',
        component: FunctionManual
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

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next() // 로그인 페이지는 항상 허용
  } else if (!isAuthenticated()) {
    next('/login') // 쿠키가 없으면 로그인 페이지로
  } else {
    next() // 인증된 경우 정상 접근
  }
})

export default router
