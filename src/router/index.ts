import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/create-new-list',
    name: 'createList',
    components: {
      createList: () => import(/* webpackChunkName: "create-list" */ '../views/CreateList.vue')
    }
  },
  {
    path: '/:listId',
    name: 'tasks',
    components: {
      tasks: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue')
    }
  }
]

const router = new VueRouter({ routes })

export default router
