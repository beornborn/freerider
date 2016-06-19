import { takeEvery } from 'redux-saga'
import { select, put } from 'redux-saga/effects'
import { DECIDE } from '~/app/reducers/Game'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'

function* perform(action) {
  let state = yield select()
  state.shared.cable.GameChannel.decide({freerider: action.payload.decision})
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'You made decision'}))
}

function* watch() {
  yield* takeEvery(DECIDE, perform)
}

export default watch
