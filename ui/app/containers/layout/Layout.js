import React, { PropTypes as ptypes } from 'react'
import { AppBar, Snackbar, FlatButton, Drawer, MenuItem } from 'material-ui'
import CSSModules from 'react-css-modules'
import styles from './Layout.css'
import Username from '~/app/containers/layout/Username'
import Rules from '~/app/containers/layout/Rules'
import { connect } from 'react-redux'
import { getCurrentUser, CONNECT_CABLE, TOGGLE_DROWER, TOGGLE_SNACKBAR, TOGGLE_RULES } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'

var Layout = React.createClass({
  componentDidMount() {
    this.props.getCurrentUser().then(this.props.connectCable)
  },

  render() {
    return (
      <div>
        <AppBar
          styleName='app-bar'
          title="Freerider"
          iconElementRight={<Username styleName="username"/>}
          onLeftIconButtonTouchTap={this.props.toggleDrower}>
        </AppBar>
        <div styleName='content'>
          {this.props.children}
        </div>
        <Drawer
          docked={false}
          width={200}
          open={this.props.drowerOpen}
          onRequestChange={this.props.toggleDrower}>
          <Rules ref="rules">
            <MenuItem onTouchTap={this.props.toggleRules}>Rules</MenuItem>
          </Rules>
        </Drawer>
        <Snackbar ref="snackbar"
          open={this.props.snackbarOpen}
          message={this.props.snackbarMessage}
          onRequestClose={this.props.toggleSnackbar}
          autoHideDuration={4000}/>
      </div>
    )
  }
})

var mapStateToProps = (state) => {return {
  drowerOpen: state.shared.drower.open,
  snackbarOpen: state.shared.snackbar.open,
  snackbarMessage: state.shared.snackbar.message
}}

var mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { return getCurrentUser(dispatch) },
    connectCable: () => { dispatch(createAction(CONNECT_CABLE)()) },
    toggleDrower: () => { dispatch(createAction(TOGGLE_DROWER)()) },
    toggleSnackbar: () => { dispatch(createAction(TOGGLE_SNACKBAR)({message: ''})) },
    toggleRules: () => { dispatch(createAction(TOGGLE_RULES)()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Layout, styles))
