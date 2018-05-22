import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import App from './App.vue'
import Login from './components/Login'
import Rapports from './components/rapports/Rapports'

import './sass/main.scss'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Rapports },
    { path: '/login', component: Login },
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
