import React from 'react'
import { render } from 'react-dom'
import { hashHistory, Router, Route, Link, withRouter } from 'react-router'
import merge from 'lodash.merge'
import Layout from '~/app/Layout'
import Dashboard from '~/app/pages/dashboard/Dashboard'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import FreeriderTheme from '~/app/FreeriderTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const muiTheme = merge(getMuiTheme(FreeriderTheme.commonSettings), FreeriderTheme.componentSettings)

import 'styles/theme'
import 'styles/shared'

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <Route path="/dashboard" component={Dashboard}/>
      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'))
