import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './UsersOnline.css'
import { CableMixin, ChannelMixin } from 'action-cable-react';
import UsersItem from './UsersItem'

var channelName = 'UsersOnlineChannel'
var UsersOnline = React.createClass({
  mixins: [CableMixin(React), ChannelMixin(channelName)],

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.cable.channels !== prevContext.cable.chanels) {
      ChannelMixin(channelName).componentDidMount.apply(this)
    }
  },

  getInitialState() {
    return {users: [], changedUsersIds: []}
  },

  handleConnected() {
    console.log('connected users_online channel')
  },

  handleDisconnected() {
    console.log('disconnected users_online channel')
  },

  handleReceived(data) {
    console.log('users online got ' + data.msg);
    console.log(data);
    switch (data.msg) {
      case 'connected':
        return this.perform(channelName, 'refresh', {})
      case 'refresh':
        return this.setState({
          users: data.users,
          changedUsersIds: data.changed_users_ids
        });
    }
  },

  render() {
    return (
      <div>
        <h4 styleName="header">
          Players
          <span styleName="status"> Online</span>
        </h4>
        <div>
          {this.state.users.map(user => {
            return (<UsersItem user={user} key={user.id} updated={this.state.changedUsersIds.includes(user.id)} />)
          })}
        </div>
      </div>
    )
  }
})

export default CSSModules(UsersOnline, styles)
