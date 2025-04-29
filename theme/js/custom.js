var COLLAPSE_WIDTH = 768;
var GRID_LARGE = 992;
var GRID_SMALL = 576;
var LOGO_COLLAPSE_WIDTH = 768;

function init_navbar () {
    if (windowSize > COLLAPSE_WIDTH) {
        $('.nav-item').on( {
            mouseenter: function () {
                $(this).addClass('hover');
            },
            mouseleave: function () {
                $(this).removeClass('hover');
            }
        });
    }
}
function init_inpage_navigation () {
    function storeLastScrollPosition() {
        lastScrollPosition = $(window).scrollTop();
    }

    function handleInternalLinkClick(event) {
        event.preventDefault();
        storeLastScrollPosition();

        var href = $(this).attr('href');
        var safeHref = href.replace(/([.])/g, "\\$1");
        var targetId = href.substring(1);
        var element = document.getElementById(targetId) || document.querySelector(`[id='${targetId}']`);

        if(element) {
            var navbarOffset = $('.navbar').outerHeight();
            $('html, body').animate({
                scrollTop: $(element).offset().top - navbarOffset - 15
            }, 'slow', function() {
                history.pushState({scrollPosition: lastScrollPosition}, null, href);
            });
        } else {
            console.error('The element ' + href + ' does not exist on the page.');
        }
    }
    function handleBackButton() {
        if (history.state && history.state.scrollPosition !== undefined) {
            $('html, body').animate({
                scrollTop: history.state.scrollPosition
            }, 'slow');
        }
    }
    // Attach event handler to all internal link navigators
    $('a[href^="#"]').on('click', handleInternalLinkClick);
    // Handle popstate event
    $(window).on('popstate', handleBackButton);
}

function init_toc () {
    var $toc = $('#toc_container').clone();
    var $toc_new = $toc.removeClass('display-none')
    $('#article-sidebar').html($toc_new);
}
function check_width() {
    window.windowSize = $(window).outerWidth();
    if (windowSize < COLLAPSE_WIDTH) {
        $('#navbar').removeClass('container');
        $('.navbar-nav').removeClass('hidden');
        $('.nav-link').addClass('collapsed');
        $('#search-form').addClass('collapsed');
        $('#search-form.row').addClass('collapsed');
        $('.navbar-title').addClass('collapsed');
        $('.search-box-div').css('display', '');
        $('.search-box-div').addClass('row');
        $('.navbar-title').removeClass('container');
    }
    if (windowSize > COLLAPSE_WIDTH) {
        $('#navbar').addClass('container');
        $('.navbar-nav').removeClass('hidden');
        $('.nav-link').removeClass('collapsed');
        $('#search-form').removeClass('collapsed');
        $('#search-form.row').removeClass('collapsed');
        $('.navbar-brand').css('margin-left', '0');
        $('.navbar-toggler').css('margin-right', '0');
        $('.navbar-title').removeClass('collapsed');
        $('.search-box-div').css('display', 'inherit');
        $('.search-box-div').removeClass('row');
        $('.navbar-title').addClass('container');
        
        if (windowSize < GRID_LARGE) {
            $('#post-container').removeClass('post');
        }
    }
    if (windowSize < GRID_SMALL) {
        $('.admonition-image').css('max-width', '100%');
        $('.admonition-image-medium').css('max-width', '100%');
        $('.bullet-point-image-medium').css('padding', '0');
    }
    else {
        $('.admonition-image').css('max-width', '380px');
        $('.admonition-image-medium').css('max-width', '550px');
        $('.bullet-point-image-medium').css('padding', '0px 100px 0px 100px');
    }
    if (windowSize < GRID_LARGE) {
        $('.give-margin').removeClass('full_screen_margin');
    }
    else {
        $('.give-margin').addClass('full_screen_margin');
    }
}
function jupyter_css() {
    if (window.windowSize > 486) {
        $('.prompt').css('width', '69.53px');
    }
    $('.rendered_html th').css('background', '100%')
}
function init_indexpage() {
    $('.index-static-avatar').hover(function () {
        $(this).closest('.index-author-list-item').children('.index-author-name-tooltip').toggleClass('tooltip-opacity')
    })
}
function init_progressbar() {
    var getMax = function(){
        return $(document).height() - $(window).height();
    };
    var getValue = function() {
        return $(window).scrollTop();
    };
    if('max' in document.createElement('progress')){
        // Browser supports progress element
        var progressBar = $('progress');
        // Set the Max attr for the first time
        progressBar.attr({ max: getMax() });
        $(document).on('scroll', function(){
            // On scroll only Value attr needs to be calculated
            progressBar.attr({ value: getValue() });
        });
        $(window).resize(function(){
            // On resize, both Max/Value attr needs to be calculated
            progressBar.attr({ max: getMax(), value: getValue() });
        });
    }
    else {
        var progressBar = $('.progress-bar'),
            max = getMax(),
            value, width;
        var getWidth = function(){
            // Calculate width in percentage
            value = getValue();
            width = (value/max) * 100;
            width = width + '%';
            return width;
        };
        var setWidth = function(){
            progressBar.css({ width: getWidth() });
        };
        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
            // Need to reset the Max attr
            max = getMax();
            setWidth();
        });
    }
    $(document).on('scroll', function() {
        maxAttr = $('#progressBar').attr('max');
        valueAttr = $('#progressBar').attr('value');
        percentage = (valueAttr/maxAttr) * 100;
    });
}

function init_fixed_top() {
    if ($('.fixme').length > 0) {
        var fixmeTop = $('.fixme').offset().top;
        if (windowSize > GRID_LARGE) {
            $(window).scroll(function() {
                var currentScrollTop = $(window).scrollTop();
                var currentScrollBottom = $(window).scrollTop() + $(window).height();
                var docHeight = $(document).height();
                var footerHeight = $('.footer').height();
                var bottomOffset = footerHeight + 68;

                if (currentScrollTop + 25 >= fixmeTop && currentScrollBottom <  docHeight - footerHeight - 68) {
                    $('.fixme').css({
                        position: 'fixed',
                        top: '25px',
                        bottom: 'unset',
                    });
                    $('.index-left-col').css({
                        display: 'unset',
                        'align-items': 'unset',
                    })
                } else if (currentScrollBottom >=  docHeight - footerHeight - 68) {
                    $('.fixme').css({
                        position: 'unset',
                    });
                    $('.index-left-col').css({
                        display: 'flex',
                        'align-items': 'flex-end',
                    })
                }
                else {
                    $('.fixme').css({
                        position: 'static',
                    });
                    $('.index-left-col').css({
                        display: 'unset',
                        'align-items': 'unset',
                    })
                }
            });
        }
        else {
            $('.fixme').css({
                position: 'static',
            });
            $('.index-left-col').css({
                display: 'unset',
                'align-items': 'unset',
            })
        }
    }
}

function init_detectMathJaxParent() {
    $('.MathJax_Preview').each(function() {
        // Find the closest parent div and add 'overflow-hidden' class
        $(this).closest('div').addClass('scroll-hidden');
    });
    console.log("test")
}
MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
MathJax.Hub.Queue(init_detectMathJaxParent);  // Call the function after MathJax completes

function init_image_zoom() {
    $('.row [class*="col-"] img').click(function() {
        // Get the source of the clicked image
        var imgSrc = $(this).attr('src');

        // Create the overlay and zoomed image elements
        var overlay = $('<div id="overlay" class="overlay"></div>');
        var zoomedImage = $('<img src="' + imgSrc + '" class="zoomed-image">');

        // Append the zoomed image to the overlay
        overlay.append(zoomedImage);

        // Append the overlay to the body
        $('body').append(overlay);

        // Show the overlay
        overlay.fadeIn();

        // Click event for the overlay (to close the pop-up)
        overlay.click(function() {
            // Hide and remove the overlay
            $(this).fadeOut(function() {
                $(this).remove();
            });
        });
    });
}
function init_slideshow() {
    $('.linkedin-slideshow').each(function() {
        const $slider = $(this);
        const $slides = $slider.find('.slide');
        const $progressTrack = $slider.find('.progress-track');
        const $pageCounter = $slider.find('.page-counter');
        let currentSlide = 0;

        // Initialize progress steps
        function initProgressBar() {
            $progressTrack.empty();

            // Create one step per slide
            for (let i = 0; i < $slides.length; i++) {
                $progressTrack.append('<div class="progress-step"></div>');
            }

            updateSlider();
        }

        function updateSlider() {
            // Update slides
            $slides.removeClass('active').eq(currentSlide).addClass('active');

            // Update progress steps
            $progressTrack.find('.progress-step')
                .removeClass('active')
                .filter((index) => index <= currentSlide)
                .addClass('active');

            // Update counter
            $pageCounter.text(`${currentSlide + 1}/${$slides.length}`);
        }

        function goNext() {
            currentSlide = (currentSlide + 1) % $slides.length;
            updateSlider();
        }

        function goPrev() {
            currentSlide = (currentSlide - 1 + $slides.length) % $slides.length;
            updateSlider();
        }

        // Initialize progress bar
        initProgressBar();

        // Event listeners - IMPORTANT: These must use the same class names as your HTML
        $slider.find('.bottom-next, .image-next').on('click', goNext);
        $slider.find('.bottom-prev, .image-prev').on('click', goPrev);

        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if ($slider.is(':visible')) {  // Changed from :hover to :visible for better reliability
                if (e.key === 'ArrowLeft') goPrev();
                if (e.key === 'ArrowRight') goNext();
            }
        });
    });
}


function init_fullscreen() {
    $('.linkedin-slideshow').each(function() {
        var $slider = $(this);
        var $wrapper = $slider.closest('.slideshow-wrapper');
        var $fullscreen_toggle = $slider.find('.fullscreen-toggle');
        var $enter_fs = $slider.find('.enter-fullscreen');
        var $exit_fs = $slider.find('.exit-fullscreen');
        var $top_band = $slider.find('.top-band');
        var $bottom_band = $slider.find('.bottom-band');
        var $nav_buttons = $slider.find('.image-prev, .image-next');

        var hide_timeout;
        var is_fullscreen = false;
        var last_activity = 0;

        // Core Functions
        function toggle_fullscreen() {
            if (!is_fullscreen) {
                if ($wrapper[0].requestFullscreen) $wrapper[0].requestFullscreen();
                else if ($wrapper[0].webkitRequestFullscreen) $wrapper[0].webkitRequestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            }
        }

        function show_controls() {
            if (!is_fullscreen) return; // Only in fullscreen
            clearTimeout(hide_timeout);
            $top_band.add($bottom_band).add($nav_buttons).removeClass('hidden');
            last_activity = Date.now();
            hide_timeout = setTimeout(hide_controls, 2000);
        }

        function hide_controls() {
            if (is_fullscreen) { // Only hide if still in fullscreen
                $top_band.add($bottom_band).add($nav_buttons).addClass('hidden');
            }
        }

        function handle_fullscreen_change() {
            is_fullscreen = !is_fullscreen;
            if (is_fullscreen) {
                $enter_fs.hide();
                $exit_fs.show();
                show_controls();
            } else {
                // EXIT CLEANUP
                $enter_fs.show();
                $exit_fs.hide();
                clearTimeout(hide_timeout); // Cancel pending hide
                $top_band.add($bottom_band).add($nav_buttons)
                    .removeClass('hidden') // Force remove hidden class
                    .removeAttr('style'); // Clear any inline styles
            }
        }

        // Event Listeners
        $fullscreen_toggle.on('click', toggle_fullscreen);
        $(document).on('fullscreenchange webkitfullscreenchange', handle_fullscreen_change);

        $slider.on('mousemove', function() {
            show_controls();
        });

        $(document).on('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                show_controls();
            }
        });
    });
}


function init_panel_toolbox() {
    $('.collapse-link').on('click', function () {
        var $BOX_PANEL = $(this).closest('.solution_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.solution_content'),
            $COMPONENT_PANEL = $BOX_PANEL.find('.panel-row');

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.hasClass('closed')) {
            $BOX_CONTENT.slideToggle(200, function () {
                $BOX_PANEL.toggleClass('closed');
            });
            $BOX_PANEL.css('height', 'auto');
            $COMPONENT_PANEL.css('display', 'none');
        } else {
            $BOX_CONTENT.slideToggle(200, function () {
                $BOX_PANEL.toggleClass('closed');
            });
            $COMPONENT_PANEL.css('display', 'block');
        }

        $ICON.toggleClass('fa-chevron-down fa-chevron-up');
    });
}

$(document).ready(function() {
    check_width();
    $(window).resize(check_width);
    init_navbar();
    init_progressbar();
    init_toc();
    jupyter_css();
    init_indexpage();
    init_panel_toolbox();
    init_fixed_top();
    init_inpage_navigation();
    init_detectMathJaxParent();
    init_image_zoom();
    init_slideshow();
    init_fullscreen();
});







