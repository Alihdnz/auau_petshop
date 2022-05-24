// window.onload = function () {



    
//     var element = document.querySelector(".slider");
//     var slideItem = document.querySelectorAll(".slide .item").length
//     console.log(element.scrollWidth)
//     console.log(slideItem)

    
//     let slideToShow = 4

//     let resto = slideItem % slideToShow 

//     console.log(resto)

//     if (slideItem >= 1) {
//         console.log("hi")
//     }



// } 


$(document).ready(function() {
    $('.responsive').lightSlider({
        item:4,
        loop:false,
        slideMove:2,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed:600,
        responsive : [
            {
                breakpoint:800,
                settings: {
                    item:3,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:2,
                    slideMove:1
                  }
            }
        ]
    });  
  });