import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { REFRESH } from '~/app/reducers/GamesList'
import { ADD_CHANNEL_SUBSCRIPTION, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import GamesList from '~/app/pages/dashboard/games_list/GamesList'

const mapStateToProps = (state) => {
  return {
    cable: state.shared.cable,
    games: state.gamesList.games,
    changedGamesIds: state.gamesList.changedGamesIds,
    currentUser: state.shared.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscription: (channel, subscription) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION)({channel, subscription}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    refreshGames: (data) => { dispatch(createAction(REFRESH)(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)
