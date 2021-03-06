import { createStore, applyMiddleware } from 'redux'
import PromiseMiddleware from 'redux-promise'
import reducer from '~/app/reducers'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import sagas from '~/app/sagas'

const store = createStore(reducer, undefined, applyMiddleware(PromiseMiddleware, sagaMiddleware))

sagaMiddleware.run(sagas)

export default store
