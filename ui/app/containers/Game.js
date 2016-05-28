import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { ADD_CHANNEL_SUBSCRIPTION, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import { UPDATE_KEY } from '~/app/reducers/Game'
import Game from '~/app/pages/game/Game'

const mapStateToProps = (state) => { return {
  players: state.game.players,
  me: state.game.me,
  game: state.game.game,
  winners: state.game.winners,
  cable: state.shared.cable
} }

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscription: (channel, subscription) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION)({channel, subscription}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    updateKey: (key, value) => { dispatch(createAction(UPDATE_KEY)({key, value}))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
