import gameSagas from '~/app/sagas/game'
import sharedSagas from '~/app/sagas/shared'
import UsersOnline from '~/app/sagas/UsersOnline'

export default function* rootSaga() {
  yield [
    ...gameSagas,
    ...sharedSagas,
    UsersOnline
  ]
}
