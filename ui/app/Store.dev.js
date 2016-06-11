import { createStore, applyMiddleware, compose } from 'redux'
import PromiseMiddleware from 'redux-promise'
import reducer from '~/app/reducers'
import DevTools from '~/app/DevTools'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import stopwatchSaga from '~/app/sagas'

import createLogger from 'redux-logger'
const logger = createLogger({collapsed: true})

const store = createStore(reducer, undefined, compose(
    applyMiddleware(PromiseMiddleware, sagaMiddleware, logger),
    DevTools.instrument()
  )
)

sagaMiddleware.run(stopwatchSaga)

export default store
