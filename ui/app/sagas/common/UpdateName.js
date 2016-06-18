import { takeEvery } from 'redux-saga'
import { select, call } from 'redux-saga/effects'
import { UPDATE_NAME } from '~/app/reducers/Shared'

export function* updateName(action) {
  const personalChannel = yield select(state => state.shared.cable.PersonalChannel)
  yield call(personalChannel.updateName.bind(personalChannel), action.payload.name)
}

function* watch() {
  yield* takeEvery(UPDATE_NAME, updateName)
}

export default watch
