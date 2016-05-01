$(document).ready ->
  $('.edit-user-name-button').click ->
    $('.edit-user-form').show()
    input = $(".edit-user-form input[name='user[name]']")
    input.focus().val input.val()
    $('.user-section').hide()
  $('.edit-user-form').on 'ajax:success', (ev,data) ->
    $('.edit-user-form').hide()
    $('.user-name').text data.name
    $('.user-section').show()
