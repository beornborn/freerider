import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from './Player.css'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import Disconnected from 'material-ui/svg-icons/action/highlight-off'
import Winner from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import Looser from 'material-ui/svg-icons/social/sentiment-very-dissatisfied'
import Decided from 'material-ui/svg-icons/action/done'
import ReactTooltip from 'react-tooltip'

var Player = React.createClass({
  componentDidUpdate() {
    ReactTooltip.rebuild()
  },

  render() {
    const { name, status, points } = this.content()
    return (
      <div styleName='player'>
        <ReactTooltip place="top" effect="solid"/>
        <div styleName='name'>{name}</div>
        <div styleName='status'>{status}</div>
        <div styleName='points'>{points}</div>
      </div>
    )
  },

  content() {
    const player = this.props.player
    if (player === undefined) {
      return { name: '', status: 'waiting for connect', points: undefined }
    } else {
      let status = <div>
        {!player.connected ? <Disconnected color='red' data-tip="disconnected"/> : ''}
        {player.winner ? <Winner color='#19B14D' data-tip="winner" /> : ''}
        {player.winner === false ? <Looser color='red' data-tip="looser" /> : ''}
        {player.decided ? <Decided color='#19B14D' data-tip="decided" /> : ''}

      </div>
      return { name: player.name, status, points: player.points }
    }
  }
})

export default CSSModules(Player, styles, {allowMultiple: true})
