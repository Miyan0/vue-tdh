import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import Payes from './components/payes/Payes'
import Factures from './components/factures/Factures'
import Rapports from './components/rapports/Rapports'
import AppLot from '@/pages/lots/LotList'

Vue.use(VueRouter)


export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Dashboard },
    { path: '/rapports', component: Rapports, name:'rapports' },
    { path: '/factures', component: Factures },
    { path: '/payes', component: Payes },
    { path: '/login', component: Login },
    { path: '/lots', component: AppLot },
  ]
})

