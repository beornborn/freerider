import React from 'react'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import CableMixin from '~/app/mixins/cable/GameLogic'
import CSSModules from 'react-css-modules'
import styles from './GamePage.css'
import { Card, CardTitle } from 'material-ui/Card'
import GameInfo from '~/app/components/game/GameInfo'
import Chat from '~/app/containers/chat/Chat'
import Player from '~/app/components/game/Player'
import GameActions from '~/app/components/game/GameActions'
import LeaveGameButton from '~/app/containers/game/LeaveGameButton'
import { Tabs, Tab } from 'material-ui'

let GamePage = React.createClass({
  mixins: [AnimationMixin, CableMixin],

  render() {
    return (
      <div styleName='content'>
        {this.content()}
      </div>
    )
  },

  content() {
    if (window.innerWidth < 801) {
      return <div styleName='mobile'>
        <Tabs>
          <Tab label="Game" >{this.game()}</Tab>
          <Tab label="Chat" >{this.chat()}</Tab>
        </Tabs>
      </div>
    } else {
      return <div styleName='desktop'>
        {this.game()}
        {this.chat()}
      </div>
    }
  },

  game() {
    let winner_ids = this.props.winners.map(w => w.id)
    let winner_players = this.props.players.filter(p => winner_ids.includes(p.id))

    let actions = undefined
    if (this.props.game.state === 'waiting_for_round') {
      actions = <GameActions decide={this.props.decide} me={this.props.me} />
    }

    return <div styleName='card'>
      <div styleName='button'><LeaveGameButton /></div>
      <GameInfo ref="gameInfo"
        players={this.props.players}
        game={this.props.game}
        winners={winner_players}
        stopwatch={this.props.stopwatch}
        maybeNextRound={this.props.maybeNextRound} />
      {actions}
      <div>
        {this.playersElements()}
      </div>
    </div>
  },

  chat() {
    return <div styleName='card'>
      <Chat inGame={true} />
    </div>
  },

  playersElements() {
    let players = []
    for (let i=0; i<this.props.game.players_amount; i++) {
      let player = this.props.players[i]
      let id = (player && player.id) || Math.random()
      players.push(<Player key={id} ref={'player' + id} player={player} gameState={this.props.game.state} />)
    }
    return players
  },

  newRound() {
    this.refs.gameInfo.refs.stopwatch.run(this.props.game.time_to_think)
  },

  continueAfterRefresh() {
    if (this.props.game.state === 'waiting_for_round') {
      var goneTime = Math.floor((Date.now() - Date.parse(this.props.game.last_round_on)) / 1000)
      var remainingTime = this.props.game.time_to_think - goneTime
      this.refs.gameInfo.refs.stopwatch.run(remainingTime)
    }
  }
})

export default CSSModules(GamePage, styles)
