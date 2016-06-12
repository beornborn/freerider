import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import GamesList from '~/app/containers/GamesList'
import UsersOnline from '~/app/containers/UsersOnline'
import CreateGameForm from '~/app/components/dashboard/CreateGameForm'
import LeaveGameButton from '~/app/containers/LeaveGameButton'
import CSSModules from 'react-css-modules'
import styles from './Dashboard.css'

var Dashboard = React.createClass({
  render() {
    let button = this.props.playerInGame ? <LeaveGameButton /> : <CreateGameForm />
    return (
      <div styleName="content">
        <Card styleName="games-card">
          <CardTitle title="Games" />
          {button}
          <GamesList />
        </Card>
        <Card styleName="users-online-card">
          <UsersOnline />
        </Card>
      </div>
    )
  }
})

export default CSSModules(Dashboard, styles)