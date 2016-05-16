import React from 'react'
import { CableMixin, ChannelMixin } from 'action-cable-react';
import UsersItem from './UsersItem'

var UsersOnline = React.createClass({
  mixins: [CableMixin(React), ChannelMixin('UsersOnlineChannel')],
  propTypes: {
    cable: React.PropTypes.object.isRequired
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
        return this.perform('UsersOnlineChannel', 'refresh', {})
      case 'refresh':
        return this.setState({
          users: data.users,
          changedUsersIds: data.changed_users_ids
        });
    }
  },

  render() {
    return (
      <div className="users-container">
        <h4>
          Players
          <span className="text-success"> Online</span>
        </h4>
        <div className="users-online">
          {this.state.users.map(user => {
            return (<UsersItem user={user} key={user.id} updated={this.state.changedUsersIds.includes(user.id)} />)
          })}
        </div>
      </div>
    )
  }
})

export default UsersOnline
