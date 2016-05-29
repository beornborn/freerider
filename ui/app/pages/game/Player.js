import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Player.css'
import RefreshIndicator from 'material-ui/RefreshIndicator'

var Player = React.createClass({
  propTypes: {
    player: React.PropTypes.object,
    gameState: React.PropTypes.string
  },

  render() {
    var { name, status, points } = this.content()
    return (
      <div styleName='player'>
        <div styleName="name">{name}</div>
        <div styleName="status">{status}</div>
        <div styleName="points">{points}</div>
      </div>
    )
  },

  content() {
    const player = this.props.player
    console.log(player, this.props.gameState)
    if (player === undefined) {
      const name = <RefreshIndicator
        status='loading'
        style={{position: 'relative', backgroundColor: 'none', boxShadow: 0}}
        top={0}
        left={0}
        size={40} />
      return { name: name, status: 'waiting for connect', points: undefined }
    } else {
      return { name: player.name, status: undefined, points: player.points }
    }
  }
})

export default CSSModules(Player, styles)
