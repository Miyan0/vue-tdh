// store/profile/index.js
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const STORAGE_TOKEN_NAME = 'django-token'

export const saveToken = (token) => {
  console.log('--------------------------')
  console.log('saveToken :')
  console.log('token :', token)
  console.log('STORAGE_TOKEN_NAME :', STORAGE_TOKEN_NAME)
  localStorage.setItem(STORAGE_TOKEN_NAME, token)
  console.log('--------------------------')

  // check if all good
  const savedToken = localStorage.getItem(STORAGE_TOKEN_NAME)
  if (savedToken === undefined || savedToken === null) {
    console.log('Impossible de sauvegarder le token')
  } else {
    console.log('Token was saved')
  }
}

export const loadToken = () => {
  const token = window.localStorage.getItem(STORAGE_TOKEN_NAME)
  console.log('STORAGE_TOKEN_NAME :', STORAGE_TOKEN_NAME)
  console.log('token :', token)
  return token
}

export const clearToken = () => {
  localStorage.removeItem(STORAGE_TOKEN_NAME)
}

const state = {
  token: loadToken()
}

export default {
  STORAGE_TOKEN_NAME,
  saveToken,
  clearToken,
  state,
  getters,
  actions,
  mutations
}
