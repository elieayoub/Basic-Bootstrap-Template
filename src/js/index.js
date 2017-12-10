var $ = jQuery = require("jquery");
require("bootstrap/dist/js/bootstrap.min.js");
require("bootstrap/dist/css/bootstrap.min.css");
require("font-awesome/css/font-awesome.min.css");
require("../css/index.css");

var _body = $('body'),
    _menuToggle = $('.menu-toggle'),
    _sidebarMenu = $('.sidebar-menu'),
    _sidebarFooter = $('.sidebar-footer'),
    _leftCol = $('.left-menu'),
    _rightCol = $('.right-col'),
    _navMenu = $('.nav-menu'),
    _footer = $('footer');

// Sidebar
function init_sidebar() {
    var setContentHeight = function() {
        // reset height
        _rightCol.css('min-height', $(window).height());

        var bodyHeight = _body.outerHeight(),
            footerHeight = _body.hasClass('footer_fixed') ? -10 : _footer.height(),
            leftColHeight = _leftCol.eq(1).height() + _sidebarFooter.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= _navMenu.height() + footerHeight;

        _rightCol.css('min-height', contentHeight);
    };

    _sidebarMenu.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
            $li.find("span").removeClass("fa-chevron-down").addClass("fa-chevron-left");
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child-menu')) {
                _sidebarMenu.find('li').removeClass('active active-sm');
                _sidebarMenu.find('li ul').slideUp();
            } else {
                if (_body.is(".nav-sm")) {
                    _sidebarMenu.find("li").removeClass("active active-sm");
                    _sidebarMenu.find("li ul").slideUp();
                }
            }
            //disable all active child menu items
            $(".child-menu").each(function(i, obj) {
                $(obj).find("li").removeClass('active');
                $(obj).find("li").find("a").removeClass('current-page');
            });

            $li.addClass('active');
            $(this).addClass('current-page')

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });

            //reset all chevron icons
            $li.parent().find("li a span").removeClass("fa-chevron-down").addClass("fa-chevron-left");
            $li.find("span").removeClass("fa-chevron-left").addClass("fa-chevron-down");
        }
    });

    // toggle small or large menu 
    _menuToggle.on('click', function() {
        console.log('clicked - menu toggle');
        if (_body.hasClass('nav-md')) {
            _sidebarMenu.find('li.active ul').hide();
            _sidebarMenu.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            _sidebarMenu.find('li.active-sm ul').show();
            _sidebarMenu.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        _body.toggleClass('nav-md nav-sm');

        setContentHeight();

        $('.dataTable').each(function() { $(this).dataTable().fnDraw(); });
    });

};
// /Sidebar

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

$(document).ready(function() {
    init_sidebar();
});