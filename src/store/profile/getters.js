// store/profile/getters.js

export const getters = {
  isAuthenticated: state => !!state.token  // flip null or string to boolean
}
