$(document).ready ->
  $('.edit-user-name-button').click ->
    $('.edit-user-form').show()
    $('.user-section').hide()
  $('.edit-user-form').on 'ajax:success', (ev,data) ->
    $('.edit-user-form user[name]').val data.name
    $('.edit-user-form').hide()
    $('.user-name').text data.name
    $('.user-section').show()
