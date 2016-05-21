import React from 'react'
import { AppBar, Snackbar, FlatButton, Drawer, MenuItem } from 'material-ui'
import CSSModules from 'react-css-modules'
import styles from './Layout.css'
import Username from '~/app/pages/Username'
import Rules from '~/app/Rules'
import { ActionCable, Cable } from 'action-cable-react'
import CurrentUser from '~/app/services/CurrentUser'

var Layout = React.createClass({
  childContextTypes: {
    snackbarCallback: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    cable: React.PropTypes.object
  },

  getChildContext() {
    return {
      snackbarCallback: this.showSnackbar,
      currentUser: this.state.currentUser,
      cable: this.state.cable
    }
  },

  getInitialState() {
    return {currentUser: {}, cable: new Cable({}), drowerOpen: false}
  },

  componentWillMount() {
    CurrentUser.authenticate((response) => {
      this.setState({currentUser: response.current_user})
      let actionCable = ActionCable.createConsumer('/cable')
      let cable = new Cable({
        UsersOnlineChannel: actionCable.subscriptions.create({channel: 'UsersOnlineChannel'}),
        GamesListChannel: actionCable.subscriptions.create({channel: 'GamesListChannel'})
      })
      this.setState({cable: cable})
    })
  },

  toggleDrower() {
    this.setState({drowerOpen: !this.state.drowerOpen})
  },

  showSnackbar(message) {
    this.refs.snackbar.setState({open: true, message: message})
  },

  updateCurrentUser(currentUser) {
    this.setState({currentUser: currentUser})
  },

  render() {
    return (
      <div>
        <AppBar
          styleName='app-bar'
          title="Freerider"
          iconElementRight={<Username styleName="username" cbUpdateCurrentUser={this.updateCurrentUser}/>}
          onLeftIconButtonTouchTap={this.toggleDrower}>
        </AppBar>
        <div styleName='content'>
          {this.props.children}
        </div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.drowerOpen}
          onRequestChange={this.toggleDrower}>
          <Rules ref="rules">
            <MenuItem onTouchTap={() => { this.refs.rules.handleOpen()} }>Rules</MenuItem>
          </Rules>
        </Drawer>
        <Snackbar ref="snackbar"
          open={false}
          message='qweqwe'
          autoHideDuration={4000}/>
      </div>
    )
  }
})

export default CSSModules(Layout, styles)
