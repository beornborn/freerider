import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import GamesList from '~/app/pages/dashboard/games_list/GamesList'
import UsersOnline from '~/app/pages/dashboard/users_online/UsersOnline'
import CreateGameForm from '~/app/pages/dashboard/CreateGameForm'
import CSSModules from 'react-css-modules'
import styles from './Dashboard.css'

var Dashboard = React.createClass({
  render() {
    let a = (<div styleName="status">Players<span styleName="status"> Online</span></div>)
    return (
      <div>
        <Card styleName="games-card">
          <CardTitle title="Games" />
         {/*    <CreateGameForm />*/}
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
