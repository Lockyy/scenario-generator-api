ready = ->
  closeWelcome = ->
    welcomeMessage = $('#welcome-message')
    welcomeMessage.slideUp('slow')

  $('.close-welcome').on 'click', closeWelcome

$(document).ready(ready)
$(document).on('page:load', ready)
