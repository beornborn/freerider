import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter, IndexRoute } from 'react-router'
import merge from 'lodash.merge'
import Layout from '~/app/containers/layout/Layout'
import Dashboard from '~/app/pages/dashboard/Dashboard'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import FreeriderTheme from '~/app/FreeriderTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const muiTheme = merge(getMuiTheme(FreeriderTheme.commonSettings), FreeriderTheme.componentSettings)
import 'styles/theme'
import 'styles/shared'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '~/app/reducers'
const store = createStore(reducer, undefined,
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Dashboard}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('app'))
