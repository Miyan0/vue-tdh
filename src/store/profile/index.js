// store/profile/index.js
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const STORAGE_TOKEN_NAME = 'django-token'

const state = {
  token: window.localStorage.getItem(STORAGE_TOKEN_NAME)
}

export default {
  STORAGE_TOKEN_NAME,
  state,
  getters,
  actions,
  mutations
}
