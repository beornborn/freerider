import watchDecide from '~/app/sagas/game/Decide'
import watchMaybeNextRound from '~/app/sagas/game/maybeNextRound'

const gameSagas = [
  watchDecide(),
  watchMaybeNextRound()
]

export default gameSagas
