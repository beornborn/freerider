import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { console.log('connected games_list channel') },
    disconnected() { console.log('disconnected games_list channel') },

    received(data) {
      if (data === undefined) { return }
      console.log('game list got ' + data.msg)
      console.log(data)
      switch (data.msg) {
        case 'refresh':
          return component.props.refreshGames({games: data.games, changedGamesIds: data.changed_games_ids})
      }
    },
  }
}

export default CreateMixin("GamesListChannel", cableLogic)
