import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { ADD_CHANNEL_SUBSCRIPTION_WHEN_READY, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import { REFRESH_GAME, START_STOPWATCH, DECIDE } from '~/app/reducers/Game'

import { browserHistory } from 'react-router'
import Game from '~/app/components/game/Game'
import * as api from '~/app/api'

const mapStateToProps = (state) => {
  return {
    players: state.game.external.players,
    me: state.game.external.players.find(player => player.user_id === state.shared.currentUser.id) || {},
    winners: state.game.external.winners,
    game: state.game.external.game,
    stopwatch: state.game.stopwatch,
    cable: state.shared.cable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscription: (channel, settings) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION_WHEN_READY)({channel, settings}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    refresh: (data) => { dispatch(createAction(REFRESH_GAME)({data}))},
    startStopwatch: (remainingTime) => { dispatch(createAction(START_STOPWATCH)({remainingTime})) },
    decide: (decision) => { dispatch(createAction(DECIDE)({decision})) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
