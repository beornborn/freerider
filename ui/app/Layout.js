import React from 'react'
import { AppBar } from 'material-ui'
import CSSModules from 'react-css-modules'
import styles from './Layout.css'
import { ActionCable, Cable } from 'action-cable-react'
let actionCable = ActionCable.createConsumer('ws://localhost:3000/cable');
let cable = new Cable({
  UsersOnlineChannel: actionCable.subscriptions.create({channel: 'UsersOnlineChannel'}),
  GamesListChannel: actionCable.subscriptions.create({channel: 'GamesListChannel'})
});

var Layout = React.createClass({
  render() {
    return (
      <div>
        <AppBar
          styleName='app-bar'
          title="Freerider"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
        </AppBar>
        <div styleName='content'>
          {React.cloneElement(this.props.children, { cable: cable })}
        </div>
      </div>
    )
  }
})

export default CSSModules(Layout, styles)
