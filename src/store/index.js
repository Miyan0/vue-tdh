import Vuex from 'vuex'
import Vue from 'vue'

import rapports from './modules/rapports'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rapports
  }
})