import { createRouter, createWebHashHistory, RouteRecordRaw as RouteRecordRawCopy } from 'vue-router'
import Layout from '@major/layout/index.vue'
import Doc from '@major/pages/doc/index.vue'

export type RouteRecordRaw = RouteRecordRawCopy & {
  hidden?: boolean
  children?: RouteRecordRaw[]
  alwaysShow?: boolean
}
/* Router Modules */

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/doc',
    component: Layout,
    redirect: '/doc/index',
    children: [
      {
        path: 'index',
        component: Doc,
        name: 'Documentation',
        meta: { title: '文档', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
  },
  {
    path: '',
    component: Layout,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

router.onError((e) => {
  console.log('onError: ', e)
})

export default router
