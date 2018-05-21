import api from '../../api/django'

const state = {
  token: null
}

const getters = {
  isAuthenticated: state => !!state.token  // flip null or string to boolean
}

const actions = {
  login: ({ commit }) => {
    api.login('miyano', 'de00de11')
      .then(response => {
        const token = response.data.token
        console.log('in action, token:', token)
        commit('setToken', token)
      })
      .catch(error => {
        console.log('error :', error)
      })
    
  },
  logout: ({ commit }) => {
    commit('setToken', null)
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
