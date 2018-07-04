import qs from 'qs'
import api from '@/api/django'
import { LOTS_URL } from '@/app_constants'

export const actions = {

  async fetchLots ({commit, rootState}, params){
    let query = ''
    let url = LOTS_URL
    if (params  !== null) {
      query = '?' + qs.stringify(params)
      // make sure url contains a backslash, safari needs it before query params
      url = `${url}${query}`
    }
    const { token } = rootState.profile
    console.log('fetchLots, token :', token)
    try {
      const { data } = await api.get(url, token)
      commit('updateLots', data)
    } catch(error) {
      api.handleError(error, 'fetchLots')
    }
  },

}
