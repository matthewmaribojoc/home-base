import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Map from '@/components/Map'
import Home from '@/components/Home'
import Offer from '@/components/Offer'
import Find from '@/components/Find'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/offer',
      name: 'Offer',
      component: Offer
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    }
  ]
})
