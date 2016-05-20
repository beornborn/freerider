import superagent from 'superagent'
import cookie from 'cookie'

export default {
  authenticate(cb) {
    superagent
      .get('/authenticate')
      .set('Accept', 'application/json')
      .set('ContentType', 'application/json')
      .end((err, res) => {
        var response = JSON.parse(res.text)
        var aYearLater = Date(Date.now() + 60*60*24*265)
        document.cookie = cookie.serialize('user_id', response.token, {path: '/', expired: aYearLater})
        cb(response)
      })
  }
}
