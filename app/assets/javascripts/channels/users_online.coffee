App.createUsersOnlineChannel = (react) ->
  {
    connected: ->
      console.log('connected users_online')

    disconnected: ->
      console.log('disconnected users_online')

    refresh: (options) ->
      @perform 'refresh', options

    received: (data) ->
      console.log('users online got ' + data.msg)
      console.log(data)
      switch data.msg
        when 'refresh'
          react.setState({users: data.users, changedUsersIds: data.changed_users_ids})
  }
