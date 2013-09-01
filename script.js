$(document).ready(function() {
  hide_all();
  var current = $(window.location.hash.replace('/', '\\/'));
  if (current.length > 0)
    game('#' + current.attr('id'));
  else game('#about');
  
  var external_links = $('#nav a[href^="http"]');
  external_links.css('background-image', function (index, value) {
    return "url('images/new-window.png'), " + value;
  });
  external_links.attr('target', '_blank');
  
  $('#nav a[href^="#"]').click(function() {
    game($(this).attr('href'));
    window.submenu = $(this).parents('.submenu');
    window.submenu.addClass('submenu-hide').removeClass('submenu');
    setTimeout(function() {
      window.submenu.addClass('submenu').removeClass('submenu-hide');
    }, 500);
  });
});
function hide_all() { $('section.game').hide(); }

function game(id) {
  hide_all();
  $(id.replace('/', '\\/')).parent().show();
  window.location.assign(id);
  //~ _gaq.push(['_trackPageview', '/' + id]);
}

function embedSWF (swf, id, height) {
  height = height || 500;
  swfobject.embedSWF(swf, id, 800, height, '11.0.0', false, {}, {wmode:'opaque', bgcolor:'#eeeeee', base:'flash/'}, {});
}

window.onhashchange = function() {
  if ($(window.location.hash.replace('/', '\\/')).length > 0)
    game(window.location.hash);
}
