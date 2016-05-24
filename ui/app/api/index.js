import 'whatwg-fetch'
import cookie from 'cookie'

module.exports = {
  getCurrentUser() {
    return fetch('/authenticate')
      .then((response) => { return response.json() })
      .then((response) => {
        console.log(response)
        var aYearLater = Date(Date.now() + 60*60*24*265)
        document.cookie = cookie.serialize('user_id', response.token, {path: '/', expired: aYearLater})
        return new Promise((resolve) => {resolve(response.current_user)})
      })
  },

  updateUsername(userId, name) {
    return fetch
      .put('/users/' + userId, { name: name })
      .then((response) => {
        return new Promise((resolve) => {resolve(response.data.user)})
      })
  },
}
