import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Player.css'

var Player = React.createClass({
  propTypes: {
    player: React.PropTypes.object.isRequired,
    status: React.PropTypes.string
  },

  render: function() {
    return (
      <div styleName='player'>
        <div styleName="name">{this.props.player.name}</div>
        <div styleName="status">{this.props.status}</div>
        <div styleName="points">{this.props.player.points}</div>
      </div>
    )
  }
})

export default CSSModules(Player, styles)
