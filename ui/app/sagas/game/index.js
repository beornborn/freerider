import watchDecide from '~/app/sagas/game/Decide'
import watchStartStopwatch from '~/app/sagas/game/StartStopwatch'
import watchLeaveGame from '~/app/sagas/game/LeaveGame'

const gameSagas = [
  watchDecide(),
  watchStartStopwatch(),
  watchLeaveGame()
]

export default gameSagas
