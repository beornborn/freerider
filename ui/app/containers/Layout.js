import React, { PropTypes as ptypes } from 'react'
import { AppBar, Snackbar, FlatButton, Drawer, MenuItem } from 'material-ui'
import CSSModules from 'react-css-modules'
import styles from './Layout.css'
import Username from '~/app/pages/Username'
import Rules from '~/app/containers/Rules'
import { connect } from 'react-redux'
import actions from '~/app/actions'

var Layout = React.createClass({
  propTypes: {
    getCurrentUser: ptypes.func.isRequired,
    toggleDrower: ptypes.func.isRequired,
    drowerOpen: ptypes.bool.isRequired,
    snackbarOpen: ptypes.bool.isRequired,
    snackbarMessage: ptypes.string
  },

  componentDidMount() {
    this.props.getCurrentUser().then(this.props.connectCable)
  },

  render() {
    return (
      <div>
        <AppBar
          styleName='app-bar'
          title="Freerider"
          // iconElementRight={<Username styleName="username" cbUpdateCurrentUser={() =>{}}/>}
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
            <MenuItem onTouchTap={() => { this.refs.rules.dispatchProps.openDialog()} }>Rules</MenuItem>
          </Rules>
        </Drawer>
        <Snackbar ref="snackbar"
          open={this.props.snackbarOpen}
          message=''
          autoHideDuration={4000}/>
      </div>
    )
  }
})

var mapStateToProps = (state) => {return {
  drowerOpen: state.drower.open,
  snackbarOpen: state.snackbar.open,
  snackbarMessage: state.snackbar.message
}}

var mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { return actions.getCurrentUser(dispatch) },
    connectCable: () => { dispatch(actions.connectCable()) },
    toggleDrower: () => { dispatch(actions.toggleDrower()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Layout, styles))
