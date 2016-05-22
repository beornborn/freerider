import axios from 'axios'
import cookie from 'cookie'

module.exports = {
  getCurrentUser(cb) {
    return axios
      .get('/authenticate')
      .then((response) => {
        response = response.data
        var aYearLater = Date(Date.now() + 60*60*24*265)
        document.cookie = cookie.serialize('user_id', response.token, {path: '/', expired: aYearLater})
        return new Promise((resolve) => {resolve(response.current_user)})
      })
  },
}
