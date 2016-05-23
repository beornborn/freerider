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

  toggleEditUsernameDialog() {
    return {
      type: 'TOGGLE_EDIT_USERNAME_DIALOG'
    }
  },

  submitEditUsernameForm() {
    return {
      type: 'SUBMIT_EDIT_USERNAME_FORM'
    }
  },

  showSnackbar(message) {
    return {
      type: 'SHOW_SNACKBAR',
      message
    }
  },

  hideSnackbar() {
    return {
      type: 'HIDE_SNACKBAR'
    }
  },

  handleChangeName(name) {
    return {
      type: 'HANDLE_CHANGE_NAME',
      name
    }
  },

  getCurrentUser(dispatch) {
    return api.getCurrentUser().then(currentUser => {
      dispatch(updateCurrentUser(currentUser))
      return new Promise((resolve) => {resolve()})
    })
  },

  updateUsername(dispatch, userId, name) {
    api.updateUsername(userId, name).then(currentUser => {
      dispatch(updateCurrentUser(currentUser))
    })
  },

  toggle(open) {
    return {
      type: 'TOGGLE_RULES',
      open
    }
  }
}
