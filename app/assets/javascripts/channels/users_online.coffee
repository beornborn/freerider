App.users_online = App.cable.subscriptions.create "UsersOnlineChannel",
  connected: ->
    console.log('connected users_online')

  disconnected: ->
    console.log('disconnected users_online')

  received: (data) ->
    console.log('users online got ' + data.msg)
    console.log(data)
    switch data.msg
      when 'refresh'
        $('.users-online').html('')
        $.each data.users, (i, user) ->
          user = $('<div />', { "class": "player-name", id: "player-name-" + user.id, text: user.name })
          $('.users-online').append(user)
