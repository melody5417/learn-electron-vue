import axios from 'axios'
import DB from 'db/index'
import store from 'renderer/store'
import Vue from 'vue'
import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.db = Vue.prototype.$db = DB.sharedInstance()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
