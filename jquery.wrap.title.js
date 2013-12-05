/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
	$(document).on('mouseenter', '[title]', function(e) {
		var $this = $(this),
			title = $this.attr('title');
			
		$this.attr('data-title', title);
		$this.removeAttr('title');
		
		$this.data('timeoutId', setTimeout(function() {
			var titles = [],
				$div = $('<div class="wrap-title"></div>');
			
			$.each(title.split('\r'), function(i, item) {
				$.each(item.split('\n'), function(j, t) {
					titles.push(t);
				});
			});
			
			$div.html(titles.join('<br/>')).css({
				'position': 'absolute',
				'padding': '5px',
				'background': '#000',
				'color': '#fff',
				'font-size': '14px',
				'border-radius': '5px'
			});
			
			$('body').append($div);
			
			//update title position
			var top = e.pageY,
				left = e.pageX,
				width = $div.width(),
				height = $div.height(),
				w = $(window).width(),
				h = $(window).height();
			
			if (top + height < h) {
				if (left + width < w) {
					$div.css('top', (top + 5) + 'px');
					$div.css('left', (left + 5) + 'px');
				} else {
					$div.css('top', (top + 5) + 'px');
					$div.css('right', '0');
				}
			} else {
				if (left + width < w) {
					$div.css('bottom', '0');
					$div.css('left', (left + 5) + 'px');
				} else {
					$div.css('bottom', (h - top + 5) + 'px');
					$div.css('right', '0');
				}
			}
		}, 1000));
	});
	$(document).on('mouseleave', '[data-title]', function() {
		var $this = $(this),
			title = $this.attr('data-title');
		
		$this.attr('title', title);
		$('body').find('.wrap-title').remove();
		
		if ($this.data('timeoutId')) {
			clearTimeout($this.data('timeoutId'));
		}
	});
});