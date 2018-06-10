// store/rues/actions.js
import qs from 'qs'
import api from '@/api/django'
import { RUES_URL } from '@/app_constants'


const ALL_RUES = 500  // when we want all rues (like in rapport's form)

export const actions = {

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
    const { token } = rootState.profile
    try {
      const { data } = await api.get(url, token)
      commit('updateRues', data)

    } catch(error) {
      api.handleError(error, 'fetchAllRues')
    }
  },

}
