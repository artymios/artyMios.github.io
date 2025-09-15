/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		var $nav = $('#nav');
		var navAltActive = false;
		var initialNavWidth = $nav.outerWidth() /* + $nav.padding() */;
		var finalNavWidth = calculateFinalNavWidth();

		if ($nav.length > 0) {

			// Shrinking
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
							navAltActive = true; 
							$nav.css('width', initialNavWidth);
						},
						leave: function() {
							$nav.removeClass('alt');
							navAltActive = false;
							$nav.css('width', '');
						},
					});

				// Adjust nav width on scroll
				$window.on('scroll', function() {
					if (navAltActive) {
						var scrollTop = $window.scrollTop();
						var maxScroll = 600 /* 1.5 * $('header').height() */; // Increase for slower transition
						var newWidth = Math.max(initialNavWidth - ((scrollTop - $('header').height()) / maxScroll) * (initialNavWidth - finalNavWidth), finalNavWidth);
						$nav.css('width', newWidth + 'px');
					}
				});

				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

							if ($this.attr('href').charAt(0) != '#')
								return;

							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

							if ($section.length < 1)
								return;

						// Scrollex
							$section.scrollex({
								mode: 'middle',
								initialize: function() {
										if (browser.canUse('transition'))
											$section.addClass('inactive');
								},
								enter: function() {

										$section.removeClass('inactive');

										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// #nav.alt final width calculation
	function calculateFinalNavWidth() {
		var totalWidth = 0;
		$nav.find('ul li a').each(function() {
			totalWidth += $(this).outerWidth(true);
		});
		return totalWidth + 10;
	}

	// Scrolly
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);