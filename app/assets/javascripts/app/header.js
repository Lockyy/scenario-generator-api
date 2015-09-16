(function() {
  var ready;

  ready = function() {
    var closeHamburgerMenu, hamburgerMenu, resizeHamburgerMenu, showHamburgerMenu;

    hamburgerMenu = $('.menu.hamburger-menu');

    showHamburgerMenu = function(e) {
      e.preventDefault();
      return hamburgerMenu.stop().toggle("slide", {
        direction: 'right'
      }, 600, function() {
        resizeHamburgerMenu();
        return hamburgerMenu.on('clickoutside', _.throttle(function(outsideE) {
          if (_.include($(outsideE.target).attr('class'), 'myTagSuggestion') ||
              _.include($(outsideE.target).data('role'), 'remove')) {
            return;
          }
          return closeHamburgerMenu(e);
        }));
      });
    };
    closeHamburgerMenu = function(e) {
      e.preventDefault();
      return hamburgerMenu.stop().toggle("slide", {
        direction: 'right'
      }, 'slow', function() {
        return hamburgerMenu.off('clickoutside');
      });
    };
    resizeHamburgerMenu = function() {
      return hamburgerMenu.height($(document).height());
    };
    resizeHamburgerMenu();
    $('.show-hamburger-menu').on('click', showHamburgerMenu);
    $('.close-hamburger-menu').on('click', closeHamburgerMenu);
    hamburgerMenu.on('click', _.debounce(resizeHamburgerMenu, 250));
    return $(window).on('resize', _.debounce(resizeHamburgerMenu, 150));
  };

  $(document).ready(ready);
  $(document).on('page:load', ready);

  var lastScrollTop = 0;
  $(window).on('scroll', _.debounce(function() {
    if ($(window).scrollTop() > lastScrollTop) {
      $('.navbar').animate({'marginTop': '-80px'})
    } else {
      $('.navbar').animate({'marginTop': '0'})
    }

    lastScrollTop = $(window).scrollTop();
  }, 300, {leading: true, trailling: false}))

}).call(this);
