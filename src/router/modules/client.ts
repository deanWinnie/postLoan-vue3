/*
 * @Date: 2023-12-14 11:10:27
 * @Description: 
 */
import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/client',
    component: Layout,
    redirect: '/client/info',
    meta: { title: 'message.menu.client.manage', icon: 'sfont system-24gl-printer' },
    children: [
      {
        path: 'info',
        component: createNameComponent(() => import('@/views/main/client/info.vue')),
        meta: { title: 'message.menu.client.info', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'billOverdueClient',
        component: createNameComponent(() => import('@/views/main/client/billOverdueClient.vue')),
        meta: { title: 'message.menu.client.billOverdueClient', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'overdueClient',
        component: createNameComponent(() => import('@/views/main/client/overdueClient.vue')),
        meta: { title: 'message.menu.client.overdueClient', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'compensateClient',
        component: createNameComponent(() => import('@/views/main/client/compensateClient.vue')),
        meta: { title: 'message.menu.client.compensateClient', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'bill',
        component: createNameComponent(() => import('@/views/main/client/bill.vue')),
        meta: { title: 'message.menu.client.bill', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'grade',
        component: createNameComponent(() => import('@/views/main/client/grade.vue')),
        meta: { title: 'message.menu.client.grade', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'channelClient',
        component: createNameComponent(() => import('@/views/main/client/channelClient.vue')),
        meta: { title: 'message.menu.client.channelClient', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'lawClient',
        component: createNameComponent(() => import('@/views/main/client/lawClient.vue')),
        meta: { title: 'message.menu.client.lawClient', icon: 'sfont system-24gl-printer' }
      },
      {
        path: 'clientDetails',
        component: createNameComponent(() => import('@/views/main/client/clientDetails.vue')),
        meta: { title: 'message.menu.client.clientDetails', icon: 'sfont system-24gl-printer',hideTabs:true},
        hideMenu:true,
      }
      // {
      //   path: 'grade',
      //   component: createNameComponent(() => import('@/views/main//outlets/grade.vue')),
      //   meta: { title: '网点标签', icon: 'sfont system-24gl-printer' }
      // },
      // {
      //   path: 'district',
      //   component: createNameComponent(() => import('@/views/main//outlets/district.vue')),
      //   meta: { title: '网点区域', icon: 'sfont system-24gl-printer' }
      // },
      // {
      //   path: 'channelOutlets',
      //   component: createNameComponent(() => import('@/views/main//outlets/channelOutlets.vue')),
      //   meta: { title: '移交渠道网点', icon: 'sfont system-24gl-printer' }
      // },
      // {
      //   path: 'outletsDetails',
      //   hideMenu:true,
      //   component: createNameComponent(() => import('@/views/main//outlets/outletsDetails.vue')),
      //   meta: { title: '网点详情', icon: 'sfont system-24gl-printer', hideTabs:true}
      // }

    ]
  }
]

export default route