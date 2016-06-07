import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './GameActions.css'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { RaisedButton } from 'material-ui'

var GameActions = React.createClass({
  render() { return this.content() },

  beFreerider() { this.props.decide(true) },
  notBeFreerider() { this.props.decide(false) },

  content() {
    if (!this.props.me.decided) {
      return (
        <div styleName='actions'>
          <RaisedButton label="Buy Ticket" primary={true} styleName='action' onTouchTap={this.beFreerider} />

          <div styleName='divider'>
            <ArrowBack styleName='arrow-back'/>or<ArrowForward styleName='arrow-forward'/>
          </div>

          <RaisedButton label="Ride Free" primary={true} styleName='action' onTouchTap={this.notBeFreerider} />
        </div>
      )
    } else {
      let response = this.props.me.freerider ? 'NOT PAY' : 'PAY'

      return (
        <div styleName='info'>
          <span>your decision:&nbsp;</span>
          <span styleName='response'>{response}</span>
        </div>
      )
    }
  }
})

export default CSSModules(GameActions, styles)
