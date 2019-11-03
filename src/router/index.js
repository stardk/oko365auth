import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      props: true
    }
  ]
})
