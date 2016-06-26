import React from 'react'
import ReactDom from 'react-dom'
import { RaisedButton } from 'material-ui'
import { browserHistory } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './GameItem.css'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import * as api from '~/app/api'
import classNames from 'classnames'

classNames.bind(styles)

let GameItem = React.createClass({
  mixins: [AnimationMixin],

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updated) {
      this.animateUpdate(ReactDom.findDOMNode(this.refs.row))
    }
  },

  componentDidMount() {
    this.animateAppear(ReactDom.findDOMNode(this.refs.row))
  },

  handleRowTap() {
    if (!this.props.currentPresent) {
      this.props.enterGame(this.props.game.id)
    }
  },

  render() {
    const { rounds, time, actions } = this.content()
    const gameRowStyle = classNames({
      'game-row': true,
      currentPresent: this.props.currentPresent
    })

    return (
      <div styleName={gameRowStyle} ref='row' onTouchTap={this.handleRowTap}>
        <div styleName="column name">
          {this.props.game.name}
        </div>
        <div styleName="column players">{this.props.game.players.length + '/' + this.props.game.players_amount}</div>
        {rounds}
        {time}
        {actions}
      </div>
    )
  },

  content() {
    if (!this.props.current) {
      const rounds = <div styleName="column rounds">{this.props.game.rounds}</div>
      const time = <div styleName="column time">{this.props.game.time_to_think}</div>
      return {rounds, time}
    } else {
      const actions = <div styleName="column actions">
        <RaisedButton label="Back To Game" primary={true} onTouchTap={()=>this.props.enterGame(this.props.game.id)} />
      </div>
      return {actions}
    }
  }
})

export default CSSModules(GameItem, styles, {allowMultiple: true})
