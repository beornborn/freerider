import React from 'react'
import ReactDom from 'react-dom'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { browserHistory } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './GameItem.css'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import * as api from '~/app/api'
import classNames from 'classnames'

let cx = classNames.bind(styles)

let GameItem = React.createClass({
  mixins: [AnimationMixin],
  propTypes: {
    game: React.PropTypes.object.isRequired,
    updated: React.PropTypes.bool,
    current: React.PropTypes.bool,
    currentPresent: React.PropTypes.bool
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updated) {
      this.animateUpdate(ReactDom.findDOMNode(this.refs.row))
    }
  },

  componentDidMount() {
    this.animateAppear(ReactDom.findDOMNode(this.refs.row))
  },

  render() {
    const { rounds, time, actions } = this.content()
    const gameRowStyle = classNames({
      'game-row': true,
      current: this.props.current,
      currentPresent: this.props.currentPresent
    })
    return (
      <div styleName={gameRowStyle} ref='row' onClick={this.enterGame}>
        <div styleName="column">
          <div>
            <div styleName='column-content name'>
              {this.props.game.name}
            </div>
          </div>
        </div>
        <div styleName="column players">{this.props.game.players.length + '/' + this.props.game.players_amount}</div>
        {rounds}
        {time}
        {actions}
      </div>
    )
  },

  enterGame() {
    api.enterGame(this.props.game.id)
    browserHistory.push('/game')
  },

  content() {
    if (!this.props.current) {
      const rounds = <div styleName="column rounds">{this.props.game.rounds}</div>
      const time = <div styleName="column time">{this.props.game.time_to_think}</div>
      return {rounds, time}
    } else {
      const actions = <div styleName="column actions">ololo</div>
      return {actions}
    }
  }
})

export default CSSModules(GameItem, styles, {allowMultiple: true})
