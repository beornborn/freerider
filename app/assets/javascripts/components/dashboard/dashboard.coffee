$(document).on 'turbolinks:load', ->
  $('.edit-user-name-button').click ->
    $('.edit-user-form').show()
    input = $(".edit-user-form input[name='user[name]']")
    input.focus().val input.val()
    $('.user-section').hide()
  $('.edit-user-form').on 'ajax:success', (ev,data) ->
    App.usersOnline.refresh({changed_users_ids: [data.id]})
    $('.edit-user-form').hide()
    $('.user-name').text data.name
    $('.user-section').show()

  $(".create-game-form").validate()
