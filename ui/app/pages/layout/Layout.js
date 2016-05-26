import React, { PropTypes as ptypes } from 'react'
import { AppBar, Snackbar, FlatButton, Drawer, MenuItem } from 'material-ui'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './Layout.css'
import Username from '~/app/pages/layout/Username'
import Rules from '~/app/pages/layout/Rules'
import { connect } from 'react-redux'
import { UPDATE_CURRENT_USER, CONNECT_CABLE, TOGGLE_DROWER, TOGGLE_SNACKBAR, TOGGLE_RULES } from '~/app/reducers/Shared'
import { CHANGE_NAME } from '~/app/reducers/Username'
import { createAction } from 'redux-actions'
import * as api from '~/app/api'

var Layout = React.createClass({
  componentDidMount() {
    this.props.getCurrentUser().then(this.props.connectCable)
  },

  render() {
    const title = <Link to="/" className={styles.logoName}>Freerider</Link>
    return (
      <div>
        <AppBar
          styleName='app-bar'
          title={title}
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
  snackbarMessage: state.shared.snackbar.message,
  currentUserLoaded: state.shared.currentUserLoaded
}}

var mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: async () => {
      const currentUser = await api.getCurrentUser()
      dispatch(createAction(CHANGE_NAME)({name: currentUser.name}))
      dispatch(createAction(UPDATE_CURRENT_USER)({currentUser}))
    },
    connectCable: () => { dispatch(createAction(CONNECT_CABLE)()) },
    toggleDrower: () => { dispatch(createAction(TOGGLE_DROWER)()) },
    toggleSnackbar: () => { dispatch(createAction(TOGGLE_SNACKBAR)({message: ''})) },
    toggleRules: () => { dispatch(createAction(TOGGLE_RULES)()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Layout, styles))
