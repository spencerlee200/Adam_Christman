const t = TweenMax;
var theme = localStorage.getItem('theme') || 'none selected';
changeTheme(theme);

function changeTheme(arg) {
  if(arg == 'color') {
    $('#colorSwitch input').prop('checked', true);
    $('#initial').css('color','red');
    $('body').css('background-color','#191B21');
    $('h1 span a').css('background-color','#fff');
    $('h1 span a').css('color','#000');
    $('#menu').css('color','#fff');
    $('#menu .highlight').css('background-color','#FF5185');
    $('#menu .underline').css('background-color','#fff');
    $('#social i').css('color','#fff');
  }
  else {
    $('body').css('background-color','#f2f2f2');
    $('h1 span a').css('background-color','#000');
    $('h1 span a').css('color','#fff');
    $('#menu').css('color','#000');
    $('#menu .highlight').css('background-color','#fffc00');
    $('#menu .underline').css('background-color','#000');
    $('#social i').css('color','#000');
  }
}

$(document).ready(function() {
  setTimeout(function(){
    t.to($('#intro_left'), 1.5, {x: '-100vh', ease: Power2.easeIn});
    t.to($('#intro_right'), 1.5, {x: '100vh', skewX: 0, ease: Power2.easeIn});
    t.to($('#initial'), 1.1, {opacity: 0, delay:0.15});
  }, 1500);
  setTimeout(function(){
    $('#title_screen').remove();
  }, 3000);

  $('#page_content h1 span a').mouseenter(function() {
    var n = Math.floor(Math.random() * 5);
    t.to($('#page_content h1'), 0.3, {scale:1.05});
    $('#page_content h1 span').css('background-image','url(img/gif/' + n + '.gif)');
    $('#page_content h1 span a').css('mix-blend-mode','multiply');
  });

  $('#page_content h1 span a').mouseout(function() {
    t.to($('#page_content h1'), 0.3, {scale:1});
    $('#page_content h1 span a').css('mix-blend-mode','normal');
  });

  $('#menu li.work').on('click', function() {
    $('#menu li.work').removeClass('active');
    $(this).addClass('active');
    updateDisplay($(this).val())
  });

  $('#menu li').on('mouseenter', function() {
    t.to($(this).find('.highlight'), 0.7, {width: '100%', ease: Power2.easeOut});
    t.to($(this).find('.underline'), 0.75, {width: '100%', ease: Power2.easeOut,  delay:0.1});
  });

  $('#menu li').on('mouseout', function() {
    t.to($(this).find('.highlight'), 0.7, {width: '0', ease: Power2.easeOut, delay:0.2});
    t.to($(this).find('.underline'), 0.7, {width: '0', ease: Power2.easeOut, delay:0.3});
  });

  $('#social i').mouseenter(function() { t.to($(this), 0.3, {scale:1.3})});
  $('#social i').mouseout(function() { t.to($(this), 0.3, {scale:1})});
  $('#display').mouseenter(function() { t.to($(this), 0.3, {scale:1.01})});
  $('#display').mouseout(function() { t.to($(this), 0.3, {scale:1})});
  $('#close-overlay').mouseenter(function() { t.to($(this), 0.5, {rotation: 180, transformOrigin:'50% 50%',scale:1.2})});
  $('#close-overlay').mouseout(function() { t.to($(this), 0.5, {rotation: 0, transformOrigin:'50% 50%', scale:1})});

  $('#page_content h1 span a').mouseout(function() {
    t.to($('#page_content h1'), 0.3, {scale:1});
    $('#page_content h1 span a').css('mix-blend-mode','normal');
  });

  $('#colorSwitch input').on('click', function() {
    if($(this).is(':checked')){
      localStorage.setItem('theme', 'color');
      var theme = localStorage.getItem('theme');
      changeTheme(theme);
    }
    else {
      localStorage.setItem('theme', 'b&w');
      var theme = localStorage.getItem('theme');
      changeTheme(theme);
    }
  });

  $('#close-overlay').on('click',function() {
    t.to($('#overlay #overlay-content'), 0.6, {x: '-100%', ease: Power4.easeOut});
    t.to($('#overlay #overlay-images'), 0.6, {x: '100%', ease: Power4.easeOut});
    t.to($('#overlay'), 0.01, {display:'none', delay: 0.7});
  });

  $('#display').on('click', function() {
    var active = $('#menu li.active').val();
    t.to($('#overlay'), 0.01, {display:'block'});
    t.fromTo($('#overlay #overlay-content'), 0.7, {x: '0%', y: '-100%'},{y: '0%', ease: Expo.easeOut});
    t.fromTo($('#overlay #overlay-images'), 0.7, {x: '0%', y: '100%'},{y: '0%', ease: Expo.easeOut});
    t.from($('#close-overlay'), 0.5, {opacity: 0, delay: 0.7});
  });
});

function updateDisplay(arg) {
  var tempColors = ['rgba(248,197,208, 1)','rgba(171,227,229,1)','rgba(255,223,186,1)','rgba(186,255,201,1)']; // NOTE: Replace with local img url similiar to gifs
  $('#display').css('background-color',tempColors[arg]);
}
