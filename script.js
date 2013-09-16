function preinit() {
  try {
    jQuery;
    init();
  } catch (err) {
    setTimeout(preinit, 10);
  }
}

function init() {
  $(document).ready(function() {
    hide_all();
    var current = $(window.location.hash.replace('/', '\\/'));
    if (current.length > 0) {
      //window.location.assign('#' + current.attr('id'));
      onhashchange();
    } else window.location.hash = '#about';
    
    $('#nav a[href^="http"]').css('background-image', function (index, value) {
      return "url('images/new-window.png'), " + value;
    });
    $('a[href^="http"]').attr('target', '_blank');
    
    $('#nav a[href^="#"]').click(function() {
      window.location.assign($(this).attr('href'));
      window.submenu = $(this).parents('.submenu');
      window.submenu.addClass('submenu-hide').removeClass('submenu');
      setTimeout(function() {
        window.submenu.addClass('submenu').removeClass('submenu-hide');
      }, 500);
    });
  });
}
function hide_all() {
  $('section.game').hide(0).children('.game-info').html('');
}

function embedSWF (swf, height) {
  height = height || 500;
  swfobject.embedSWF(swf, 'swfplayer', 800, height, '11.0.0', false, {}, {wmode:'opaque', bgcolor:'#eeeeee', base:'flash/'}, {});
}

window.onhashchange = function() {
  var id = window.location.hash;
  var safe_id = id.replace('/', '\\/');
  var section = $(safe_id);
  if (section.length > 0) {
    section = section.parent();
    var gameinfo = $(section).children('.game-info');
    if (gameinfo.length > 0) {
      hide_all();
      section.show();
      _gaq.push(['_trackPageview', '/' + id]);
      if (gameinfo.data('swf')) {
        gameinfo.html('<div id="swfplayer"></div>')
        embedSWF(gameinfo.data('swf'), gameinfo.data('height'));
        $('html,body').animate({scrollTop: $(section).offset().top}, 1000);
      }
      gameinfo.append('<div class="sharing"><div class="fb-like" data-href="' + window.location + '" data-width="120" data-send="false" data-layout="button_count" data-show-faces="false" data-ref="site-undervid"></div> <div class="g-plusone" data-size="medium" data-width="120"/></div></div>')
      gameinfo.append('<div class="comments left"><div id="g-comments"></div></div> \
      <div class="comments right"> \
        <div class="fb-comments" data-href="/' + id + '" data-width="390"></div> \
      </div><div class="clear"/>');
      gapi.comments.render('g-comments', {
        href: window.location,
        width: '390',
        first_party_property: 'BLOGGER',
        view_type: 'FILTERED_POSTMOD'
      });
    } else return game('#about');
    gapi.plusone.go();
    FB.XFBML.parse(section[0]);
    return
  }
}
preinit();