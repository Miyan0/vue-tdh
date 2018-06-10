// store/rues/index.js
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
  rues: [],
  prevPageLink: null,
  prevPageNumber: null,
  nextPageLink: null,
  nextPageNumber: null,
  pageNumber: 0,
  fetchedCount: 0,
  pageCount: 0,
}

export default {
  state,
  getters,
  actions,
  mutations
}
