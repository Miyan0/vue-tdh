import Vuex from 'vuex'
import Vue from 'vue'

// import auth from './modules/auth'
import profile from './profile'
import rapports from './rapports'
import rues from './rues'
import lots from './pvlots'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    profile,
    rapports,
    rues,
    lots
  }
})
