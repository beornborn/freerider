import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import Layout from '~/app/containers/layout/Layout'
import Dashboard from '~/app/containers/dashboard/Dashboard'
import Game from '~/app/containers/game/Game'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import FreeriderTheme from '~/app/FreeriderTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import _ from 'lodash'
const muiTheme = _.merge(getMuiTheme(FreeriderTheme.commonSettings), FreeriderTheme.componentSettings)
import 'styles/shared'

import { Provider } from 'react-redux'
import store from '~/app/Store'
import { INIT } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'
store.dispatch(createAction(INIT)())

import DevTools from '~/app/DevTools'
const devtools = process.env.NODE_ENV === 'prod' ? undefined : <DevTools />

render((
  <Provider store={store}>
    <div>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Dashboard}/>
            <Route path="/game" component={Game} />
          </Route>
        </Router>
      </MuiThemeProvider>
      {devtools}
    </div>
  </Provider>
), document.getElementById('app'))
