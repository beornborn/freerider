import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter, IndexRoute } from 'react-router'
import Layout from '~/app/pages/layout/Layout'
import Dashboard from '~/app/pages/dashboard/Dashboard'
import Game from '~/app/containers/Game'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import FreeriderTheme from '~/app/FreeriderTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import merge from 'lodash.merge'
const muiTheme = merge(getMuiTheme(FreeriderTheme.commonSettings), FreeriderTheme.componentSettings)
import 'styles/shared'

import { Provider } from 'react-redux'
import store from '~/app/Store'

render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Dashboard}/>
          <Route path="/game" component={Game} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('app'))
