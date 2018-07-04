import Vue from 'vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import * as svgicon from 'vue-svgicon'

import store from './store'

import App from './App.vue'
import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import Payes from './components/payes/Payes'
import Factures from './components/factures/Factures'
import Rapports from './components/rapports/Rapports'

import './sass/main.scss'

import { formatNoCause, formatProcedureType, formatAddressOneLine, formatDateTime } from '@/utils/filters'

Vue.filter('noCause', value => {
  return formatNoCause(value)
})

Vue.filter('procedureType', value => {
  return formatProcedureType(value)
})

Vue.filter('addressOneLine', value => {
  return formatAddressOneLine(value)
})

Vue.filter('dateSplit', value => {
  return formatDateTime(value)
})


Vue.use(VueRouter)
Vue.use(VModal, {
  dynamic: true,
  dialog: true
})

// Default tag name is 'svgicon'
Vue.use(svgicon, {
  tagName: 'svgicon'
})


export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Dashboard },
    { path: '/rapports', component: Rapports },
    { path: '/factures', component: Factures },
    { path: '/payes', component: Payes },
    { path: '/login', component: Login },
  ]
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  data: {
    modalOpen: false
  },
  watch: {
    modalOpen: function(newVal) {
      var className = 'modal-open'
      if (newVal) {
        document.body.classList.add(className)
      } else {
        document.body.classList.remove(className)
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
