ready = ->

  page = $("html, body")

  scrollToTour = ->
    page.on "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", ->
      page.stop()

    page.animate { scrollTop: $('.benefits').offset().top + 10 }, 'slow', ->
      page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove")

    return false

  $('.tour-button').on 'click', scrollToTour

  setActiveSlideshowBox = (slideNumber) ->
    $('.slide-show-box').removeClass('active')
    $($('.slide-show-box')[slideNumber]).addClass('active')

  $('#slideshow').slidesjs({
    width: '100%',
    height: 450,
    navigation: false,
    play:
      auto: true,
      interval: 3000
    callback:
      start: setActiveSlideshowBox
  })

  $('.slide-show-box').height($('.slide-show-box').width())

  $('.slide-show-box.discover').on 'click', ->
    $('.slidesjs-pagination-item a')[0].click()
    setActiveSlideshowBox(0)

  $('.slide-show-box.review').on 'click', ->
    $('.slidesjs-pagination-item a')[1].click()
    setActiveSlideshowBox(1)

  $('.slide-show-box.share').on 'click', ->
    $('.slidesjs-pagination-item a')[2].click()
    setActiveSlideshowBox(2)

  $('.slide-show-box.learn').on 'click', ->
    $('.slidesjs-pagination-item a')[3].click()
    setActiveSlideshowBox(3)

  $('#carousel').slidesjs
    width: 700,
    height: 380,
    navigation:
      effect: 'carousal'

$(document).ready(ready)
$(document).on('page:load', ready)