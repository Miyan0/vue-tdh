import api from '../../api/django'
import {router} from '../../main'

const STORAGE_TOKEN_NAME = 'django-token'

const state = {
  token: window.localStorage.getItem(STORAGE_TOKEN_NAME)
}

const getters = {
  isAuthenticated: state => !!state.token  // flip null or string to boolean
}

const actions = {
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

const mutations = {
  setToken: (state, token) => {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
