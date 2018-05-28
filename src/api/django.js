import axios from 'axios'
import qs from 'qs'

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



const get_old = async (url, params, token) => {
  let query = ''
  
  if (params  !== null) {
    query = '?' + qs.stringify(params)
    // make sure url contains a backslash, safari needs it before query params
    url = `${url}${query}`
  }
  
  console.log('api/django.js get(), url', url)

  const promise = await axios({
    method: 'get',
    url: url,
    // withCredentials: true,
    // credentials: 'include',
    mode:'cors',
    headers: {
      'Authorization': `Token ${token}`,
      // 'Access-Control-Allow-Credentials' : 'true',
      // 'Access-Control-Allow-Headers' : 'true',
      // 'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Origins' : 'http://127.0.0.1',
      // 'Content-Type': 'application/json'
    }
  })
  return promise
}

export default {
  login,
  get_old,
  // fetchRecords,
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
