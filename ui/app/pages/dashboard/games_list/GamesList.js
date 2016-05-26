import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import CSSModules from 'react-css-modules'
import styles from './GamesList.css'
import GameItem from './GameItem'
import CableMixin from '~/app/mixins/cable/GamesListLogic'

let GamesList = React.createClass({
  mixins: [CableMixin],

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} styleName="header">
          <TableRow>
            <TableHeaderColumn styleName="name-column">Name</TableHeaderColumn>
            <TableHeaderColumn>Players</TableHeaderColumn>
            <TableHeaderColumn>Rounds</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.games.map(game => {
            return <GameItem game={game} key={game.id} updated={this.props.changedGamesIds.includes(game.id)} />
          })}
        </TableBody>
      </Table>

    )
  }
})

export default CSSModules(GamesList, styles)
