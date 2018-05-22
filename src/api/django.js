import axios from 'axios'

const ROOT_URL = 'http://localhost:8000'

const login = async (username, password) => {
  const postdata = {
    username,
    password
  }
  console.log('api.login: username :', username)
  return await axios.post(`${ROOT_URL}/api-token-auth/`, postdata)
}

export default {
  login
}
