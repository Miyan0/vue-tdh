// store/profile/actions.js
import api from '@/api/django'
import {router} from '@/router'
import {saveToken, clearToken} from './index'



export const actions = {
  login: ({ commit }, {username, password}) => {
    api.login(username, password)
      .then(response => {
        commit('setToken', response.data.token)
        saveToken(response.data.token)
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
    clearToken()
  }
}
