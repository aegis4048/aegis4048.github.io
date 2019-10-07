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
    jupyter_css();
    init_indexpage();
    init_panel_toolbox();
    init_fixed_top();
});







