let UsersOnline = React.createClass({
  componentWillMount() {
    this.usersOnlineChannel = App.cable.subscriptions.create("UsersOnlineChannel", App.createUsersOnlineChannel(this))
    App.usersOnline = this.usersOnlineChannel
  },

  componentWillUnmount() {
    this.usersOnlineChannel.unsubscribe()
  },

  getInitialState: function() {
    return {users: [], changedUsersIds: []}
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
});
