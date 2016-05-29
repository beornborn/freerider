import { createStore, applyMiddleware, compose } from 'redux'
import PromiseMiddleware from 'redux-promise'
import reducer from '~/app/reducers'
import DevTools from '~/app/DevTools'

const store = createStore(reducer, undefined, compose(
    applyMiddleware(PromiseMiddleware),
    DevTools.instrument()
  )
)

export default store
