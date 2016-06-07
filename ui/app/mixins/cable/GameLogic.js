import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(game) {
  return {
    connected() {
      console.log('connected game channel')
    },
    disconnected() { console.log('disconnected game channel') },

    received(data) {
      if (data === undefined) { return }
      console.log('game got ' + data.msg)
      console.log(data)
      switch (data.msg) {
        case 'me':
          return game.props.updateKey('me', data.me)
        case 'players':
          return game.props.updateKey('players', data.players)
        case 'new_round':
          this.updateGamePlayersWinners(data)
          return game.newRound()
        case 'game_finished':
          this.updateGamePlayersWinners(data)
        case 'refresh_all':
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
      console.log('send maybe_next_round ' + currentRound)
      this.perform('maybe_next_round?', { current_round: currentRound })
    }
  }
}

export default CreateMixin("GameChannel", cableLogic)
