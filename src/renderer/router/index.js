import Vue from 'vue'
import Router from 'vue-router'
import SameEntryPage from '../components/SameEntryPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/same-entry-page',
      name: 'same-entry-page',
      component: SameEntryPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
