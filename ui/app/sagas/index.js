import gameSagas from '~/app/sagas/game'

export default function* rootSaga() {
  yield [
    ...gameSagas
  ]
}
