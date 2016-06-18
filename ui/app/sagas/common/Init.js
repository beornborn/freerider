import { takeEvery } from 'redux-saga'
import { put, select, call } from 'redux-saga/effects'
import { INIT, SET_CABLE } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'
import cookie from 'cookie'
import Cable from 'es6-actioncable'
import * as api from '~/app/api'

export function* init() {
  const token = yield api.authenticate()

  var aYearLater = Date(Date.now() + 60*60*24*265)
  document.cookie = cookie.serialize('user_id', token, {path: '/', expired: aYearLater})

  const consumer = yield call(Cable.createConsumer, `ws://${window.location.host}/cable`)
  yield put(createAction(SET_CABLE)({consumer}))
}

function* watch() {
  yield* takeEvery(INIT, init)
}

export default watch
