/*
 * @Date: 2024-1-23 11:10:27
 * @Description: 
 */
import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/progressManage',
    component: Layout,
    meta: { title: 'message.menu.progressManage.name', icon: 'sfont system-24gl-printer' },
    children: [
      {
        path: 'tzProcess',
        component: createNameComponent(() => import('@/views/main/progressManage/tzProcess.vue')),
        meta: { title: 'message.menu.progressManage.tzProcess', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'bwlProcess',
        component: createNameComponent(() => import('@/views/main/progressManage/bwlProcess.vue')),
        meta: { title: 'message.menu.progressManage.bwlProcess', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'kfProcess',
        component: createNameComponent(() => import('@/views/main/progressManage/kfProcess.vue')),
        meta: { title: 'message.menu.progressManage.kfProcess', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'fwProcess',
        component: createNameComponent(() => import('@/views/main/progressManage/fwProcess.vue')),
        meta: { title: 'message.menu.progressManage.fwProcess', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'sxProcess',
        component: createNameComponent(() => import('@/views/main/progressManage/sxProcess.vue')),
        meta: { title: 'message.menu.progressManage.sxProcess', icon: 'sfont system-24gl-printer' }
      }
    ]
  }
]

export default route