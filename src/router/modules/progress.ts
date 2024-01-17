/*
 * @Date: 2023-11-29 16:26:27
 * @Description: 
 */
import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/progress',
    component: Layout,
    redirect: '/progress/index',
    meta: { title: '进度统计', icon: 'sfont system-24gl-printer' },
    children: [
      {
        path: 'index',
        component: createNameComponent(() => import('@/views/main//progress/index.vue')),
        meta: { title: 'message.menu.progress.name', icon: 'sfont system-24gl-printer' }
      }
    ]
  }
]

export default route