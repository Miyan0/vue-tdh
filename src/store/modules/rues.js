import api from '../../api/django'
import qs from 'qs'
import { RUES_URL } from './constants'
import { handleError, accentFold } from './helpers'

const ALL_RUES = 500  // when we want all rues (like in rapport's form)

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

const getters = {

}

const actions = {

  async fetchAllRues ({commit, rootState, state}) {
    if (state.rues.length > 0) {
      console.log('We already have loaded all rues')
      return // don't fetch again
    }
    let query = ''
    let url = RUES_URL
    const params = {
      limit: ALL_RUES
    }
    if (params  !== null) {
      query = '?' + qs.stringify(params)
      // make sure url contains a backslash, safari needs it before query params
      url = `${url}${query}`
    }
    const { token } = rootState.auth
    try {
      const { data } = await api.get(url, token)
      commit('updateRues', data)

    } catch(error) {
      handleError(error, 'fetchAllRues')
    }
  },

}

const mutations = {

  updateRues: (state, data) => {
    // add 
    const rues = data.results.map( (rue) => {
      rue['foldedName'] = accentFold(rue.name)
      return rue
    })
    state.rues = [...rues]
    state.nextPageLink = data.links.next
    state.prevPageLink = data.links.previous
    state.fetchedCount = data.count
    state.pageCount = data.total_pages
    state.nextPageNumber = data.next_page_number
    state.prevPageNumber = data.prev_page_number
    state.pageNumber = data.page_number
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
