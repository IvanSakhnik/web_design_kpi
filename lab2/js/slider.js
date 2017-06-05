

(function ( $ ) {

    $.fn.slider = function( options ) {

        var settings = $.extend ({
            infinite : true,
            index : 0,
<<<<<<< HEAD
            sliderVisible : 4,
=======
            sliderVisible : 1,
>>>>>>> 726f7be09b4a6c151d947edfc40c77aaedb26c85
            slidesToScroll : 1,
            arrows : true,
            swipeAble : true,
            pagination : true,
            autoplay : true,
            autoplaySpeed : 5000
        }, options);


        var slideCount= $('.slide').length;
        if (settings.sliderVisible>slideCount){
            settings.sliderVisible=slideCount;
        }
        var step = $('.slide').outerWidth(true)
        var slideCount= $('.slides-wrapper >.slide').length;
        $('.slides-wrapper').css({'position':'relative'})
        $('.slider').css({'width':step*settings.sliderVisible+settings.sliderVisible*2})
        $('.slides-wrapper').css({'width':step*settings.sliderVisible+step+settings.sliderVisible*6})


        var ShowNextSlide = function(){
            if ($('.slider').is(':hover')){
                clearInterval(timer);
            }
            $('.slides-wrapper').animate({'left':-step}, 500, 
                function(){
                    $('.slide').eq(0).remove();
                    $('.slides-wrapper').css({'left':0});
                    $('.slide').eq(0).clone().appendTo('.slides-wrapper');
                });
        };

        var ShowPrewSlide = function(){
            $('.slide').eq(slideCount).remove();
            $('.slides-wrapper').css({'left': -step});
            $('.slide').eq(slideCount-1).clone().prependTo('.slides-wrapper');
            $('.slides-wrapper').animate({'left':0}, 500, 
                function(){
                    $('.slides-wrapper').css({'left':0});
                });
        }

        if (settings.arrows == true) {
<<<<<<< HEAD
            $('#prewbutton').css({'display':'block'});  
            $('#nextbutton').css({'display':'block'});     
            $('#nextbutton').click(function(){
                ShowNextSlide()});
            $('#prewbutton').click(function(){
=======
            $('.prewbutton').css({'display':'block'});  
            $('.nextbutton').css({'display':'block'});     
            $('.nextbutton').click(function(){
                ShowNextSlide()});
            $('.prewbutton').click(function(){
>>>>>>> 726f7be09b4a6c151d947edfc40c77aaedb26c85
                ShowPrewSlide();});
        }

        if (settings.pagination == true){
            $(".control-slide:first").addClass("active");
         
            $('.control-slide').click(function(){
                var goToNum = parseFloat($(this).text());
                animSlide(goToNum);
            });
        }


        var rotator = function(){
            if (settings.autoplay==true){
                var timer;
                $('.slide').eq(0).clone().appendTo('.slides-wrapper');
                if (settings.infinite==true){
                    timer=setInterval(function(){
                        ShowNextSlide()
                    }, settings.autoplaySpeed);
                }
            }
        }

        var make = function(){
            rotator();
        };
        
        return this.each(make);
    };

}( jQuery ));
 



$(document).ready(function(){
    $('.slider-wrap').slider();
});
