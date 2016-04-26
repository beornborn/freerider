App.createGameCommunicationLogic = (react) ->
  {
    connected: ->
      console.log('connected game channel')
      @perform 'connected_to_game'

    disconnected: ->
      console.log('disconnected game channel')

    received: (data) ->
      switch data.msg
        when 'users'
          console.log('got users')
          react.setState({users: data.users})
        when 'game'
          console.log('got game')
          react.setState({game: data.game})
  }
