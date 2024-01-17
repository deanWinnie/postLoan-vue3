/*
 * @Date: 2023-12-05 10:04:27
 * @Description: 
 */
import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/outlets',
    component: Layout,
    redirect: '/outles/info',
    meta: { title: 'message.menu.outlets.name', icon: 'sfont system-24gl-printer' },
    children: [
      {
        path: 'info',
        component: createNameComponent(() => import('@/views/main//outlets/info.vue')),
        meta: { title: 'message.menu.outlets.info', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'grade',
        component: createNameComponent(() => import('@/views/main//outlets/grade.vue')),
        meta: { title: 'message.menu.outlets.grade', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'district',
        component: createNameComponent(() => import('@/views/main//outlets/district.vue')),
        meta: { title: 'message.menu.outlets.district', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'channelOutlets',
        component: createNameComponent(() => import('@/views/main//outlets/channelOutlets.vue')),
        meta: { title: 'message.menu.outlets.channelOutlets', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'outletsDetails',
        component: createNameComponent(() => import('@/views/main//outlets/outletsDetails.vue')),
        meta: { title: 'message.menu.outlets.outletsDetails', icon: 'sfont system-24gl-printer', hideTabs:true},
        hideMenu:true,
      }

    ]
  }
]

export default route