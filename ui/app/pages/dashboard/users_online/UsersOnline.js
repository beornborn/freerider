import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './UsersOnline.css'
import { CableMixin, ChannelMixin } from 'action-cable-react';
import UsersItem from '~/app/pages/dashboard/users_online/UsersItem'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { REFRESH } from '~/app/reducers/UsersOnline'

var channelName = 'UsersOnlineChannel'
var UsersOnline = React.createClass({
  mixins: [CableMixin(React), ChannelMixin(channelName)],

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.props.cable.channels !== prevProps.cable.channels) {
      ChannelMixin(channelName).componentDidMount.apply(this)
    }
  },

  handleConnected() { console.log('connected users_online channel') },
  handleDisconnected() { console.log('disconnected users_online channel') },

  handleReceived(data) {
    console.log('users online got ' + data.msg)
    console.log(data)
    switch (data.msg) {
      case 'connected':
        return this.perform(channelName, 'refresh', {})
      case 'refresh':
        return this.props.refreshUsers({
          users: data.users,
          changedUsersIds: data.changed_users_ids
        });
    }
  },

  render() {
    let users = this.props.users.map(user => {
      return (<UsersItem user={user} key={user.id} updated={this.props.changedUsersIds.includes(user.id)} />)
    })

    return (
      <div>
        <div styleName="header">
          Players
          <span styleName="status"> Online</span>
        </div>
        <div>
          {users}
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    cable: state.shared.cable,
    users: state.usersOnline.users,
    changedUsersIds: state.usersOnline.changedUsersIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshUsers: (data) => { dispatch(createAction(REFRESH)(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(UsersOnline, styles))
