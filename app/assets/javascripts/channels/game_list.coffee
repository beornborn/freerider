App.createGameListChannel = (react) ->
  {
    connected: ->
      console.log('connected game list channel')

    disconnected: ->
      console.log('disconnected game list channel')

    received: (data) ->
      console.log('game list got ' + data.msg)
      console.log(data)
      switch data.msg
        when 'refresh'
          react.setState({games: data.games, changedGamesIds: data.changed_games_ids})

    refresh: () ->
      @perform 'refresh'
  }
