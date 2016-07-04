import { takeEvery } from 'redux-saga'
import { select, call, put } from 'redux-saga/effects'
import { SEND_MESSAGE } from '~/app/reducers/Shared'
import { reset } from 'redux-form'

function* perform(action) {
  const chatChannel = yield select(state => state.shared.cable.ChatChannel)
  yield call(chatChannel.sendMessage.bind(chatChannel), action.payload.formData.content)
  yield put(reset('chatMessage'))
}

function* watch() {
  yield* takeEvery(SEND_MESSAGE, perform)
}

export default watch
