import gameSagas from '~/app/sagas/game'
import commonSagas from '~/app/sagas/common'
import UsersOnline from '~/app/sagas/UsersOnline'

export default function* rootSaga() {
  yield [
    ...gameSagas,
    ...commonSagas,
    UsersOnline
  ]
}
