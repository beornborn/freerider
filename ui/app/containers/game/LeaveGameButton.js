import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { browserHistory } from 'react-router'
import { LEAVE_GAME } from '~/app/reducers/Game'

import LeaveGameButton from '~/app/components/game/LeaveGameButton'
import * as api from '~/app/api'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    leaveGame: () => {
      api.leaveGame()
      dispatch(createAction(LEAVE_GAME)())
      browserHistory.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveGameButton)
