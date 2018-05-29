import axios from 'axios'

// axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true

const ROOT_URL = 'http://127.0.0.1:8000'

const buildHeaders = (token) => {
  const head =  {
    'headers': {
      'Authorization': `Token ${token}`
    }
  }
  console.log('head', head)
  return head
}



const login = async (username, password) => {
  const postdata = {
    username,
    password
  }
  return await axios.post(`${ROOT_URL}/api-token-auth/`, postdata)
}

export default {
  login,
  get(url, token) {
    console.log('token :', token)
    return axios.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
  },
  buildHeaders
}
