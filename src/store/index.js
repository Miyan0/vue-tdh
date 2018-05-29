import Vuex from 'vuex'
import Vue from 'vue'

import auth from './modules/auth'
import rapports from './modules/rapports'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    rapports
  }
})