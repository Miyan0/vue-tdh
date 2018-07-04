// store/rapports/actions.js
import qs from 'qs'
import api from '@/api/django'
import { RAPPORTS_URL } from '@/app_constants'

const gotoPage = async (commit, rootState, pageType) => {  // move to actions
  let url = null
  switch (pageType) {
  case 'prev':
    url = rootState.rapports.prevPageLink
    break
  case 'next':
    url = rootState.rapports.nextPageLink
    break

  default:
    console.error('Parametre non supporté: ', pageType) // eslint-disable-line no-console
    break
  }
  if (url == null) {
    // can happen if pageType was, for example, 'prev' and we're at the first page
    return
  }
  const { token } = rootState.profile
  try {
    const { data } = await api.get(url, token)
    commit('updateRapports', data)
  } catch(error) {
    api.handleError(error, 'gotoPage')
  }
}


export const actions = {
  selectRapport({commit}, rapport) {
    commit('setSelectedRapport', rapport)
  },
  addRapport({ commit, state }) {
    const rapport = {
      id: state.nextId,
      name: `Rapport ${state.nextId}`
    }
    commit('addRapport', rapport)
    commit('setSelectedRapport', rapport)
  },

  async fetchRapports ({commit, rootState}, params){
    let query = ''
    let url = RAPPORTS_URL
    if (params  !== null) {
      query = '?' + qs.stringify(params)
      // make sure url contains a backslash, safari needs it before query params
      url = `${url}${query}`
    }
    const { token } = rootState.profile
    console.log('fetchRapports, token :', token)
    try {
      const { data } = await api.get(url, token)
      commit('updateRapports', data)
    } catch(error) {
      api.handleError(error, 'fetchRapports')
    }
  },

  nextPage({commit, rootState}) {
    gotoPage(commit, rootState, 'next')  
  },

  prevPage({commit, rootState}) {
    gotoPage(commit, rootState, 'prev')  
  },
  
}

