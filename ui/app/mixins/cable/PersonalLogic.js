import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },
    received(data) {
      if (data === undefined) { return }
      switch (data.msg) {
        case 'connected_to_game':
          return component.props.connectedToGame()
        case 'refresh_me':
          return component.props.updateCurrentUser(data.current_user)
        case 'refresh_users_online':
          return component.props.updateUsersOnline(data.users)
      }
    },

    pollUsersOnline() {
      this.perform('refresh_users_online')
    },

    updateName(name) {
      this.perform('update_name', {name})
    },

    createGame(formData) {
      this.perform('create_game', {game: formData})
    },

    enterGame(gameId) {
      this.perform('enter_game', {game_id: gameId})
    },

    leave_game() {
      this.perform('leave_game')
    }
  }
}

export default CreateMixin("PersonalChannel", cableLogic)
