(function() {

  if ($(this).width() < 992) {
    var lastScrollTop = 0;
    $(window).on('scroll', _.debounce(function() {
      if ($(window).scrollTop() > lastScrollTop) {
        $('.navbar').animate({'marginTop': '-80px'})
      } else {
        $('.navbar').animate({'marginTop': '0'})
      }

      lastScrollTop = $(window).scrollTop();
    }, 300, {leading: true, trailling: false}))
  }

}).call(this);
