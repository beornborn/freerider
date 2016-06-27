import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from './Player.css'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import classNames from 'classnames'

var Player = React.createClass({
  render() {
    const { name, status, points, playerClass } = this.content()
    return (
      <div styleName={`player ${playerClass}`}>
        <div styleName="name">{name}</div>
        <div styleName="status">{status}</div>
        <div styleName="points">{points}</div>
      </div>
    )
  },

  content() {
    const player = this.props.player
    if (player === undefined) {
      const name = <RefreshIndicator
        status='loading'
        style={{position: 'relative', backgroundColor: 'none', boxShadow: 0}}
        top={0}
        left={0}
        size={40} />
      return { name: name, status: 'waiting for connect', points: undefined, playerClass: '' }
    } else {
      const playerClass = classNames({decided: player.decided, disconnected: !player.connected})
      const status = player.connected ? '' : 'disconnected'
      return { name: player.name, status, points: player.points, playerClass }
    }
  }
})

export default CSSModules(Player, styles, {allowMultiple: true})
