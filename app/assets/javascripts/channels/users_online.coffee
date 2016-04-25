App.users_online = App.cable.subscriptions.create "UsersOnlineChannel",
  connected: ->
    console.log('connected users_online')
    @i_am_online()

  disconnected: ->
    console.log('disconnected users_online')

  received: (users) ->
    $('.users-online').html('')
    $.each users, (i, user) ->
      user = $('<div />', { "class": "player-name", id: "player-name-" + user.id, text: user.name })
      $('.users-online').append(user)

  i_am_online: ->
    @perform 'i_am_online'
