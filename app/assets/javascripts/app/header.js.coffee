ready = ->
  hamburgerMenu = $('.menu.hamburger-menu')

  showHamburgerMenu = ->
    hamburgerMenu.stop().toggle("slide", { direction: 'right' }, 600, ->
      resizeHamburgerMenu()
      hamburgerMenu.on 'clickoutside', _.throttle((e)->
        if _.include($(e.target).attr('class'), 'myTagSuggestion')
          return

        closeHamburgerMenu()
      )
    )

  closeHamburgerMenu = (e)->
    hamburgerMenu.stop().toggle("slide", { direction: 'right' }, 'slow', ->
      hamburgerMenu.off 'clickoutside'
    )

  resizeHamburgerMenu = ->
    hamburgerMenu.height($(document).height());

  resizeHamburgerMenu()

  $('.show-hamburger-menu').on 'click', _.debounce(showHamburgerMenu, 250)
  $('.close-hamburger-menu').on 'click', _.debounce(closeHamburgerMenu, 250)
  hamburgerMenu.on 'click', _.debounce(resizeHamburgerMenu, 250)
  $(window).on 'resize', _.debounce(resizeHamburgerMenu, 150)

$(document).ready(ready)
$(document).on('page:load', ready)
