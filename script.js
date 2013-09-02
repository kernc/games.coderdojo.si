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
function hide_all() {
  $('section.game').hide(0).children('.game-info').html('');
}

function game(id) {
  hide_all();
  var section = $(id.replace('/', '\\/')).parent();
  section.show();
  var info = $(section).children('.game-info');
  if (info.length > 0) {
    info.html('<div id="swfplayer"></div>')
    embedSWF(info.data('swf'), info.data('height'));
    $('body').animate({scrollTop: $(section).offset().top}, 1000);
    window.location.assign(id);  // ?
    _gaq.push(['_trackPageview', '/' + id]);
    info.append('<div class="sharing"><div class="fb-like" data-href="' + window.location + '" data-width="120" data-send="false" data-layout="button_count" data-show-faces="false" data-ref="site-undervid"></div> <div class="g-plusone" data-size="medium" data-width="120"/></div></div>')
    info.append('<div class="comments left"><div id="g-comments"></div></div> \
    <div class="comments right"> \
      <div class="fb-comments" data-href="/' + id + '" data-width="390"></div> \
    </div><div class="clear"/>');
    gapi.comments.render('g-comments', {
      href: window.location,
      width: '390',
      first_party_property: 'BLOGGER',
      view_type: 'FILTERED_POSTMOD'
    });
  }
  gapi.plusone.go();
  FB.XFBML.parse();
}

function embedSWF (swf, height) {
  height = height || 500;
  swfobject.embedSWF(swf, 'swfplayer', 800, height, '11.0.0', false, {}, {wmode:'opaque', bgcolor:'#eeeeee', base:'flash/'}, {});
}

/* This, as is, runs game() twice (once on A-click and once for hash change).
 * Without it, manual URL location updates aren't honored.
 */
//~ window.onhashchange = function() {
  //~ if ($(window.location.hash.replace('/', '\\/')).length > 0)
    //~ game(window.location.hash);
//~ }
