import 'whatwg-fetch'

function parseJSON(response) {
  return response.json()
}

export function authenticate() {
  return fetch('/authenticate', { credentials: 'same-origin' })
    .then(parseJSON)
    .then((response) => { return response.token })
}
