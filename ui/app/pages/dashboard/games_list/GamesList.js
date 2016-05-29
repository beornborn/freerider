import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './GamesList.css'
import GameItem from './GameItem'
import CableMixin from '~/app/mixins/cable/GamesListLogic'

let GamesList = React.createClass({
  mixins: [CableMixin],

  render() {
    return (
      <div>
        <div styleName='game-row header'>
          <div styleName='column name'>Name</div>
          <div styleName='column players'>Players</div>
          <div styleName='column rounds'>Rounds</div>
          <div styleName='column time'>Time</div>
        </div>
        {this.props.games.map(game => {
          return <GameItem
            game={game}
            key={game.id}
            updated={this.props.changedGamesIds.includes(game.id)}
            current={this.props.currentUser.connected_player.game_id === game.id}
            currentPresent={this.props.currentUser.connected_player.game_id !== undefined} />
        })}
      </div>
    )
  }
})

export default CSSModules(GamesList, styles, {allowMultiple: true})
