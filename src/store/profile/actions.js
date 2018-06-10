// store/profile/actions.js
import api from '@/api/django'
import {router} from '../../main'
import STORAGE_TOKEN_NAME from './index'

export const actions = {
  login: ({ commit }, {username, password}) => {
    api.login(username, password)
      .then(response => {
        commit('setToken', response.data.token)
        window.localStorage.setItem(STORAGE_TOKEN_NAME, response.data.token)
        router.push('/')
      })
      .catch(error => {
        if (error.response) {
          console.log(error.request.response)
        } else {
          console.log('Aucune reponse du server. Soyez certain que le serveur tourne!')
        }
      })
    
  },
  logout: ({ commit }) => {
    commit('setToken', null)
    window.localStorage.removeItem(STORAGE_TOKEN_NAME)
  }
}
