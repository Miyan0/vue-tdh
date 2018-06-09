import axios from 'axios'
import { ROOT_URL, TOKEN_ENPOINT } from '@/app_constants'

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
  return await axios.post(`${ROOT_URL}/${TOKEN_ENPOINT}/`, postdata)
}

export default {
  login,
  get(url, token) {
    return axios.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
  },
  buildHeaders
}
