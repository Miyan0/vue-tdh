import Vuex from 'vuex'
import Vue from 'vue'

// import auth from './modules/auth'
import profile from './profile'
import rapports from './modules/rapports'
import rues from './rues'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    profile,
    rapports,
    rues
  }
})
