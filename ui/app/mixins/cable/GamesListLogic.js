import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },

    received(data) {
      if (data === undefined) { return }
      switch (data.msg) {
        case 'refresh':
          const currentGameId = component.props.currentUser.connected_player.game_id
          const games = data.games.filter(g => g.state === 'waiting_for_start' || g.id === currentGameId)
          return component.props.refreshGames({games, changedGamesIds: data.changed_games_ids})
      }
    },
  }
}

export default CreateMixin("GamesListChannel", cableLogic)
