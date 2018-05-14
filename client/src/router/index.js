import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/register'
// import components from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld // components.index
    },
    {
      path: '/register',
      name: 'register',
      component: Register // components.register
    }
  ]
})
