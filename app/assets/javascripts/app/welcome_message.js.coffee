ready = ->
  closeWelcome = (e)->
    welcomeMessage = $('#welcome-message')
    welcomeMessage.stop().slideUp('slow')
    e.preventDefault()

  $('.close-welcome').on 'click', closeWelcome
  $('#welcome-message').on 'click', closeWelcome

$(document).ready(ready)
$(document).on('page:load', ready)
