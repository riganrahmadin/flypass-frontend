$(() => {
    const siteSticky = function () {
        $('.js-sticky-header').sticky({ topSpacing: 0 });
    };
    siteSticky();

    const siteMenuClone = function () {
        $('.js-clone-nav').each(function () {
            const $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
        });

        setTimeout(() => {
            let counter = 0;
            $('.site-mobile-menu .has-children').each(function () {
                const $this = $(this);

                $this.prepend('<span class="arrow-collapse collapsed">');

                $this.find('.arrow-collapse').attr({
                    'data-toggle': 'collapse',
                    'data-target': `#collapseItem${counter}`,
                });

                $this.find('> ul').attr({
                    class: 'collapse',
                    id: `collapseItem${counter}`,
                });

                counter++;
            });
        }, 1000);

        $('body').on('click', '.arrow-collapse', function (e) {
            const $this = $(this);
            if ($this.closest('li').find('.collapse').hasClass('show')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
            e.preventDefault();
        });

        $(window).resize(function () {
            const $this = $(this);
            const w = $this.width();

            if (w > 768) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });

        $('body').on('click', '.js-menu-toggle', function (e) {
            const $this = $(this);
            e.preventDefault();

            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        });

        // click outisde offcanvas
        $(document).mouseup((e) => {
	    const container = $('.site-mobile-menu');
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
	    }
        });
    };
    siteMenuClone();
});
