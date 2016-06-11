import React from 'react'
import { AppBar, Snackbar, Drawer, MenuItem } from 'material-ui'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './Layout.css'
import Username from '~/app/components/layout/Username'
import Rules from '~/app/components/layout/Rules'
import PersonalChannel from '~/app/mixins/cable/PersonalLogic'

var Layout = React.createClass({
  mixins: [PersonalChannel],

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

export default CSSModules(Layout, styles)
