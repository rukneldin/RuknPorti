$(document).ready(function () {
    "use strict";

    /*==================================
    * Author        : "ThemeSine"
    * Template Name : Khanas HTML Template
    * Version       : 1.0
    ==================================== */

    /*=========== TABLE OF CONTENTS ===========
    1. Scroll To Top 
    2. Smooth Scroll spy
    3. Progress-bar
    4. Owl carousel
    5. Welcome animation support
    6. Button Animation (GSAP)
    ======================================*/

    // 1. Scroll To Top 
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.return-to-top').fadeIn();
        } else {
            $('.return-to-top').fadeOut();
        }
    });
    $('.return-to-top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    // 2. Smooth Scroll spy
    $('.header-area').sticky({
        topSpacing: 0
    });

    $('li.smooth-menu a').bind("click", function (event) {
        event.preventDefault();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 0
        }, 1200, 'easeInOutExpo');
    });

    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 0
    });

    // 3. Progress-bar
    var dataToggleTooTip = $('[data-toggle="tooltip"]');
    var progressBar = $(".progress-bar");
    if (progressBar.length) {
        progressBar.appear(function () {
            dataToggleTooTip.tooltip({
                trigger: 'manual'
            }).tooltip('show');
            progressBar.each(function () {
                var each_bar_width = $(this).attr('aria-valuenow');
                $(this).width(each_bar_width + '%');
            });
        });
    }

    // 4. Owl carousel
    $('#client').owlCarousel({
        items: 7,
        loop: true,
        smartSpeed: 1000,
        autoplay: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            415: {
                items: 2
            },
            600: {
                items: 4
            },
            1199: {
                items: 4
            },
            1200: {
                items: 7
            }
        }
    });

    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000]);
    });
    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay');
    });

    // 5. Welcome animation support
    $(window).on('load', function () {
        $(".header-text h2, .header-text p").removeClass("animated fadeInUp").css({ 'opacity': '0' });
        $(".header-text a").removeClass("animated fadeInDown").css({ 'opacity': '0' });
        
        $(".header-text h2, .header-text p").addClass("animated fadeInUp").css({ 'opacity': '0' });
        $(".header-text a").addClass("animated fadeInDown").css({ 'opacity': '0' });
    });

    // 6. Button Animation (GSAP)
    $('.contact-btn').on('click', function (event) {
        event.preventDefault(); // Prevents the default anchor tag behavior (scroll to top)

        var button = this; // Reference the button clicked

        if (!$(button).hasClass('active')) {
            $(button).addClass('active');

            // GSAP animation logic for button click
            gsap.to(button, {
                keyframes: [
                    {
                        '--left-wing-first-x': 50,
                        '--left-wing-first-y': 100,
                        '--right-wing-second-x': 50,
                        '--right-wing-second-y': 100,
                        duration: 0.2,
                        onComplete: function () {
                            gsap.set(button, {
                                '--left-wing-first-y': 0,
                                '--left-wing-second-x': 40,
                                '--left-wing-second-y': 100,
                                '--left-wing-third-x': 0,
                                '--left-wing-third-y': 100,
                                '--left-body-third-x': 40,
                                '--right-wing-first-x': 50,
                                '--right-wing-first-y': 0,
                                '--right-wing-second-x': 60,
                                '--right-wing-second-y': 100,
                                '--right-wing-third-x': 100,
                                '--right-wing-third-y': 100,
                                '--right-body-third-x': 60
                            });
                        }
                    }
                ]
            });
        }
    });

});
