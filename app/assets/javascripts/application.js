// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require react
//= require react_ujs
//= require components

//= require_tree .
$(document).ready(function() {
  // list expanders
  $('.expander-trigger').click(function(){
    $(this).toggleClass("expander-hidden");
  });

  // filter buttons
  $('.button-group-item').on('click', function(){
    document.cookie = ('filter='+ $(this).data('filter'));
    window.location.reload();
  });

  // roulette filter
  $('input[name=roulette_filter]').on('change', function(){
    document.cookie = ('roulette_filter='+ this.value);
  });

// navbar js
  var menuToggle = $('#js-mobile-menu').unbind();
   $('#js-navigation-menu').removeClass("show");
   $(document).on('page:load', function(){
     $('#js-navigation-menu').removeClass("show");
   });

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
       $('#js-navigation-menu').removeAttr('style');
     }
   });
 });

 // //roulette button refresh
 // $('.roulette-btn').click(function(){
 //   location.reload();
 // });
});
