import { createStore, applyMiddleware } from 'redux'
import PromiseMiddleware from 'redux-promise'
import reducer from '~/app/reducers'

const store = createStore(reducer, undefined, applyMiddleware(PromiseMiddleware))

export default store
