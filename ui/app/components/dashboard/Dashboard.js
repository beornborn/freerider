import React from 'react'
import GamesList from '~/app/containers/dashboard/games_list/GamesList'
import UsersOnline from '~/app/containers/dashboard/users_online/UsersOnline'
import CreateGameForm from '~/app/containers/dashboard/CreateGameForm'
import LeaveGameButton from '~/app/containers/game/LeaveGameButton'
import CSSModules from 'react-css-modules'
import styles from './Dashboard.css'
import { Tabs, Tab, Divider } from 'material-ui'
import Chat from '~/app/containers/chat/Chat'

var Dashboard = React.createClass({
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
          <Tab label="Games" >{this.gamesList()}</Tab>
          <Tab label="Chat" >{this.usersOnline()}</Tab>
        </Tabs>
      </div>
    } else {
      return <div styleName='desktop'>
        {this.gamesList()}
        {this.usersOnline()}
      </div>
    }
  },

  button() { return (this.props.playerInGame ? <LeaveGameButton /> : <CreateGameForm />)},
  gamesList() {
    return <div styleName='card'>
      <div styleName='button'>{this.button()}</div>
      <GamesList />
    </div>
  },
  usersOnline() {
    return <div styleName='card'>
      <UsersOnline />
      <Divider />
      <Chat />
    </div>
  }
})

export default CSSModules(Dashboard, styles)
