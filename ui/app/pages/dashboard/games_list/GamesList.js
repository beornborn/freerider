import React from 'react'
import { CableMixin, ChannelMixin } from 'action-cable-react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import CSSModules from 'react-css-modules'
import styles from './GamesList.css'
import GameItem from './GameItem'

let GamesList = React.createClass({
  mixins: [CableMixin(React), ChannelMixin('GamesListChannel')],
  propTypes: {
    cable: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {games: [], changedGamesIds: []}
  },

  handleConnected() {
    console.log('connected games_list channel')
  },

  handleDisconnected() {
    console.log('disconnected games_list channel')
  },

  handleReceived(data) {
    console.log('game list got ' + data.msg)
    console.log(data)
    switch (data.msg) {
      case 'refresh':
        return this.setState({games: data.games, changedGamesIds: data.changed_games_ids})
    }
  },

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} styleName="header">
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Players</TableHeaderColumn>
            <TableHeaderColumn>Rounds</TableHeaderColumn>
            <TableHeaderColumn>Time to Think (sec)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.games.map(game => {
            return <GameItem game={game} key={game.id} updated={this.state.changedGamesIds.includes(game.id)} />
          })}
        </TableBody>
      </Table>

    )
  }
})

export default CSSModules(GamesList, styles)
