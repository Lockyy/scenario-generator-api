import _ from 'lodash';

module.exports = {
  isMobile: function() {
    return $(window).width() < 992;
  }
};
