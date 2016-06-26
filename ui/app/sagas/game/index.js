import watchDecide from '~/app/sagas/game/Decide'
import watchStartStopwatch from '~/app/sagas/game/StartStopwatch'

const gameSagas = [
  watchDecide(),
  watchStartStopwatch()
]

export default gameSagas
