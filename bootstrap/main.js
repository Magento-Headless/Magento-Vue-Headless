import Vue from 'vue'

import App from '@/layouts/default'

import router from '@/plugins/router'
import store from '@/store'

import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
