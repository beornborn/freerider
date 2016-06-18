import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(game) {
  return {
    connected() { console.log('connected');console.log(Date.now())},
    disconnected() { },

    received(data) {
      console.log(data)
      if (data === undefined) { return }
      switch (data.msg) {
        case 'me':
          console.log('me')
          console.log(Date.now())
          return game.props.updateKey('me', data.me)
        case 'players':
          return game.props.updateKey('players', data.players)
        case 'new_round':
          this.updateGamePlayersWinners(data)
          return game.newRound()
        case 'game_finished':
          return this.updateGamePlayersWinners(data)
        case 'refresh_all':
          console.log('all')
          console.log(Date.now())
          this.updateGamePlayersWinners(data)
          return game.continueAfterRefresh()
      }
    },

    updateGamePlayersWinners(data) {
      game.props.updateKey('game', data.game)
      game.props.updateKey('players', data.players)
      game.props.updateKey('winners', data.winners)
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
