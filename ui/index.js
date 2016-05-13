require("./styles/app.css");

import React from 'react'
import { render } from 'react-dom'
import App from './app/App'
import { Router, Route, hashHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/" component={App}/>
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'))
