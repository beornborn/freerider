App.createGameCommunicationLogic = (react) ->
  {
    connected: ->
      console.log('connected game channel')
      @perform 'connected_to_game'

    disconnected: ->
      console.log('disconnected game channel')

    received: (data) ->
      console.log('got ' + data.msg)
      console.log(data)
      switch data.msg
        when 'me'
          react.setState({me: data.me})
        when 'players'
          react.setState({players: data.players})
        when 'new_round'
          @setAllData(data)
          react.newRound()
        when 'game_finished'
          @setAllData(data)
          react.gameFinished()
        when 'refresh_all'
          @setAllData(data)

    decide: (decision) ->
      @perform 'decided', decision

    maybeNextRound: (currentRound) ->
      console.log('send maybe_next_round ' + currentRound)
      @perform 'maybe_next_round?', { current_round: currentRound }

    setAllData: (data) ->
      react.setState({game: data.game, players: data.players, winners: data.winners})
  }
