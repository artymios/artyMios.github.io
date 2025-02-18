/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');
		var navAltActive = false; // Flag to track if nav.alt is active
		var initialNavWidth = $nav.outerWidth() /* + $nav.padding() */; // Get initial width of #nav
		var finalNavWidth = calculateFinalNavWidth(); // Calculate final width for #nav.alt

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
							navAltActive = true; // Set flag when nav.alt is active
							$nav.css('width', initialNavWidth); // Set initial width of #nav.alt
						},
						leave: function() {
							$nav.removeClass('alt');
							navAltActive = false; // Reset flag when nav.alt is inactive
							$nav.css('width', ''); // Reset width of #nav
						},
					});

				// Adjust nav width on scroll.
				$window.on('scroll', function() {
					if (navAltActive) { // Only adjust width if nav.alt is active
						var scrollTop = $window.scrollTop();
						var maxScroll = 600 /* 1.5 * $('header').height() */; // Increase this value to make the transition slower
						var newWidth = Math.max(initialNavWidth - ((scrollTop - $('header').height()) / maxScroll) * (initialNavWidth - finalNavWidth), finalNavWidth); // Adjust min width as needed
						$nav.css('width', newWidth + 'px');
					}
				});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Function to calculate the final width of #nav.alt
	function calculateFinalNavWidth() {
		var totalWidth = 0;
		$nav.find('ul li a').each(function() {
			totalWidth += $(this).outerWidth(true);
		});
		return totalWidth + 10;
	}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);