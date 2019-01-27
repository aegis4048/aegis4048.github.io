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
        $('#post-container').removeClass('post');
        $('#post-container').css('padding-right', '15px');
        $('#post-container').css('padding-left', '15px');

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
        $('#post-container').addClass('post');
        $('#post-container').css('padding-right', '50px');
        $('#post-container').css('padding-left', '50px');
        
        if (windowSize < GRID_LARGE) {
            $('#post-container').removeClass('post');
        }
    }
    if (windowSize < GRID_SMALL) {
        $('.admonition-image').css('max-width', '100%')
    }
    else {
        $('.admonition-image').css('max-width', '380px')
    }
}
function jupyter_css() {
    if (window.windowSize > 486) {
        $('.prompt').css('width', '69.53px');
    }
    $('.rendered_html th').css('background', '100%')
}
function init_progressbar() {
    var getMax = function(){
        return $(document).height() - $(window).height();
    }
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

$(document).ready(function() {
    check_width();
    $(window).resize(check_width);
    init_navbar();
    init_progressbar();
    jupyter_css();
});







