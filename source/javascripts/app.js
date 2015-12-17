// 1. include all js dependencies
//
//= require "jquery"
//= require "bootstrap-sass/assets/javascripts/bootstrap"
//= require "pace"

// 2. Navbar js customizations
(function ($) {
  $(document).ready(function () {

    // Hide the navbar on the homepage
    // $(".home .navbar").hide();

    // fade in .navbar on homepage when scrolling down
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $(".home .navbar").fadeIn();
        }
      });
    });

    // Checkdesk
    //
    // fade out localization on checkdesk page when scrolling down
    //
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $(".checkdesk .locales").fadeOut();
        } else {
          $(".checkdesk .locales").fadeIn();
        }
      });
    });
  });
}(jQuery));

// 3. Outline.js
// See: http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/
// See: http://a11yproject.com/posts/never-remove-css-outlines/
(function (d) {

  var style_element = d.createElement('STYLE'),
    dom_events = 'addEventListener' in d,
    add_event_listener = function (type, callback) {
      // Basic cross-browser event handling
      if (dom_events) {
        d.addEventListener(type, callback);
      } else {
        d.attachEvent('on' + type, callback);
      }
    },
    set_css = function (css_text) {
      // Handle setting of <style> element contents in IE8
      !!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
    };

  d.getElementsByTagName('HEAD')[0].appendChild(style_element);

  // Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
  add_event_listener('mousedown', function () {
    set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
  });

  add_event_listener('keydown', function () {
    set_css('');
  });

})(document);

// panamora feature
$(function () {
    // Paver
    $('div[data-paver]').paver();
});