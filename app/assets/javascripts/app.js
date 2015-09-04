// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery2
//= require jquery_ujs
//= require jquery-ui/effect-slide
//= require bootstrap-sprockets
//= require bootstrap/modal
// Important to import jquery_ujs before rails-bundle as that patches jquery xhr to use the authenticity token!
//= require_tree ./common/
//= require es5-shim/es5-shim
//= require es5-shim/es5-sham
//= require generated/client-bundle
//= require lodash
//= require_tree ./app/
