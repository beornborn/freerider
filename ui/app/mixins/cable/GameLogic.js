import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(game) {
  return {
    connected() { console.log('connected');console.log(Date.now())},
    disconnected() { },

    received(data) {
      console.log(data)
      if (data === undefined) { return }
      switch (data.msg) {
        case 'new_round':
          game.props.refresh(data)
          return game.newRound()
        case 'game_finished':
          return game.props.refresh(data)
        case 'refresh':
          game.props.refresh(data)
          return game.continueAfterRefresh()
      }
    },

    leave_game() {
      this.perform('leave_game')
    },

    decide(decision) {
      this.perform('decided', decision)
    },

    maybeNextRound(currentRound) {
      this.perform('maybe_next_round?', { current_round: currentRound })
    }
  }
}

export default CreateMixin("GameChannel", cableLogic)
