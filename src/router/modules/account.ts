/*
 * @Date: 2023-12-1 12:42:27
 * @Description: 
 */
import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    alwayShow:true,
    meta: { title: 'message.menu.account.manage', icon: 'sfont system-24gl-printer' ,alwaysShow:true},
    children: [
      {
        path: 'index',
        component: createNameComponent(() => import('@/views/main/account/index.vue')),
        meta: { title: 'message.menu.account.list', icon: 'sfont system-24gl-printer' }
      }
    ]
  }
]

export default route