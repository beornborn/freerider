import api from '~/app/api'

function updateCurrentUser(currentUser) {
  return {
    type: 'UPDATE_CURRENT_USER',
    currentUser
  }
}

module.exports = {
  connectCable() {
    return {
      type: 'CONNECT_CABLE'
    }
  },

  toggleDrower() {
    return {
      type: 'TOGGLE_DROWER'
    }
  },

  getCurrentUser(dispatch) {
    return api.getCurrentUser().then(currentUser => {
      console.log(currentUser)
      dispatch(updateCurrentUser(currentUser))
      return new Promise((resolve) => {resolve()})
    })
  },

  toggle(open) {
    return {
      type: 'TOGGLE_RULES',
      open
    }
  }
}
