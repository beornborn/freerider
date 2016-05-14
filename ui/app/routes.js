import React from 'react'
import { render } from 'react-dom'
import { hashHistory, Router, Route, Link, withRouter } from 'react-router'
import Layout from './Layout'
import Dashboard from './Dashboard'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'))
