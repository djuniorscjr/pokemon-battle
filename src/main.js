import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(VueResource)

import 'bootstrap/dist/css/bootstrap.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
