import Vue from 'vue'
import Router from 'vue-router'
import SameEntryPage from '../components/SameEntryPage.vue'
import Welcome from '../components/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome
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
