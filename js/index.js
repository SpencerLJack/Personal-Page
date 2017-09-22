$(document).ready(function () { 
    //--landing page background image fade-in/fade-out function-- 
    var bgImageArray = ["DUzitpW.jpg", "wIRjT6N.jpg", "yFX3laD.jpg", "Bcw9mZe.jpg", "dq2YyQ2.jpg", "L2jNG1l.jpg"],
    base = "https://i.imgur.com/",
    secs = 5;
    bgImageArray.forEach(function(img){
        // caches images, avoiding white flash between background replacements
        new Image().src = base + img; 
});
    backgroundSequenceGate();

    var runBackground = '';
    function backgroundSequenceGate () {
        /*--checks if background sequence should run--*/
        if ($('#boroughs').hasClass('show2')) {
            bgImageArray = [];
            document.documentElement.style.background = 'none'; 
            var runBackground = 'false';
        }else if ($('#mountains').hasClass('show2')) {
            bgImageArray = [];
            document.documentElement.style.background = 'none'; 
            var runBackground = 'false';
        }else if ($('#escapes').hasClass('show2')) {
            bgImageArray = [];
            document.documentElement.style.background = 'none'; 
            var runBackground = 'false';
        }else if ($('#boroughs').hasClass('hidden')){    
            var runBackground = 'true';
            backgroundSequence();
        }else if ($('#mountains').hasClass('hidden')) {
            var runBackground = 'true';
            backgroundSequence();
        }else if ($('#escapes').hasClass('hidden')) {
            var runBackground = 'true';
            backgroundSequence();
        }
    };
    //---landing page background image scroll--
    var myTimeout;
    function backgroundSequence() {
        var k = 0;
                                   
        for (i = 0; i < bgImageArray.length; i++) {
            setTimeout(function(){ 
                document.documentElement.style.background = "url(" + base + bgImageArray[k] + ") no-repeat top left fixed";
                document.documentElement.style.backgroundSize ="cover";
                                        
                if ((k + 1) === bgImageArray.length){ 
                    myTimeout = setTimeout(function() {
                        backgroundSequence();
                    }, (secs * 1000))} else { k++; }            
            }, (secs * 1000) * i)
        }   
    };
    //--IN WORK SHOW MENU MENU NEW FUNCTION
    // USED TO HAVE A "TOUCHSTART" RIGHT AFTER "CLICK" WITHIN NEXT FUNCTION PARAMETER, NO COMA
    $('.hamburger_click_me').on('click', function() {
        console.log('hamburger clicked');
        this.classList.toggle("change");

        if ($('#main_navbar').hasClass('hidden')) {
            $('#main_navbar').removeClass('hidden');
            $('#main_navbar').addClass('show');
            $('#full_page_opacity_screen').removeClass('hidden');
            $('#full_page_opacity_screen').addClass('show');
        } else if ($('#main_navbar').hasClass('show')){
            //hide nav menu
            $('#main_navbar').removeClass('show');
            $('#main_navbar').addClass('hidden');
            //add opacity screen
            $('#full_page_opacity_screen').removeClass('show');
            $('#full_page_opacity_screen').addClass('hidden');
        }
    });
    

   
   

    //--if mouse leaves navigation bar and hamburger, hide nav bar--   
    $('#side_nav_menu').on('mouseleave', function(e) {
        if ($('#main_navbar').hasClass('show')) {
            //reset hamburger
            $('.hamburger_click_me').removeClass('change');
            //hide nav menu
            $('#main_navbar').removeClass('show');
            $('#main_navbar').addClass('hidden');
            //add opacity screen
            $('#full_page_opacity_screen').removeClass('show');
            $('#full_page_opacity_screen').addClass('hidden');
        }else {}
    });
    //--esc key event listener to stop displaying navigation bar--
    $(document).keyup(function(e) {
       if (e.keyCode == 27) { // escape key maps to keycode `27`
          $('#main_navbar').removeClass('show');
          $('#main_navbar').addClass('hidden'); 
          $('#full_page_opacity_screen').removeClass('show');
          $('#full_page_opacity_screen').addClass('hidden'); 
        }
    });
    //--lazyload photo fade-in--
    $(function () {
        var $lazyImages = $('img.lazy');

        $lazyImages.lazyload({
            threshold: 200,
            effectTime: 1000,
            effect: 'fadeIn'            
        });
    });
    //--header collapse function--
    var mq = window.matchMedia("(min-width: 786px)"); 

    $(window).scroll(function (event) {
        header();
    });
    
    function header() {
        if (mq.matches) { 
            if ($(window).scrollTop() < 240) {
                $("header").removeClass("hide2");
                $("header").addClass("show1");
                $("header").slideDown();
            } else {
                $("header").removeClass("show1");
                $("header").addClass("hide2");
                $("header").slideUp();
            }
        } else {
            if ($(window).scrollTop() < 182) {
                $("header").removeClass("hide2");
                $("header").addClass("show1");
                $("header").slideDown();
                
            } else {
                $("header").removeClass("show1");
                $("header").addClass("hide2");
                $("header").slideUp();
            }
        };
    };
    //--logic to change page content based on nav click--
    $(function() {
        $('a[id^=mm]').on('click', function(e) {
            e.preventDefault();
            //hide nav menu
            $('#main_navbar').removeClass('show');
            $('#main_navbar').addClass('hidden');
            //remove opacity screen
            $('#full_page_opacity_screen').removeClass('show');
            $('#full_page_opacity_screen').addClass('hidden')
            //for mobile view, hide menu when link is clicked
            if (window.matchMedia("(max-width: 768px)").matches){
                $('#nav').removeClass('show');
            } else {
                //do nothing
            };

            switch (this.id){
                case 'mmBoroughs':
                    $('#boroughs').removeClass('hidden');
                    //reset hamburger
                    $('.hamburger_click_me').removeClass('change');
                    //show boroughs content
                    $('#boroughs').addClass('show2');
                    //check if background sequence should be running
                    backgroundSequenceGate();
                    $('header, #side_nav_menu').css('background-color', 'rgba(54,62,68,0.9)');
                    //make sure other page content is hidden
                    $('#mountains, #escapes').removeClass('show2');
                    $('#mountains, #escapes').addClass('hidden');
                    break;
                case 'mmMountains':
                    $('#mountains').removeClass('hidden');
                    $('.hamburger_click_me').removeClass('change');
                    $('#mountains').addClass('show2');
                    backgroundSequenceGate();
                    $('header, #side_nav_menu').css('background-color', 'rgba(54,62,68,0.9)');
                    $('#boroughs, #escapes').removeClass('show2');
                    $('#boroughs, #escapes').addClass('hidden');
                    break;
                case 'mmEscapes':
                    $('#escapes').removeClass('hidden');
                    $('.hamburger_click_me').removeClass('change');
                    $('#escapes').addClass('show2');
                    backgroundSequenceGate();
                    $('header, #side_nav_menu').css('background-color', 'rgba(54,62,68,0.9)');
                    $('#boroughs, #mountains').removeClass('show2');
                    $('#boroughs, #mountains').addClass('hidden');
                    break;
            }   
        })
    });
    /*--scroll to top of page when 'top' is clicked */ 
    $('#click_for_top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({"scrollTop": "0px"}, 400);
    });
});