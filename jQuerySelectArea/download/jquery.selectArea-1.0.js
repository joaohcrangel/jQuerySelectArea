(function ($) {
  $.fn.selectArea = function (options) {
	
	var opt = $.extend( {
      minWidth:10,
      minHeight:10
    }, options);
	
	var fn_mousedown = function(e){
		
		var cY = e.clientY+$(document).scrollTop(), cX = e.clientX+$(document).scrollLeft();
		
		var ghost = $('<div Y="' + cY + '" X="' + cX + '" class="ghost"></div>').css({
			'top': cY,
			'left': cX,
			'position': 'absolute',
			'background-color': 'rgba(51,153,255,.5)',
			'border': '#3399FF 1px solid',
			'z-index': '999999'
		});
		$(this).append(ghost);
		$('*').blur();
		e.preventDefault();
	}
	var fn_mousemove = function(e){
		if ($('.ghost').length) {
			var cY = e.clientY+$(document).scrollTop(), cX = e.clientX+$(document).scrollLeft();
			var h = cY - $('.ghost').attr('Y');
			var w = cX - $('.ghost').attr('X');
			if (h < 0) {
			  var p1 = cY;
			  var p2 = $('.ghost').attr('Y');
			  $('.ghost').css({
				'top': p1,
				'height': p2 - p1
			  })
			} else {
			  $('.ghost').css({
				'height': h
			  })
			}
			if (w < 0) {
			  var p1 = cX;
			  var p2 = $('.ghost').attr('X');
			  $('.ghost').css({
				'left': p1,
				'width': p2 - p1
			  })
			} else {
			  $('.ghost').css({
				'width': w
			  })
			}
		  }
		  e.preventDefault();
	}
	var fn_mouseup = function(e){
		  var ghost = $('.ghost');
		  function f(s){
			  return parseInt(s.toString().replace('px',''));
		  }			  
		  var y1 = f(ghost.css('top'));
		  var x1 = f(ghost.css('left'));
		  var y2 = y1+f(ghost.css('height'));
		  var x2 = x1+f(ghost.css('width'));
		  var w = f(ghost.css('width'));
		  var h = f(ghost.css('height'));
		  
		  if(typeof opt.select == 'function' && opt.minWidth<=w && opt.minHeight<=h) opt.select.apply(this, [y1, x1, y2, x2, w, h]);
		  ghost.remove();
		  e.preventDefault();
	}
	$(this).bind('mousedown', fn_mousedown).bind('mousemove', fn_mousemove).bind('mouseup', fn_mouseup);
  }
})(jQuery);