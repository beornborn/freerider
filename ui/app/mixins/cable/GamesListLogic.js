import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },

    received(data) {
      if (data === undefined) { return }
      switch (data.msg) {
        case 'refresh':
          return component.props.refreshGames({games: data.games, changedGamesIds: data.changed_games_ids})
      }
    },
  }
}

export default CreateMixin("GamesListChannel", cableLogic)
