import Vue from 'vue'
import VueRouter from 'vue-router'


import store from './store'

import App from './App.vue'
import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import Payes from './components/payes/Payes'
import Factures from './components/factures/Factures'
import Rapports from './components/rapports/Rapports'

import './sass/main.scss'

Vue.use(VueRouter)

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
  render: h => h(App)
}).$mount('#app')
