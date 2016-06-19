import { createStore, applyMiddleware, compose } from 'redux'
import PromiseMiddleware from 'redux-promise'
import reducer from '~/app/reducers'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import sagas from '~/app/sagas'

import DevTools from '~/app/DevTools'
import { REFRESH_USERS_ONLINE } from '~/app/reducers/Dashboard'
import createLogger from 'redux-logger'
let counter = {
  UsersOnline: 0
}
const logger = createLogger({
  collapsed: true,
  actionTransformer: (action) => {
    return {type: action.type, ...action.payload}
  },
  predicate: (getState, action) => {
    if (action.type === REFRESH_USERS_ONLINE) {
      counter['UsersOnline'] += 1
      return counter['UsersOnline'] === 1
    } else {return true}
  }

})

const store = createStore(reducer, undefined, compose(
    applyMiddleware(PromiseMiddleware, sagaMiddleware, logger),
    DevTools.instrument()
  )
)

sagaMiddleware.run(sagas)

export default store
