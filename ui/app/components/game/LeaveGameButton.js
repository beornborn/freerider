import React from 'react'
import { FloatingActionButton } from 'material-ui'
import LeaveGame from 'material-ui/svg-icons/action/exit-to-app'
import styles from './LeaveGameButton.css'
import CSSModules from 'react-css-modules'

let LeaveGameButton = React.createClass({
  render() {
    return <FloatingActionButton secondary={true} styleName="leave-game-button" onTouchTap={this.props.leaveGame}>
      <LeaveGame />
    </FloatingActionButton>
  }
})

export default CSSModules(LeaveGameButton, styles)
