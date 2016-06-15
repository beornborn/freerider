import 'whatwg-fetch'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function authenticate() {
  return fetch('/authenticate', { credentials: 'same-origin' })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => { return response.token })
}

export function leaveGame() {
  return fetch('/games/leave', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
  .then(checkStatus)
}

export function enterGame(gameId) {
  return fetch('/games/' + gameId + '/connect', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
  .then(checkStatus)
}
