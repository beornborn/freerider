import gameSagas from '~/app/sagas/game'
import sharedSagas from '~/app/sagas/shared'

export default function* rootSaga() {
  yield [
    ...gameSagas,
    ...sharedSagas
  ]
}
