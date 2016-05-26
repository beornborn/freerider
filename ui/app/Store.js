import { createStore, applyMiddleware, compose } from 'redux'
import PromiseMiddleware from 'redux-promise'
import reducer from '~/app/reducers'

const store = createStore(reducer, undefined, compose(
    applyMiddleware(PromiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
)

export default store
