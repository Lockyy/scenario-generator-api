ready = ->
  hamburgerMenu = $('.menu.hamburger-menu')

  showHamburgerMenu = ->
    resizeHamburgerMenu()
    hamburgerMenu.stop().toggle("slide", { direction: 'right' }, 600, ->
      hamburgerMenu.on 'clickoutside', closeHamburgerMenu
    )

  closeHamburgerMenu = (e)->
    hamburgerMenu.stop().toggle("slide", { direction: 'right' }, 'slow', ->
      hamburgerMenu.off 'clickoutside'
    )

  resizeHamburgerMenu = ->
    hamburgerMenu.height($(document).height())

  resizeHamburgerMenu()

  $('.show-hamburger-menu').on 'click', showHamburgerMenu
  $('.close-hamburger-menu').on 'click', closeHamburgerMenu

$(document).ready(ready)
$(document).on('page:load', ready)
